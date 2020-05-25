const activityTypes = [`check-in`, `sightseeing`, `restaurant`];

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

export {activityTypes, eventTypesMap, filterTypeMap, Mode, offerTitlesMap, sortTypeMap, transferTypes};
