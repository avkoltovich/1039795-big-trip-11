const transferTypes = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];
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

const offerTitlesMap = {
  'event-offer-luggage': `Add luggage`,
  'event-offer-comfort': `Switch to comfort class`,
  'event-offer-meal': `Add meal`,
  'event-offer-seats': `Choose seats`,
  'event-offer-train': `Travel by train`
};

export {transferTypes, activityTypes, eventTypesMap, offerTitlesMap};
