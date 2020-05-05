import {sortTypeMap} from '../helpers/const.js';
import {render, replace, InsertionPosition} from '../helpers/render.js';
import SortingComponent from '../components/sorting.js';
import BlankTripComponent from '../components/trip/blank-trip.js';
import EventsGroupByDaysComponent from '../components/trip/events-group-by-days.js';
import EventsGroupByTimeOrPriceComponent from '../components/trip/events-group-by-time-or-price.js';

const getTripElement = (sortType, events) => {
  const showingEvents = events.slice();
  let sortedEvents = [];
  let tripElement;

  switch (sortType) {
    case sortTypeMap.DEFAULT:
      sortedEvents = showingEvents.sort((a, b) => a.date.start - b.date.start);
      tripElement = new EventsGroupByDaysComponent(sortedEvents);
      break;
    case sortTypeMap.TIME:
      sortedEvents = showingEvents.sort((a, b) => (b.date.end - b.date.start) - (a.date.end - a.date.start));
      tripElement = new EventsGroupByTimeOrPriceComponent(sortedEvents);
      break;
    case sortTypeMap.PRICE:
      sortedEvents = showingEvents.sort((a, b) => b.price - a.price);
      tripElement = new EventsGroupByTimeOrPriceComponent(sortedEvents);
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
      render(container, this._blankTripComponent, InsertionPosition.BEFOREEND);
      return;
    }

    this._sortingComponent.setSortTypeChangeHandler(() => {
      const newSortedTripElement = getTripElement(this._sortingComponent.getSortType(), this._events);
      replace(newSortedTripElement, sortedTripElement);
      sortedTripElement = newSortedTripElement;
    });

    render(container, this._sortingComponent, InsertionPosition.BEFOREEND);

    let sortedTripElement = getTripElement(this._sortingComponent.getSortType(), this._events);
    render(container, sortedTripElement, InsertionPosition.BEFOREEND);
  }
}
