export const measureData = [
  { "measurePrefix": "HB", "measureNumber": 3119, position: 'Oppose' },
  { "measurePrefix": "HB", "measureNumber": 3103, position: 'Support' },
  { "measurePrefix": "SB", "measureNumber": 681, position: 'Support' },
  { "measurePrefix": "HB", "measureNumber": 2200, position: 'Support' },
  { "measurePrefix": "HB", "measureNumber": 3170, position: 'Support' },
  { "measurePrefix": "SB", "measureNumber": 88, position: 'Support' },
  { "measurePrefix": "HB", "measureNumber": 3081, position: 'Support' },
  { "measurePrefix": "SB", "measureNumber": 682, position: 'Support' },
  { "measurePrefix": "HB", "measureNumber": 3450, position: 'Support' },
  { "measurePrefix": "HB", "measureNumber": 2949, position: 'Support' },
  { "measurePrefix": "SB", "measureNumber": 680, position: 'Support' },
  { "measurePrefix": "SB", "measureNumber": 685, position: 'Support' },
  { "measurePrefix": "SB", "measureNumber": 73, position: 'Support' },
  { "measurePrefix": "SB", "measureNumber": 79, position: 'Support' },
  { "measurePrefix": "LC", "measureNumber": 1440, position: 'Support' },
  { "measurePrefix": "HB", "measureNumber": 3193, position: 'Support' },
  { "measurePrefix": "HB", "measureNumber": 3062, position: 'Support' },
  { "measurePrefix": "HB", "measureNumber": 3336, position: 'Support' },
  { "measurePrefix": "HB", "measureNumber": 2978, position: 'Support' },
  { "measurePrefix": "HJM", "measureNumber": 10, position: 'Support' },
];

export const findMeasureByNumber = (num: number) => measureData.find((measure) => measure.measureNumber === num);