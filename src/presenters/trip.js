import {sortTypeMap} from '../helpers/const.js';
import {render, replace, InsertionPosition} from '../helpers/render.js';
import SortingComponent from '../components/sorting.js';
import BlankTripComponent from '../components/trip/blank-trip.js';
import EventsGroupByDaysComponent from '../components/trip/points-group-by-days.js';
import EventsGroupByTimeOrPriceComponent from '../components/trip/points-group-by-time-or-price.js';
import PointsObserver from '../observers/points-observer.js';

export default class TripPresenter {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._tripElement = null;
    this._blankTripComponent = new BlankTripComponent();
    this._sortingComponent = new SortingComponent();
    this._pointsObserver = new PointsObserver(this._eventsModel);

    this._onSortChange = this._onSortChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._eventsModel.setSortHandlers(this._onSortChange);
    this._eventsModel.setDataChangeHandler(this._onDataChange);
    this._eventsModel.setFilterHandlers(this._onFilterChange);
  }

  render() {
    const events = this._eventsModel.getEvents();

    if (events.length === 0) {
      render(this._container, this._blankTripComponent, InsertionPosition.BEFOREEND);
      return;
    }

    this._sortingComponent.setSortTypeChangeHandler((sortType) => {
      this._eventsModel.setSortType(sortType);
    });

    render(this._container, this._sortingComponent, InsertionPosition.BEFOREEND);

    this._tripElement = this._getTripElement(this._eventsModel.getSortType());
    render(this._container, this._tripElement, InsertionPosition.BEFOREEND);
  }

  _getTripElement(sortType) {
    const sortedEvents = this._eventsModel.getEvents();

    if (sortType === sortTypeMap.DEFAULT) {
      return new EventsGroupByDaysComponent(sortedEvents, this._pointsObserver);
    }

    return new EventsGroupByTimeOrPriceComponent(sortedEvents, this._pointsObserver);
  }

  _onSortChange() {
    const filteredAndSortedTripElement = this._getTripElement(this._eventsModel.getSortType());
    replace(filteredAndSortedTripElement, this._tripElement);
    this._tripElement = filteredAndSortedTripElement;
  }

  _onDataChange() {
    this._onSortChange();
  }

  _onFilterChange() {
    const sortingComponent = new SortingComponent();
    replace(sortingComponent, this._sortingComponent);
    this._sortingComponent = sortingComponent;

    this._sortingComponent.setSortTypeChangeHandler((sortType) => {
      this._eventsModel.setSortType(sortType);
    });

    this._onSortChange();
  }
}
