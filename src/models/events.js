import {filterTypeMap, sortTypeMap} from '../helpers/const.js';

export default class Events {
  constructor() {
    this._events = [];
    this._destinations = [];
    this._offers = [];
    this._sortedByDayEvents = [];
    this._filteredAndSortedEvents = [];
    this._activeSortType = sortTypeMap.DEFAULT;
    this._activeFilterType = filterTypeMap.DEFAULT;

    this._dataChangeHandlers = [];
    this._sortHandlers = [];
    this._filterHandlers = [];
  }

  getEvents() {
    this._filteredAndSortedEvents = this._getSortedEvents(this._getFilteredEvents(this._sortedByDayEvents));
    return this._filteredAndSortedEvents;
  }

  getDestinations() {
    return this._destinations;
  }

  getOffers() {
    return this._offers;
  }

  setEvents(events) {
    this._events = Array.from(events);
    this._sortedByDayEvents = this._getSortedEvents(this._events);
    this._callHandlers(this._dataChangeHandlers);
  }

  setDestinations(destinations) {
    this._destinations = Array.from(destinations);
    this._callHandlers(this._dataChangeHandlers);
  }

  setOffers(offers) {
    this._offers = Array.from(offers);
    this._callHandlers(this._dataChangeHandlers);
  }

  updateEvent(id, event) {
    const index = this._sortedByDayEvents.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._sortedByDayEvents = [].concat(this._sortedByDayEvents.slice(0, index), event, this._sortedByDayEvents.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  removeTask(id) {
    const index = this._sortedByDayEvents.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._sortedByDayEvents = [].concat(this._sortedByDayEvents.slice(0, index), this._sortedByDayEvents.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setSortType(sortType) {
    this._activeSortType = sortType;
    this._callHandlers(this._sortHandlers);
  }

  getSortType() {
    return this._activeSortType;
  }

  _resetSortType() {
    this._activeSortType = sortTypeMap.DEFAULT;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setSortHandlers(handler) {
    this._sortHandlers.push(handler);
  }

  setFilterHandlers(handler) {
    this._filterHandlers.push(handler);
  }

  _getSortedEvents(events) {
    let sortedEvents = events.slice();

    switch (this._activeSortType) {
      default:
        sortedEvents.sort((a, b) => a[`date_from`] - b[`date_from`]);
        break;
      case sortTypeMap.TIME:
        sortedEvents.sort((a, b) => (b[`date_to`] - b[`date_from`]) - (a[`date_to`] - a[`date_from`]));
        break;
      case sortTypeMap.PRICE:
        sortedEvents.sort((a, b) => b[`base_price`] - a[`base_price`]);
        break;
    }

    return sortedEvents;
  }

  setFilterType(filterType) {
    this._resetSortType();
    this._activeFilterType = filterType;
    this._callHandlers(this._filterHandlers);
  }

  _getFilteredEvents(events) {
    const nowDate = new Date();
    const index = this._sortedByDayEvents.findIndex((it) => it[`date_from`] > nowDate);
    let filteredEvents = [];

    switch (this._activeFilterType) {
      default:
        filteredEvents = events.slice();
        break;
      case filterTypeMap.FUTURE:
        filteredEvents = events.slice(index);
        break;
      case filterTypeMap.PAST:
        filteredEvents = events.slice(0, index);
        break;
    }

    return filteredEvents;
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
