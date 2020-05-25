import {Mode, sortTypeMap} from '../helpers/const.js';
import {render, replace, InsertionPosition} from '../helpers/render.js';
import SortingComponent from '../components/sorting.js';
import BlankTripComponent from '../components/trip/blank-trip.js';
import EventsGroupByDaysComponent from '../components/trip/points-group-by-days.js';
import EventsGroupByTimeOrPriceComponent from '../components/trip/points-group-by-time-or-price.js';
import PointsPresenter from './points.js';
import PointPresenter from './point.js';

const emptyEvent = {
  'basePrice': 0,
  'dateFrom': new Date(),
  'dateTo': new Date(),
  'destination': null,
  'id': null,
  'isFavorite': false,
  'offers': null,
  'type': `taxi`
};

export default class TripPresenter {
  constructor(container, eventsModel) {
    this._blankTripComponent = new BlankTripComponent();
    this._container = container;
    this._eventsModel = eventsModel;
    this._emptyEvent = emptyEvent;
    this._enableNewEventButtonHandler = null;
    this._newPointPresenter = null;
    this._pointsPresenter = new PointsPresenter(this._eventsModel);
    this._sortingComponent = new SortingComponent();
    this._tripElement = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this.newEvent = this.newEvent.bind(this);

    this._eventsModel.setDataChangeHandler(this._onDataChange);
    this._eventsModel.setFilterHandlers(this._onFilterChange);
    this._eventsModel.setSortHandlers(this._onSortChange);

    this._pointsPresenter.setEnableNewEventButtonHandler(this._enableNewEventButtonHandler);

  }

  newEvent() {
    this._newPointPresenter = new PointPresenter(this._sortingComponent, this._emptyEvent, this._pointsPresenter);
    this._newPointPresenter.render(Mode.CREATE);
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

  setEnableNewEventButtonHandler(handler) {
    this._enableNewEventButtonHandler = handler;
    this._pointsPresenter.setEnableNewEventButtonHandler(this._enableNewEventButtonHandler);
  }

  _getTripElement(sortType) {
    const sortedEvents = this._eventsModel.getEvents();

    if (sortType === sortTypeMap.DEFAULT) {
      return new EventsGroupByDaysComponent(sortedEvents, this._pointsPresenter);
    }

    return new EventsGroupByTimeOrPriceComponent(sortedEvents, this._pointsPresenter);
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

  _onSortChange() {
    if (this._enableNewEventButtonHandler) {
      this._enableNewEventButtonHandler();
    }

    if (this._newPointPresenter) {
      this._pointsPresenter.collapseAndUnsubscribeAll();
      this._newPointPresenter.remove();
    }
    const filteredAndSortedTripElement = this._getTripElement(this._eventsModel.getSortType());
    replace(filteredAndSortedTripElement, this._tripElement);
    this._tripElement = filteredAndSortedTripElement;
  }
}
