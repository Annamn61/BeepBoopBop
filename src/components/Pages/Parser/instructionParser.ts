import { getDeletedLinesInstructions } from "./InstructionsParsing/DeleteLines";
import { getDeletedPagesInstructions } from "./InstructionsParsing/DeletePages";
import { getDeletedTokenInstructions } from "./InstructionsParsing/DeleteToken";
import { ParsedInstruction } from "./Types";
import { CLOSE_QUOTE, OPEN_QUOTE } from "./helpers";

export const getInstructionActions = (instructionGroups: ParsedInstruction[]) => {
    let page = 1;
    const instructionsLists = instructionGroups.map((group) => {
        const instructionText = group.instruction.lines.flatMap(line => line.slice(1).flatMap(piece => piece.text)).join('')
        console.log('instructionText', instructionText);
        const { pageNumber, text } = extractPage(instructionText);
        const { lineNumber, text2 } =  extractLine(text);
        const pageNum = pageNumber || page;
        page = pageNum;
        // const { tokens, text3 } = tokenizeText("delete “energy” and insert “emergency management”");
        // const { tokens, tokenizedText } = tokenizeText("Delete lines 4 through 20 and delete pages 2 through 7 and insert:");
        const { tokens, tokenizedText } = tokenizeText(text2);
        const cleanedText = cleanText(tokenizedText);
        console.log(pageNumber, lineNumber, tokens, tokenizedText, cleanedText)
        const splitInstructions = getSplitInstructions({text: cleanedText, pageNum, lineNum: lineNumber, tokens});
        return splitInstructions;
    })
    console.log('+++', instructionsLists);
    return instructionsLists;
}

// On page 1 of the printed bill
// On page 2, delete lines 
// On page 1, something here
const extractPage = (instructionText: string) => {
    const splitInstructions = instructionText.split(',')
    const firstSection = splitInstructions[0];
    if(firstSection.toLocaleLowerCase().startsWith('on page')) {
        const pageNumber = +firstSection.split(' ')[2];
        console.log('page', pageNumber, '---', instructionText, );
        return { pageNumber, text: splitInstructions.slice(1).join(',')};
    }
    return { pageNumber: undefined, text: splitInstructions.join(',')}
}

const extractLine = (instructionText: string) => {
    const splitInstructions = instructionText.split(',')
    const firstSection = splitInstructions[0];
    if(firstSection.toLocaleLowerCase().startsWith('line')) {
        const lineNumber = +firstSection.split(' ')[1];
        return { lineNumber, text2: splitInstructions.slice(1).join(',')};
    }
    if(firstSection.toLocaleLowerCase().startsWith('in line')) {
        const lineNumber = +firstSection.split(' ')[2];
        return { lineNumber, text2: splitInstructions.slice(1).join(',')};
    }
    return { lineNumber: undefined, text2: splitInstructions.join(',')}
}

export const tokenizeText = (text: string) => {
    let tokenNumber = 1;
    let tokens = [];
    let string = text;

    while(string.indexOf(OPEN_QUOTE) > 0 && tokenNumber < 5) {
        const quoteStart = string.indexOf(OPEN_QUOTE);
        const quoteEnd = string.indexOf(CLOSE_QUOTE);
        tokens.push(string.slice(quoteStart + 1, quoteEnd))
        string = string.slice(0, quoteStart) + `TOKEN_${tokenNumber}` + string.slice(quoteEnd + 1);
        tokenNumber +=1;
    }
  
    return {
      tokenizedText: string,
      tokens,
    };
}

export const getSplitInstructions = ({text, pageNum, lineNum, tokens}:{text: string, pageNum: number, lineNum?: number, tokens: string[]}) => {
    const cleanedText = text.trim();
    const instructionParts = [];
    const deletedLines = getDeletedLinesInstructions(cleanedText, pageNum);
    if(deletedLines.instruction) {
        instructionParts.push(deletedLines.instruction)
    }
    const deletedPages = getDeletedPagesInstructions(deletedLines.remainingText)
    if(deletedPages.instruction) {
        instructionParts.push(deletedPages.instruction)
    }
    const deletedToken = getDeletedTokenInstructions({text: deletedPages.remainingText, page: pageNum, lineNum, tokens})
    if(deletedToken.instruction) {
        instructionParts.push(deletedPages.instruction)
    }
    // const insertedToken = getInsertedTokenInstruction(deletedToken.remainingText, pageNum, deletedToken.token)
    // if(insertedToken.instruction) {
    //     instructionParts.push(insertedToken.instruction)
    // }
    // const insertedLines = getInsertedLinesInstruction(insertedToken.remainingText, pageNum, )
    return instructionParts;
}

export const cleanText = (tokenizedText: string) => {
    return tokenizedText.split(' ').filter((word) => word != 'and').join(' ');
}


