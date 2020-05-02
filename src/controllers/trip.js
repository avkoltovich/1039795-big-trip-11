import {sortTypeMap} from '../helpers/const.js';

const getSortedEvents = (sortType, events) => {
  let sortedEvents = [];
  const showingEvents = events.slice();

  switch (sortType) {
    case sortTypeMap.DEFAULT:
      sortedEvents = showingEvents.sort((a, b) => a.date.start - b.date.start);
      break;
    case sortTypeMap.TIME:
      sortedEvents = showingEvents.sort((a, b) => (b.date.end - b.date.start) - (a.date.end - a.date.start));
      break;
    case sortTypeMap.PRICE:
      sortedEvents = showingEvents.sort((a, b) => b.price - a.price);
      break;
  }

  return sortedEvents;
};

export {getSortedEvents};
