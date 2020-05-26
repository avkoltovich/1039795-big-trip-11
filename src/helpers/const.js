const activityTypes = [`check-in`, `sightseeing`, `restaurant`];

const BAR_HEIGHT = 55;

const ChartVariables = {
  BAR_THICKNESS: 44,
  MIN_BAR_LENGTH: 50,
  LABELS_FONT_SIZE: 13,
  TITLE_FONT_SIZE: 23,
  LAYOUT_PADDING_LEFT: 45,
  SCALES_Y_PADDING: 5,
  SCALES_Y_FONTSIZE: 13,
};

const eventTypesMap = {
  'taxi': `Taxi to `,
  'bus': `Bus to `,
  'train': `Train to `,
  'ship': `Ship to `,
  'transport': `Transport to `,
  'drive': `Drive to `,
  'flight': `Flight to `,
  'check-in': `Check-in in `,
  'sightseeing': `Sightseeing in `,
  'restaurant': `Restaurant in `
};

const filterTypeMap = {
  DEFAULT: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

const Mode = {
  CREATE: `create`,
  VIEW: `view`,
  EDIT: `edit`
};

const offerTitlesMap = {
  'event-offer-luggage': `Add luggage`,
  'event-offer-comfort': `Switch to comfort class`,
  'event-offer-meal': `Add meal`,
  'event-offer-seats': `Choose seats`,
  'event-offer-train': `Travel by train`
};

const sortTypeMap = {
  DEFAULT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`
};

const transferTypes = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];

const tripPointIconMap = new Map([
  [`taxi`, `🚕`],
  [`bus`, `🚌`],
  [`train`, `🚂`],
  [`ship`, `🚢`],
  [`transport`, `🚆`],
  [`drive`, `🚗`],
  [`flight`, `✈️`],
  [`check-in`, `🏨`],
  [`sightseeing`, `🏛`],
  [`restaurant`, `🍴`],
]);

export {BAR_HEIGHT, ChartVariables, activityTypes, eventTypesMap, filterTypeMap, Mode, offerTitlesMap, sortTypeMap, transferTypes, tripPointIconMap};
