import {render, InsertionPosition} from '../../helpers/render.js';
import DaysListComponent from './days/days-list.js';
import DayItemBlankComponent from './days/day-blank.js';
import EventsListComponent from './events/events-list.js';
import PointController from '../../controllers/point.js';

export default class EventsGroupByTimeOrPrice {
  constructor(events, pointObserver) {
    this._events = events;
    this._pointObserver = pointObserver;
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
      const pointController = new PointController(eventsListComponent, this._pointObserver);
      pointController.render(event);
    }

    return daysListComponent;
  }
}
