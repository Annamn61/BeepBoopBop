export const getMMHHFromDate = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    
    hours = hours % 12 || 12; // Convert 0 (midnight) and 12 (noon) correctly
    
    return `${hours}:${minutes}${ampm}`;
  };

  export const getFullFormattedDate = (date: Date) => {
    const month = date.toLocaleString("en-US", { month: "short" }); // "Jan", "Feb", etc.
    const day = date.getDate(); // Day of the month
    let hours = date.getHours(); // Get hours (24-hour format)
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensure two digits
    const amPm = hours >= 12 ? "pm" : "am"; // Determine AM/PM
  
    // Convert 24-hour time to 12-hour format
    hours = hours % 12 || 12;
  
    return `${month}. ${day}, ${hours}:${minutes}${amPm}`;
  };

  export const getDaysAgo = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight to compare only dates
    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);
  
    const diffTime = today.getTime() - inputDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert to days
  
    if (diffDays === 0) return "today";
    return `${diffDays} days ago`;
  };