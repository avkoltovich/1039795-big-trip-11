import {sortTypeMap} from '../helpers/const.js';
import {render, replace, InsertionPosition} from '../helpers/render.js';
import SortingComponent from '../components/sorting.js';
import BlankTripComponent from '../components/trip/blank-trip.js';
import EventsGroupByDaysComponent from '../components/trip/points-group-by-days.js';
import EventsGroupByTimeOrPriceComponent from '../components/trip/points-group-by-time-or-price.js';
import PointsObserver from '../observers/points-observer.js';

export default class TripController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._blankTripComponent = new BlankTripComponent();
    this._sortingComponent = new SortingComponent();

    this._pointsObserver = new PointsObserver(this._eventsModel);
  }

  render() {
    const events = this._eventsModel.getEvents();

    if (events.length === 0) {
      render(this._container, this._blankTripComponent, InsertionPosition.BEFOREEND);
      return;
    }

    this._sortingComponent.setSortTypeChangeHandler(() => {
      const newSortedTripElement = this._getTripElement(this._sortingComponent.getSortType());
      replace(newSortedTripElement, sortedTripElement);
      sortedTripElement = newSortedTripElement;
    });

    render(this._container, this._sortingComponent, InsertionPosition.BEFOREEND);

    let sortedTripElement = this._getTripElement(this._sortingComponent.getSortType());
    render(this._container, sortedTripElement, InsertionPosition.BEFOREEND);
  }

  _getTripElement(sortType) {
    this._eventsModel.setSortType(sortType);
    const sortedEvents = this._eventsModel.getEvents();

    if (sortType === sortTypeMap.DEFAULT) {
      return new EventsGroupByDaysComponent(sortedEvents, this._pointsObserver);
    }

    return new EventsGroupByTimeOrPriceComponent(sortedEvents, this._pointsObserver);
  }
}
