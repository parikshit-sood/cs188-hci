import React, { createContext, useContext, useState } from "react";
import { CustomHighlight } from "../components/flashcard_components/Highlights";
import { FlashcardData } from "../components/flashcard_components/Flashcard";
import { Node, Edge } from "@xyflow/react";

type FlashCardNodeType = Node<{ card: FlashcardData }, "flashCard">;
type AnnotationNodeType = Node<
	{ content: string; icon?: string },
	"annotation"
>;
type AllNodeTypes = FlashCardNodeType | AnnotationNodeType;
type LabeledEdgeType = Edge<{ label?: string }>;

// Define the shape of the context data
interface AppContextData {
	uploadedFile: File | null;
	setUploadedFile: (file: File | null) => void;
	highlights: CustomHighlight[];
	setHighlights: React.Dispatch<React.SetStateAction<CustomHighlight[]>>;
	flashcards: FlashcardData[];
	setFlashcards: React.Dispatch<React.SetStateAction<FlashcardData[]>>;
	nodes: AllNodeTypes[];
	setNodes: React.Dispatch<React.SetStateAction<AllNodeTypes[]>>;
	edges: LabeledEdgeType[];
	setEdges: React.Dispatch<React.SetStateAction<LabeledEdgeType[]>>;
}

// Create the context
const AppContext = createContext<AppContextData | undefined>(undefined);

// Custom hook to use the AppContext
export const useAppContext = (): AppContextData => {
	const ctx = useContext(AppContext);
	if (!ctx) {
		throw new Error("useAppContext must be used within an AppProvider");
	}
	return ctx;
};

interface AppProviderProps {
	children: React.ReactNode;
}

// Create a provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const [highlights, setHighlights] = useState<CustomHighlight[]>([]);
	const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
	const [nodes, setNodes] = useState<AllNodeTypes[]>([]);
	const [edges, setEdges] = useState<LabeledEdgeType[]>([]);

	return (
		<AppContext.Provider
			value={{
				uploadedFile,
				setUploadedFile,
				highlights,
				setHighlights,
				flashcards,
				setFlashcards,
				nodes,
				setNodes,
				edges,
				setEdges,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

// Export the AppContext for direct use if needed
export { AppContext };
