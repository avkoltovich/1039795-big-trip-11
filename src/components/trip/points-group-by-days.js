import {render, InsertionPosition} from '../../helpers/render.js';
import {getISOStringDate} from '../../helpers/utils.js';
import DayItemComponent from './days/day.js';
import DaysListComponent from './days/days-list.js';
import EventsListComponent from './points/points-list.js';
import PointController from '../../controllers/point.js';

export default class EventsGroupByDays {
  constructor(events, pointsObserver) {
    this._events = events;
    this._pointsObserver = pointsObserver;
    this._element = this._getEventsGroupByDays();

    return this._element;
  }

  _getPassedDays(start, end) {
    return (new Date(new Date(end) - new Date(start))).getDate();
  }

  _getEventsGroupByDays() {
    const daysListComponent = new DaysListComponent();
    let daysPassed;
    let startDateTime;
    let previousDateTime;
    let currentEventsListElement;

    for (let event of this._events) {
      const currentDateTime = getISOStringDate(event.date.start).slice(0, 10);

      if (previousDateTime === currentDateTime) {
        const pointController = new PointController(currentEventsListElement, this._pointsObserver);
        pointController.render(event);
      } else {
        startDateTime = startDateTime ? startDateTime : currentDateTime;
        daysPassed = daysPassed ? this._getPassedDays(startDateTime, currentDateTime) : 1;

        const currentDayItemElement = new DayItemComponent(event, daysPassed);
        render(daysListComponent, currentDayItemElement, InsertionPosition.BEFOREEND);

        currentEventsListElement = new EventsListComponent();
        render(currentDayItemElement, currentEventsListElement, InsertionPosition.BEFOREEND);
        const pointController = new PointController(currentEventsListElement, this._pointsObserver);
        pointController.render(event);

        previousDateTime = currentDateTime;
      }
    }

    return daysListComponent;
  }
}
