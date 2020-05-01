import {InsertionPosition, render, replace} from '../helpers/render.js';
import SortingComponent, {sortTypeMap} from '../components/sorting.js';
import NoEventsComponent from '../components/trip/events/no-events.js';
import {getTripWithDays} from '../components/trip/trip-with-days.js';
import {getTripWithoutDays} from '../components/trip/trip-without-days.js';

const renderSortingElement = (eventsSection, sortingComponent) => {
  render(eventsSection.querySelector(`h2`), sortingComponent, InsertionPosition.AFTEREND);
};

const getSortedRoute = (sortType, events) => {
  let sortedDaysListComponent;
  let sortedEvents = [];
  const showingEvents = events.slice();

  switch (sortType) {
    case sortTypeMap.DEFAULT:
      sortedEvents = showingEvents.sort((a, b) => a.date.start - b.date.start);
      sortedDaysListComponent = getTripWithDays(sortedEvents);
      break;
    case sortTypeMap.TIME:
      sortedEvents = showingEvents.sort((a, b) => (b.date.end - b.date.start) - (a.date.end - a.date.start));
      sortedDaysListComponent = getTripWithoutDays(sortedEvents);
      break;
    case sortTypeMap.PRICE:
      sortedEvents = showingEvents.sort((a, b) => b.price - a.price);
      sortedDaysListComponent = getTripWithoutDays(sortedEvents);
      break;
  }

  return sortedDaysListComponent;
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noEventsComponent = new NoEventsComponent();
    this._sortingComponent = new SortingComponent();
  }

  render(events) {
    if (events.length === 0) {
      render(this._container.querySelector(`h2`), this._noEventsComponent, InsertionPosition.AFTEREND);
      return;
    }

    this._sortingComponent.setSortTypeChangeHandler(() => {
      const newSortedRoute = getSortedRoute(this._sortingComponent.getSortType(), events);
      replace(newSortedRoute, sortedRoute);
      sortedRoute = newSortedRoute;
    });

    renderSortingElement(this._container, this._sortingComponent);
    let sortedRoute = getSortedRoute(this._sortingComponent.getSortType(), events);
    sortedRoute.render(this._container);
  }
}
