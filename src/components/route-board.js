import {replace} from '../helpers/render.js';
import {getSortedEvents} from '../controllers/trip.js';
import {sortTypeMap} from '../helpers/const.js';
import SortingComponent from '../components/sorting.js';
import BlankTripComponent from '../components/trip/blank-trip.js';
import TripWithDaysElement from '../components/trip/trip-with-days.js';
import TripWithoutDaysElement from '../components/trip/trip-without-days.js';

const getSortedTripElement = (sortType, events) => {
  const sortedEvents = getSortedEvents(sortType, events);
  let tripElement;

  switch (sortType) {
    case sortTypeMap.DEFAULT:
      tripElement = new TripWithDaysElement(sortedEvents);
      break;
    case sortTypeMap.TIME:
      tripElement = new TripWithoutDaysElement(sortedEvents);
      break;
    case sortTypeMap.PRICE:
      tripElement = new TripWithoutDaysElement(sortedEvents);
      break;
  }

  return tripElement;
};

export default class RouteBoardElement {
  constructor(container) {
    this._container = container;

    this._blankTripComponent = new BlankTripComponent();
    this._sortingComponent = new SortingComponent();
  }

  render(events) {
    if (events.length === 0) {
      this._blankTripComponent.render(this._container);
      return;
    }

    this._sortingComponent.setSortTypeChangeHandler(() => {
      const newSortedTripElement = getSortedTripElement(this._sortingComponent.getSortType(), events);
      replace(newSortedTripElement, sortedTripElement);
      sortedTripElement = newSortedTripElement;
    });

    this._sortingComponent.render(this._container);

    let sortedTripElement = getSortedTripElement(this._sortingComponent.getSortType(), events);
    sortedTripElement.render(this._container);
  }
}
