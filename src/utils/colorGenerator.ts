export const calendarColors: string[] = [
  "#FF5733", "#33B5E5", "#FFB400", "#4CAF50", "#9C27B0",
  "#607D8B", "#E91E63", "#795548", "#3F51B5", "#00BCD4",
  "#FFC107", "#8BC34A", "#F44336", "#673AB7", "#2196F3",
  "#CDDC39", "#FF9800", "#009688", "#B71C1C", "#1B5E20",
  "#311B92", "#004D40", "#BF360C", "#880E4F", "#263238",
  "#4A148C", "#827717", "#37474F", "#1A237E", "#0D47A1"
];

// Shuffle the array to randomize the colors
export const shuffleColors = (colors: string[]): string[] => {
  for (let i = colors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colors[i], colors[j]] = [colors[j], colors[i]]; // Swap elements
  }
  return colors;
};

// Initialize shuffled colors
export let shuffledColors = shuffleColors([...calendarColors]);

// Function to get the next color and remove it from the list
export const getNextColor = (): string | null | undefined => {
  if (shuffledColors.length === 0) {
    return null; // No more colors available
  }
  return shuffledColors.pop(); // Get and remove the last color
};