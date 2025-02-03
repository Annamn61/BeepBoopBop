export const measureData = [
  { "measurePrefix": "HB", "measureNumber": 3119, position: 'Oppose', sessionKey: '2025R1' },
  { "measurePrefix": "HB", "measureNumber": 3103, position: 'Support', sessionKey: '2025R1' },
  { "measurePrefix": "SB", "measureNumber": 681, position: 'Support', sessionKey: '2025R1' },
  { "measurePrefix": "HB", "measureNumber": 2200, position: 'Support', sessionKey: '2025R1' },
  { "measurePrefix": "HB", "measureNumber": 3170, position: 'Support', sessionKey: '2025R1' },
  { "measurePrefix": "SB", "measureNumber": 88, position: 'Support', sessionKey: '2025R1' },
  { "measurePrefix": "HB", "measureNumber": 3081, position: 'Support', sessionKey: '2025R1' },
  { "measurePrefix": "SB", "measureNumber": 682, position: 'Support', sessionKey: '2025R1' },
  { "measurePrefix": "HB", "measureNumber": 3450, position: 'Support', sessionKey: '2025R1' },
  { "measurePrefix": "HB", "measureNumber": 2949, position: 'Support', sessionKey: '2025R1' },
  { "measurePrefix": "SB", "measureNumber": 680, position: 'Support', sessionKey: '2025R1' },
  { "measurePrefix": "SB", "measureNumber": 685, position: 'Support', sessionKey: '2025R1' },
  { "measurePrefix": "SB", "measureNumber": 73, position: 'Support', sessionKey: '2025R1' },
  { "measurePrefix": "SB", "measureNumber": 79, position: 'Support', sessionKey: '2025R1' },
  { "measurePrefix": "LC", "measureNumber": 1440, position: 'Support', sessionKey: '2025R1' },
  { "measurePrefix": "HB", "measureNumber": 3193, position: 'Support', sessionKey: '2025R1' },
  { "measurePrefix": "HB", "measureNumber": 3062, position: 'Support', sessionKey: '2025R1' },
  { "measurePrefix": "HB", "measureNumber": 3336, position: 'Support', sessionKey: '2025R1' },
  { "measurePrefix": "HB", "measureNumber": 2978, position: 'Support', sessionKey: '2023R1' },
  { "measurePrefix": "HJM", "measureNumber": 10, position: 'Support', sessionKey: '2025R1' },
];

export const findMeasureByNumber = (num: number) => measureData.find((measure) => measure.measureNumber === num);