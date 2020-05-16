import {sortTypeMap} from '../helpers/const.js';
import {render, replace, InsertionPosition} from '../helpers/render.js';
import SortingComponent from '../components/sorting.js';
import BlankTripComponent from '../components/trip/blank-trip.js';
import EventsGroupByDaysComponent from '../components/trip/points-group-by-days.js';
import EventsGroupByTimeOrPriceComponent from '../components/trip/points-group-by-time-or-price.js';
import PointObserver from '../observers/point-observer.js';

export default class TripController {
  constructor(events) {
    this._events = events;
    this._blankTripComponent = new BlankTripComponent();
    this._sortingComponent = new SortingComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._pointObserver = new PointObserver();
    this._pointObserver.setSyncDataFunction(this._onDataChange);
  }

  render(container) {
    if (this._events.length === 0) {
      render(container, this._blankTripComponent, InsertionPosition.BEFOREEND);
      return;
    }

    this._sortingComponent.setSortTypeChangeHandler(() => {
      const newSortedTripElement = this._getTripElement(this._sortingComponent.getSortType());
      replace(newSortedTripElement, sortedTripElement);
      sortedTripElement = newSortedTripElement;
    });

    render(container, this._sortingComponent, InsertionPosition.BEFOREEND);

    let sortedTripElement = this._getTripElement(this._sortingComponent.getSortType());
    render(container, sortedTripElement, InsertionPosition.BEFOREEND);
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    pointController.render(this._events[index]);
  }

  _getTripElement(sortType) {
    const showingEvents = this._events.slice();
    let sortedEvents = [];
    let tripElement;

    switch (sortType) {
      default:
        sortedEvents = showingEvents.sort((a, b) => a.date.start - b.date.start);
        tripElement = new EventsGroupByDaysComponent(sortedEvents, this._pointObserver);
        break;
      case sortTypeMap.TIME:
        sortedEvents = showingEvents.sort((a, b) => (b.date.end - b.date.start) - (a.date.end - a.date.start));
        tripElement = new EventsGroupByTimeOrPriceComponent(sortedEvents, this._pointObserver);
        break;
      case sortTypeMap.PRICE:
        sortedEvents = showingEvents.sort((a, b) => b.price - a.price);
        tripElement = new EventsGroupByTimeOrPriceComponent(sortedEvents, this._pointObserver);
        break;
    }

    return tripElement;
  }
}
