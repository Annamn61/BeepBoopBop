export const getMMHHFromDate = (date: Date) => {
    let hours = date.getHours();
    const roundedMinutes = date.getMinutes() === 1 ? 0 : date.getMinutes();
    const minutes = roundedMinutes.toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    
    hours = hours % 12 || 12; // Convert 0 (midnight) and 12 (noon) correctly
    
    return `${hours}:${minutes} ${ampm}`;
  };

  export const getShortFormatDateWithTime = (date: Date) => {
    const month = date.toLocaleString("en-US", { month: "short" }); // "Jan", "Feb", etc.
    const day = date.getDate(); // Day of the month
    let hours = date.getHours(); // Get hours (24-hour format)
    const roundedMinutes = date.getMinutes() === 1 ? 0 : date.getMinutes();
    const minutes = roundedMinutes.toString().padStart(2, "0"); // Ensure two digits
    const amPm = hours >= 12 ? "pm" : "am"; // Determine AM/PM
  
    // Convert 24-hour time to 12-hour format
    hours = hours % 12 || 12;
  
    return `${month}. ${day}, ${hours}:${minutes}${amPm}`;
  };

  const weekdays: any = {
    [0]: 'Sunday',
    [1]: 'Monday',
    [2]: 'Tuesday',
    [3]: 'Wednesday',
    [4]: 'Thursday',
    [5]: 'Friday',
    [6]: 'Saturday',
  }

  // Thursday, February 16, 2025
  export const getLongFormatDate = (date: Date) => {
    const month = date.toLocaleString("en-US", { month: "long" });
    const day = date.getDate(); // Day of the month
    const year = date.getFullYear();
    const weekday = date.getDay();    
  
    return `${month} ${day}, ${year}, ${weekdays[weekday]}`;
  };


  export const getDaysAway = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight to compare only dates
    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);
  
    const diffTime = today.getTime() - inputDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert to days

    if(diffDays === -1) return `in 1 day`;
    if(diffDays < 0) return `in ${Math.abs(diffDays)} days`;
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  // 2025-
  export const getYYYYMMDDHHString = (date: Date) => {
    const dateString = `${date.getFullYear()}-${getTwoDigits(
        date.getMonth() + 1
      )}-${getTwoDigits(date.getDate())}-${getTwoDigits(date.getHours())}-00`;

    return dateString;
  }

  export const getTwoDigits = (number: number) => {
    return number.toString().padStart(2, '0');
  };

  export const getYYYYMMDD = (date: Date) => {
    return `${date.getFullYear()}-${getTwoDigits(date.getMonth() + 1)}-${getTwoDigits(date.getDate())}`
  }

  export const isOutOfDate_OneHour = (timeString: string) => {
    const now = new Date();
    const lastUpdated = new Date(timeString)
    const oneHourInMilliseconds = 60 * 60 * 1000;
    const dateToUpdateData = new Date(lastUpdated.getTime() + oneHourInMilliseconds)
    return now > dateToUpdateData;
  }

  export const isOutOfDate_OneWeek = (timeString: string) => {
    const now = new Date();
    const lastUpdated = new Date(timeString)
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    const dateToUpdateData = new Date(lastUpdated.getTime() + oneWeekInMilliseconds)
    return now > dateToUpdateData;
  }
  
