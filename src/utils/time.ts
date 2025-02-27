export const getMMHHFromDate = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    
    hours = hours % 12 || 12; // Convert 0 (midnight) and 12 (noon) correctly
    
    return `${hours}:${minutes}${ampm}`;
  };

  export const getShortFormatDateWithTime = (date: Date) => {
    const month = date.toLocaleString("en-US", { month: "short" }); // "Jan", "Feb", etc.
    const day = date.getDate(); // Day of the month
    let hours = date.getHours(); // Get hours (24-hour format)
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensure two digits
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