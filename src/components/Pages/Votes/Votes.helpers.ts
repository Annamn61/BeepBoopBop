type RGB = { r: number; g: number; b: number };

function hexToRgb(hex: string): RGB {
  const cleanHex = hex.replace("#", "");
  return {
    r: parseInt(cleanHex.substring(0, 2), 16),
    g: parseInt(cleanHex.substring(2, 4), 16),
    b: parseInt(cleanHex.substring(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (c: number) => c.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function lerpColor(c1: RGB, c2: RGB, t: number): RGB {
  return {
    r: Math.round(c1.r + (c2.r - c1.r) * t),
    g: Math.round(c1.g + (c2.g - c1.g) * t),
    b: Math.round(c1.b + (c2.b - c1.b) * t),
  };
}

function easeIn(t: number): number {
  return t * t;
}

export function getGradientColor(t: number): string {
  const green = hexToRgb("#3E753B");
  const grey = hexToRgb("#CDCDCD");
  const orange = hexToRgb("#E37C32");

  // Clamp t between 0 and 1
  t = Math.max(0, Math.min(1, t));

  if (t <= 0.5) {
    const localT = t / 0.5;
    return rgbToHex(lerpColor(green, grey, localT));
  } else {
    const localT = easeIn((t - 0.5) / 0.5);
    return rgbToHex(lerpColor(grey, orange, localT));
  }
}