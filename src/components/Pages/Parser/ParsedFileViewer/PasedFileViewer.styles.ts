import { ParsedPiece } from "../Types";

export const getTextStyle = (span: ParsedPiece) => ({
    fontWeight: span.isBold ? 'bold' : 'normal',
    fontSize: span.height + 4,
});