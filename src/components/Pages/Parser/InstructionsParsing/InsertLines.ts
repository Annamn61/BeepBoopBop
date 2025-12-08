import { InsertLinesInstruction, INSTRUCTION_TYPES } from "./types";
import { ParsedLine } from "../Types";
import { OPEN_QUOTE, CLOSE_QUOTE } from "../helpers";

/**
 * Parses insert lines instructions from the remaining text
 * The text should be something like "insert:" followed by lines of content
 * The actual lines to insert come from the ParsedInstruction.content
 */
export const getInsertedLinesInstruction = (
    text: string, 
    page: number, 
    atLine: number,
    contentLines?: ParsedLine[]
): { instruction: InsertLinesInstruction | null, remainingText: string } => {
    
    // Check if text starts with "insert:" (case insensitive)
    const lowerText = text.toLowerCase().trim();
    if (!lowerText.startsWith('insert:')) {
        return {
            instruction: null,
            remainingText: text,
        };
    }

    // If we have content lines, create the instruction
    if (contentLines && contentLines.length > 0) {
        // Remove quotes and line numbers from the lines
        const cleanedLines = contentLines.map(line => {
            // Create a new line array without the first piece (line number) and without quotes
            const cleanedPieces = line.slice(1).map(piece => ({
                ...piece,
                // Remove all quote characters (both straight and curly quotes)
                text: piece.text.replace(new RegExp(`[${OPEN_QUOTE}${CLOSE_QUOTE}"'"]`, 'g'), ''),
            })).filter(piece => piece.text.trim() !== ''); // Remove empty pieces
            
            return cleanedPieces;
        }).filter(line => line.length > 0); // Remove empty lines

        return {
            instruction: {
                type: INSTRUCTION_TYPES.INSERT_LINES,
                page,
                atLine,
                lines: cleanedLines,
            } as InsertLinesInstruction,
            remainingText: '', // No remaining text after insert
        };
    }

    // If no content lines, still return the instruction but with empty lines
    // (the lines will need to be provided separately)
    return {
        instruction: {
            type: INSTRUCTION_TYPES.INSERT_LINES,
            page,
            atLine,
            lines: [],
        } as InsertLinesInstruction,
        remainingText: '',
    };
}

