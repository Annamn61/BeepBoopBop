export const INSTRUCTION_TYPES = {
    DELETE_LINES: 'DELETE_LINES',
    DELETE_PAGES: 'DELETE_PAGES',
    DELETE_TOKEN: 'DELETE_TOKEN', 
    INSERT_TOKEN: 'INSERT_TOKEN',
    INSERT_LINES: 'INSERT_LINES',
}

export interface DeleteLinesInstruction {
    type: 'DELETE_LINES',
    page: number, 
    startLine: number, 
    endLine: number,
} 

export interface DeletePagesInstruction {
    type: 'DELETE_PAGES',
    startPage: number, 
    endPage: number,
}

export interface DeleteTokenInstruction {
    type: 'DELETE_TOKEN',
    page: number, 
    line: number, 
    token: string,
}

export interface InsertTokenInstruction {
    type: 'INSERT_TOKEN',
    page: number, 
    line: number, 
    token: string,
}

export interface InsertLinesInstruction {
    type: 'INSERT_LINES',
    page: number, 
    atLine: number,
    lines: any, // TODO - figure out what this should be 
}