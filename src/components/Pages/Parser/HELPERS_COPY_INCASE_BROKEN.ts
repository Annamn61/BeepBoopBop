import { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
import { LineGroup, ParsedBill, ParsedInstruction, ParsedLine, ParsedPage, ParsedPiece } from "./Types";
import * as pdfjs from 'pdfjs-dist/build/pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { TextItem, TextMarkedContent } from "pdfjs-dist/types/src/display/api";
import { getInstructionActions } from "./instructionParser";

export const OPEN_QUOTE = '“'
export const CLOSE_QUOTE = '”'

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const getParsedBill = async (url: string): Promise<ParsedBill> => {
    // const url = 'https://olis.oregonlegislature.gov/liz/2025R1/Downloads/MeasureDocument/HB3179/House%20Amendments%20to%20Introduced'
    const proxy = `https://pdf-proxy.annamnorm61.workers.dev/?url=${encodeURIComponent(url)}`;
    const pdf: PDFDocumentProxy = await pdfjs.getDocument({
        url: proxy,
      }).promise;

    const bill: ParsedPage[] = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await getParsedPage(pdf, pageNum);
        bill.push(structuredClone(page));
    }
    
    return bill;
}

export const getParsedInstructions = async (url: string) => {
    const bill = await getParsedBill(url);
    const allLines = bill.flatMap((page) => page.content)
    const groups = getLineGroups(allLines);
    const instructionGroups =  getInstructionGroups(groups);
    console.log('bill', bill);
    console.log('allLines', allLines);
    console.log('groups', groups);
    console.log('instructionGroups', instructionGroups);
    console.log('getInstructionActions(instructionGroups)', getInstructionActions(instructionGroups));
    return getInstructionActions(instructionGroups).flatMap(instructions => instructions);
}


/**
 * Takes in individual lines and turns them into groups based on indentation
 */
const getLineGroups = (lines: ParsedLine[]) => {
    let groups: LineGroup[] = []
    let currentGroup: ParsedLine[] = []
    for(const line of lines) {
        if(isLineIndented(line) && currentGroup.length > 0) {
            groups.push({type: getType(currentGroup), lines: currentGroup});
            currentGroup = [];
        }
        currentGroup.push(line);
    }
    groups.push({type: getType(currentGroup), lines: currentGroup});
    return groups;
}

const getInstructionGroups = (groups: LineGroup[]) => {
    let allInstructions = [];
    let currentInstruction: ParsedInstruction = {} as ParsedInstruction;
    for(const group of groups) {
        if(group.type === 'instruction' && currentInstruction.instruction) {
            allInstructions.push(currentInstruction);
            currentInstruction = {} as ParsedInstruction;
        }
        if(group.type === 'instruction') {
            currentInstruction.instruction = group;
        } else {
            if(!currentInstruction.content) {
                currentInstruction.content = [];
            }
            currentInstruction.content.push(group)
        }
    }
    allInstructions.push(currentInstruction);

    return allInstructions;
}

const isLineIndented = (line: ParsedLine) => {
    if(line.length < 2) return false;
    const firstItemX = line[0].x;
    const secondItemX = line[1].x
    return Math.round((secondItemX - firstItemX)/20) >= 2;
}

const getType = (lines: ParsedLine[]) => {
    const lineTextArray = lines[0].map(piece => piece.text);
    const lineText = lineTextArray.slice(1).join('');
    const type = lineText.charAt(0) === OPEN_QUOTE ? 'quote' : 'instruction';
    return type;
}

const getParsedPage = async (pdf: PDFDocumentProxy, pageNum: number): Promise<ParsedPage> => {
    const unprocessedPage: PDFPageProxy = await pdf.getPage(pageNum);
    const content = await unprocessedPage.getTextContent();

    const pieces = getParsedPieces(content.items);
    const lines = getLinesFromPieces(pieces);
    const page = getPageFromLines(lines);

    return structuredClone(page);
}

const getParsedPieces = (items: (TextItem | TextMarkedContent)[]) => {
    return items.map((i: any) => ({
        text: i.str as string,
        height: i.height,
        x: i.transform[4] as number,
        y: i.transform[5] as number,
        isBold: (i.fontName as string).endsWith('_f2'), 
    } as ParsedPiece))
}

const getLinesFromPieces = (pieces: ParsedPiece[]) => {
    const lines = []
    let currentLine = [];
    let lastY = pieces[0]?.y ?? 0;
    pieces = [...pieces].sort((a, b) => b.y - a.y);

    for (const piece of pieces) {
        const maxHeightOffset = 2;
        const isDifferentLine = Math.abs(piece.y - lastY) > maxHeightOffset;
        if (isDifferentLine) {
            currentLine.sort((a, b) => a.x - b.x);
            if (currentLine.length) {
                lines.push(currentLine);
                const numberOfLines = Math.round(Math.abs(piece.y - lastY)/40);
                for(let i = 0; i < numberOfLines; i++) {
                    lines.push([{
                        height: 23,
                        isBold: false,
                        text: ' ',
                        x: piece.x,
                        y: piece.y - i * 23,
                    }]);
                }
            };
            currentLine = [];
        }
        currentLine.push(piece);
        lastY = piece.y;
    }

    lines.push([...currentLine]);

    return lines;
}

const getFilteredLines = (lines: ParsedLine[]) => {
    let filtered = [];
    for(const line of lines) {
        const filteredLine = line.filter(piece => piece.text !== '');
        if(filteredLine.length) {
            filtered.push(filteredLine)
        }
    }
    return filtered;
}

const getPageFromLines = (unfilteredLines: ParsedLine[]) => {
    const pre = [];
    const content = [];
    const post = [];
    let index = 0;

    const lines = getFilteredLines(unfilteredLines);

    const hasIndex = (index: number, lines: ParsedLine[]) => {
        return index < lines.length;
    }

    const shouldStartContent = (piece: ParsedPiece) => {
        return !isNaN(+piece.text) && +piece.text === 1;
    }

    const shouldEndContent = (piece: ParsedPiece) => {
        const text = piece.text;
        return text === '' || isNaN(+lines[index][0].text.charAt(0))
    }
    
    while(hasIndex(index, lines) && !shouldStartContent(lines[index][0])) {
        pre.push(lines[index]);
        index++;
    }
    while(hasIndex(index, lines) && !shouldEndContent(lines[index][0])) {
        content.push(lines[index]);
        index++;
    }
    while(hasIndex(index, lines)) {
        post.push(lines[index]);
        index++;
    }

    return {
        pre,
        content,
        post,
    }
}

