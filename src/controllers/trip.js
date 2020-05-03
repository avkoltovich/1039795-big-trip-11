import {sortTypeMap} from '../helpers/const.js';
import {replace} from '../helpers/render.js';
import SortingComponent from '../components/sorting.js';
import BlankTripComponent from '../components/trip/blank-trip.js';
import TripWithDaysElement from '../components/trip/trip-with-days.js';
import TripWithoutDaysElement from '../components/trip/trip-without-days.js';

const getTripElement = (sortType, events) => {
  const showingEvents = events.slice();
  let sortedEvents = [];
  let tripElement;

  switch (sortType) {
    case sortTypeMap.DEFAULT:
      sortedEvents = showingEvents.sort((a, b) => a.date.start - b.date.start);
      tripElement = new TripWithDaysElement(sortedEvents);
      break;
    case sortTypeMap.TIME:
      sortedEvents = showingEvents.sort((a, b) => (b.date.end - b.date.start) - (a.date.end - a.date.start));
      tripElement = new TripWithoutDaysElement(sortedEvents);
      break;
    case sortTypeMap.PRICE:
      sortedEvents = showingEvents.sort((a, b) => b.price - a.price);
      tripElement = new TripWithoutDaysElement(sortedEvents);
      break;
  }

  return tripElement;
};

export default class TripController {
  constructor(events) {
    this._events = events;
    this._blankTripComponent = new BlankTripComponent();
    this._sortingComponent = new SortingComponent();
  }

  render(container) {
    if (this._events.length === 0) {
      this._blankTripComponent.render(container);
      return;
    }

    this._sortingComponent.setSortTypeChangeHandler(() => {
      const newSortedTripElement = getTripElement(this._sortingComponent.getSortType(), this._events);
      replace(newSortedTripElement, sortedTripElement);
      sortedTripElement = newSortedTripElement;
    });

    this._sortingComponent.render(container);

    let sortedTripElement = getTripElement(this._sortingComponent.getSortType(), this._events);
    sortedTripElement.render(container);
  }
}
