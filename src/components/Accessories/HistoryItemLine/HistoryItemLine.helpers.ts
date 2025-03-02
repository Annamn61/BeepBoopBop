import { GenericUpdateItem } from "../../../types/MeasureTypes";

export const shouldGetTestimonyLink = (update: GenericUpdateItem) => {
    if(!update || !(update.Type === 'MeasureHistoryItem')) {
        return null
    }
    const isPublicHearing = update.Text.toLowerCase().includes('public hearing');
    const millisecondsIn48hours = 48 * 60 * 60 * 1000;
    const isWithin48Hours = new Date().getTime() - millisecondsIn48hours < new Date(update.Date).getTime();  
    
    return isPublicHearing && isWithin48Hours
}