import DaysListComponent from './days/days-list.js';
import DayItemBlankComponent from './days/day-blank.js';
import EventsListComponent from './events/events-list.js';
import EventItemElement from './events/event-item.js';

const getTripWithoutDays = (events) => {
  const daysListComponent = new DaysListComponent();
  const dayItemComponent = new DayItemBlankComponent();
  dayItemComponent.render(daysListComponent);

  const eventsListComponent = new EventsListComponent();
  eventsListComponent.render(dayItemComponent);

  for (let event of events) {
    const eventItemElement = new EventItemElement(event);
    eventItemElement.render(eventsListComponent);
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
