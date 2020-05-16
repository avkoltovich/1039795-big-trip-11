import {sortTypeMap} from '../helpers/const.js';

export default class Events {
  constructor() {
    this._events = [];
    this._activeSortType = sortTypeMap.DEFAULT;

    this._dataChangeHandlers = [];
  }

  getEvents() {
    return this._getSortedEvents();
  }

  setEvents(events) {
    this._events = Array.from(events);
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
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _getSortedEvents() {
    let sortedEvents = this._events.slice();

    switch (this._activeSortType) {
      default:
        sortedEvents = sortedEvents.sort((a, b) => a.date.start - b.date.start);
        break;
      case sortTypeMap.TIME:
        sortedEvents = sortedEvents.sort((a, b) => (b.date.end - b.date.start) - (a.date.end - a.date.start));
        break;
      case sortTypeMap.PRICE:
        sortedEvents = sortedEvents.sort((a, b) => b.price - a.price);
        break;
    }

    return sortedEvents;
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
