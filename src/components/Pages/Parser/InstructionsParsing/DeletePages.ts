import { DeletePagesInstruction, INSTRUCTION_TYPES } from "./types";

export const getDeletedPagesInstructions = (text: string) => {

    if(text.toLocaleLowerCase().startsWith('delete pages')) {
        const tokens = text.split(' ');
        const start = text.indexOf(tokens[5]);

        return {
            instruction: {
                type: INSTRUCTION_TYPES.DELETE_PAGES,
                startPage: +tokens[2],
                endPage: +tokens[4]
            } as DeletePagesInstruction,
            remainingText: text.slice(start)
        }
    }
    if(text.toLocaleLowerCase().startsWith('delete page')) {
        const tokens = text.split(' ');
        const start = text.indexOf(tokens[3]);

        return {
            instruction: {
                type: INSTRUCTION_TYPES.DELETE_PAGES,
                startPage: +tokens[2],
                endPage: +tokens[2],
            } as DeletePagesInstruction,
            remainingText: text.slice(start),
        }

    }

    return {
        instruction: null,
        remainingText: text,
    };
}