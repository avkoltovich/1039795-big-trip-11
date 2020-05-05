import {render, InsertionPosition} from '../../helpers/render.js';
import {getISOStringDate} from '../../helpers/utils.js';
import DayItemComponent from './days/day.js';
import DaysListComponent from './days/days-list.js';
import EventsListComponent from './events/events-list.js';
import EventController from '../../controllers/event.js';

const getPassedDays = (start, end) => (new Date(new Date(end) - new Date(start))).getDate();

const getTripWithDays = (events) => {
  const daysListComponent = new DaysListComponent();
  let daysPassed;
  let startDateTime;
  let previousDateTime;
  let currentEventsListElement;

  for (let event of events) {
    const currentDateTime = getISOStringDate(event.date.start).slice(0, 10);

    if (previousDateTime === currentDateTime) {
      const eventController = new EventController(currentEventsListElement);
      eventController.render(event);
    } else {
      startDateTime = startDateTime ? startDateTime : currentDateTime;
      daysPassed = daysPassed ? getPassedDays(startDateTime, currentDateTime) : 1;

      const currentDayItemElement = new DayItemComponent(event, daysPassed);
      render(daysListComponent, currentDayItemElement, InsertionPosition.BEFOREEND);

      currentEventsListElement = new EventsListComponent();
      render(currentDayItemElement, currentEventsListElement, InsertionPosition.BEFOREEND);
      const eventController = new EventController(currentEventsListElement);
      eventController.render(event);

      previousDateTime = currentDateTime;
    }
  }

  return daysListComponent;
};

export default class TripWithDays {
  constructor(events) {
    this._events = events;
    this._element = getTripWithDays(this._events);

    return this._element;
  }
}
