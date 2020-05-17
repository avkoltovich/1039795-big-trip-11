import {filterTypeMap, sortTypeMap} from '../helpers/const.js';

export default class Events {
  constructor() {
    this._events = [];
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

  setEvents(events) {
    this._events = Array.from(events);
    this._sortedByDayEvents = this._getSortedEvents(this._events);
    this._callHandlers(this._dataChangeHandlers);
  }

  updateEvent(id, event) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index), event, this._events.slice(index + 1));

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
        sortedEvents.sort((a, b) => a.date.start - b.date.start);
        break;
      case sortTypeMap.TIME:
        sortedEvents.sort((a, b) => (b.date.end - b.date.start) - (a.date.end - a.date.start));
        break;
      case sortTypeMap.PRICE:
        sortedEvents.sort((a, b) => b.price - a.price);
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
    const index = this._sortedByDayEvents.findIndex((it) => it.date.start > nowDate);
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
