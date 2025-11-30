export type ParsedBill = ParsedPage[];

export type ParsedInstruction = {
    instruction: LineGroup,
    content?: LineGroup[],
} 

export type ParsedPage = {
    pre: ParsedLine[],
    content: ParsedLine[],
    post: ParsedLine[],
}

export type ParsedLine = ParsedPiece[]

export type ParsedPiece = {
    height: number, 
    isBold: boolean,
    text: string,
    x: number, 
    y: number,
}

export type LineGroup = {
    type: 'instruction' | 'quote'
    lines: ParsedLine[]
}