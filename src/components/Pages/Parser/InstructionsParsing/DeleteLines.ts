import { DeleteLinesInstruction, INSTRUCTION_TYPES } from "./types";

export const getDeletedLinesInstructions = (text: string, page: number) => {

    if(text.toLocaleLowerCase().startsWith('delete lines')) {
        const tokens = text.split(' ');
        const removedInstruction = text.slice(12);
        const start = removedInstruction.indexOf(tokens[5]);

        return {
            instruction: {
                type: INSTRUCTION_TYPES.DELETE_LINES,
                page,
                startLine: +tokens[2],
                endLine: +tokens[4]
            } as DeleteLinesInstruction,
            remainingText: removedInstruction.slice(start).trim(),
        }
    }
    if(text.toLocaleLowerCase().startsWith('delete line')) {
        const tokens = text.split(' ');
        const removedInstruction = text.slice(11);
        const start = removedInstruction.indexOf(tokens[3]);

        return {
            instruction: {
                type: INSTRUCTION_TYPES.DELETE_LINES,
                page,
                startLine: +tokens[2],
                endLine: +tokens[2],
            } as DeleteLinesInstruction,
            remainingText: removedInstruction.slice(start).trim(),
        }

    }

    return {
        instruction: null,
        remainingText: text,
    };
}