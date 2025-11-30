import { DeleteLinesInstruction, INSTRUCTION_TYPES } from "./InstructionsParsing/types";
import { ParsedBill } from "./Types";

export const applyInstructions = (bill: ParsedBill, instructions: any[]) => {
    let editedBill = bill;
    instructions.forEach((instructionSet) => {
        if(instructionSet.type === INSTRUCTION_TYPES.DELETE_LINES) {
            const instructionSetTyped: DeleteLinesInstruction = instructionSet;
            let newPage = editedBill[instructionSet.page - 1];
            console.log('EB', editedBill, editedBill[instructionSet.page - 1])
            console.log('newPAGE', newPage)
            let content = newPage.content;
            let newContent = []
            for(const line of content) {
                const currLineNum = +line[0].text
                if(!(currLineNum >= instructionSetTyped.startLine && currLineNum <= instructionSetTyped.endLine)) {
                    newContent.push(line);
                }
            }
            newPage.content = newContent;
            editedBill[instructionSet.page] = newPage;
            console.log('EDITED BILL', newPage, editedBill, bill)
        }
        if(instructionSet.type === INSTRUCTION_TYPES.DELETE_PAGES) {
            console.log('DP');
        }
        if(instructionSet.type === INSTRUCTION_TYPES.DELETE_TOKEN) {
            console.log('DT');
        }
    })
    return editedBill;
}