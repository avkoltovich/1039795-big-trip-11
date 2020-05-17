import {render, InsertionPosition} from '../../helpers/render.js';
import DaysListComponent from './days/days-list.js';
import DayItemBlankComponent from './days/day-blank.js';
import EventsListComponent from './points/points-list.js';
import PointPresenter from '../../presenters/point.js';

export default class EventsGroupByTimeOrPrice {
  constructor(events, destinations, offers, pointsObserver) {
    this._events = events;
    this._destinations = destinations;
    this._offers = offers;
    this._pointsObserver = pointsObserver;
    this._element = this._getEventsGroupByTimeOrPrice();

    return this._element;
  }

  _getEventsGroupByTimeOrPrice() {
    const daysListComponent = new DaysListComponent();
    const dayItemComponent = new DayItemBlankComponent();
    render(daysListComponent, dayItemComponent, InsertionPosition.BEFOREEND);

    const eventsListComponent = new EventsListComponent();
    render(dayItemComponent, eventsListComponent, InsertionPosition.BEFOREEND);

    for (let event of this._events) {
      const pointPresenter = new PointPresenter(eventsListComponent, this._pointsObserver);
      pointPresenter.render(event, this._destinations, this._offers);
    }

    return daysListComponent;
  }
}
