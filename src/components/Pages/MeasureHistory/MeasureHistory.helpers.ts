import { importantDates } from "../../../data/ImportantLegistlativeDates";
import { DateGroupedUpdates, GenericUpdateItem } from "../../../types/MeasureTypes";

const getLocalDateObject = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date;
  };

export const getFutureHistoryFromHistory = (history: DateGroupedUpdates) => {
    const futureHistory: DateGroupedUpdates = {};

  const futureKeys = Object.keys(history).filter((dateString) => {
    const date = getLocalDateObject(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const hasFutureItem = !!history[dateString].find((updateItem) => {
      return new Date(updateItem.Date) >= new Date();
    });

    const hasImportantDate = !!Object.keys(importantDates).includes(dateString);

    return date >= today && (hasFutureItem || hasImportantDate);
  });

  futureKeys.forEach((dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const today = new Date();
    if (
      year === today.getFullYear() &&
      month === today.getMonth() + 1 &&
      day === today.getDate()
    ) {
      const todayFutureDates: GenericUpdateItem[] = [];
      history[dateString].forEach((update) => {
        const [updateDate, updateTime] = update.Date.split('T');
        const [year, month, day] = updateDate.split('-').map(Number);
        const [hours, minutes, _] = updateTime.split(':').map(Number);
        const date = new Date(year, month - 1, day).setHours(
          hours,
          minutes,
          0,
          0
        );
        if (new Date(date) > new Date()) {
          todayFutureDates.push(update);
        }

        if (!!todayFutureDates.length) {
          futureHistory[dateString] = todayFutureDates;
        }
      });
    } else {
      futureHistory[dateString] = history[dateString];
    }
  });

  return futureHistory;
}

export const getPastHistoryFromHistory = (history: DateGroupedUpdates) => {
    const pastHistory: DateGroupedUpdates = {};

  const pastKeys = Object.keys(history).filter((dateString) => {
    const date = getLocalDateObject(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const hasPastItem = !!history[dateString].find((updateItem) => {
      return new Date(updateItem.Date) <= new Date();
    });

    return date <= today && hasPastItem;
  });

  pastKeys.forEach((dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const today = new Date();
    if (
      year === today.getFullYear() &&
      month === today.getMonth() + 1 &&
      day === today.getDate()
    ) {
      const todayFutureDates: GenericUpdateItem[] = [];
      history[dateString].forEach((update) => {
        const [updateDate, updateTime] = update.Date.split('T');
        const [year, month, day] = updateDate.split('-').map(Number);
        const [hours, minutes, _] = updateTime.split(':').map(Number);
        const date = new Date(year, month - 1, day).setHours(
          hours,
          minutes,
          0,
          0
        );
        if (new Date(date) < new Date()) {
          todayFutureDates.push(update);
        }

        if (!!todayFutureDates.length) {
          pastHistory[dateString] = todayFutureDates;
        }
      });
    } else {
        pastHistory[dateString] = history[dateString];
    }
  });

  return pastHistory;
}