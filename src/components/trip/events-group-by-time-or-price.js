import {render, InsertionPosition} from '../../helpers/render.js';
import DaysListComponent from './days/days-list.js';
import DayItemBlankComponent from './days/day-blank.js';
import EventsListComponent from './events/events-list.js';
import EventController from '../../controllers/event.js';

export default class EventsGroupByTimeOrPrice {
  constructor(events, onDataChange, eventObserver) {
    this._events = events;
    this._onDataChange = onDataChange;
    this._eventObserver = eventObserver;
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
      const eventController = new EventController(eventsListComponent, this._onDataChange, this._eventObserver);
      eventController.render(event);
    }

    return daysListComponent;
  }
}
