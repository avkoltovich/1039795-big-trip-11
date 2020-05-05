import {render, InsertionPosition} from '../../helpers/render.js';
import DaysListComponent from './days/days-list.js';
import DayItemBlankComponent from './days/day-blank.js';
import EventsListComponent from './events/events-list.js';
import EventController from '../../controllers/event.js';

const getTripWithoutDays = (events) => {
  const daysListComponent = new DaysListComponent();
  const dayItemComponent = new DayItemBlankComponent();
  render(daysListComponent, dayItemComponent, InsertionPosition.BEFOREEND);

  const eventsListComponent = new EventsListComponent();
  render(dayItemComponent, eventsListComponent, InsertionPosition.BEFOREEND);

  for (let event of events) {
    const eventController = new EventController(eventsListComponent);
    eventController.render(event);
  }

  return daysListComponent;
};

export default class TripWithoutDays {
  constructor(events) {
    this._events = events;
    this._element = getTripWithoutDays(this._events);

    return this._element;
  }
}
