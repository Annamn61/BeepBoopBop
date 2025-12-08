import { DeleteLinesInstruction, InsertLinesInstruction, INSTRUCTION_TYPES } from "./InstructionsParsing/types";
import { ParsedBill, ParsedLine, ParsedPiece } from "./Types";

export const applyInstructions = (bill: ParsedBill, instructions: any[]) => {
    let editedBill = bill;
    console.log('INSTRUCTIONS', instructions);
    instructions.forEach((instructionSet) => {
        if(instructionSet.type === INSTRUCTION_TYPES.DELETE_LINES) {
            const instructionSetTyped: DeleteLinesInstruction = instructionSet;
            let newPage = { ...editedBill[instructionSet.page - 1] };
            let content = newPage.content;
            let newContent = []
            for(const line of content) {
                const currLineNum = +line[0].text
                if(!(currLineNum >= instructionSetTyped.startLine && currLineNum <= instructionSetTyped.endLine)) {
                    newContent.push(line);
                }
            }
            newPage.content = newContent;
            editedBill[instructionSet.page -1] = newPage;
        }
        if(instructionSet.type === INSTRUCTION_TYPES.DELETE_PAGES) {
            console.log('DP');
        }
        if(instructionSet.type === INSTRUCTION_TYPES.DELETE_TOKEN) {
            console.log('DT');
        }
        if(instructionSet.type === INSTRUCTION_TYPES.INSERT_LINES) {
            const instructionSetTyped: InsertLinesInstruction = instructionSet;
            let newPage = { ...editedBill[instructionSetTyped.page - 1] };
            let content = [...newPage.content];
            
            // Find the insertion point - find the first line with line number >= atLine
            let insertIndex = content.findIndex(line => {
                const lineNum = +line[0]?.text;
                return lineNum >= instructionSetTyped.atLine;
            });
            
            // If no line found with that number or higher, insert at the end
            if (insertIndex === -1) {
                insertIndex = content.length;
            }
            
            // Create new lines with inferred line numbers
            // Start numbering from atLine and increment for each new line
            const newLines: ParsedLine[] = instructionSetTyped.lines.map((linePieces: ParsedPiece[], index: number) => {
                const lineNumber = instructionSetTyped.atLine + index;
                // Create a line number piece (first piece in each line)
                // Use the format from existing lines - get a reference from an existing line
                const referenceLine = content[0] || content[insertIndex - 1];
                const lineNumberPiece: ParsedPiece = referenceLine 
                    ? { ...referenceLine[0], text: lineNumber.toString() }
                    : { height: 0, isBold: false, text: lineNumber.toString(), x: 0, y: 0 };
                
                // Return the line with line number as first piece, followed by the content pieces
                return [lineNumberPiece, ...linePieces];
            });
            
            // Insert the new lines at the insertion point
            content.splice(insertIndex, 0, ...newLines);
            
            // Renumber all lines starting from the insertion point to maintain order
            // Start from the first inserted line and continue through the rest of the page
            const startRenumberingFrom = insertIndex;
            for (let i = startRenumberingFrom; i < content.length; i++) {
                const lineNumber = instructionSetTyped.atLine + (i - insertIndex);
                const referenceLine = content[i];
                if (referenceLine && referenceLine[0]) {
                    // Update the line number in the first piece
                    content[i] = [
                        { ...referenceLine[0], text: lineNumber.toString() },
                        ...referenceLine.slice(1)
                    ];
                }
            }
            
            newPage.content = content;
            editedBill[instructionSetTyped.page - 1] = newPage;
        }
        if(instructionSet.type === INSTRUCTION_TYPES.INSERT_TOKEN) {
            console.log('IT');
        }
    })
    return editedBill;
}