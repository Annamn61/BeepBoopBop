import { DeleteTokenInstruction, INSTRUCTION_TYPES } from "./types";

export const getDeletedTokenInstructions = ({text, page, lineNum, tokens}:{text: string, page: number, lineNum?: number, tokens: string[]}) => {

    if(lineNum != undefined && text.toLocaleLowerCase().startsWith('delete token')) {
        const words = text.split(' ');
        const tokenNum = +words[0].slice(6);
        const start = text.indexOf(words[1]);

        return {
            instruction: {
                type: INSTRUCTION_TYPES.DELETE_TOKEN,
                page,
                line: lineNum,
                token: tokens[tokenNum]
            } as DeleteTokenInstruction,
            remainingText: text.slice(start)
        }
    }

    return {
        instruction: null,
        remainingText: text,
    };
}