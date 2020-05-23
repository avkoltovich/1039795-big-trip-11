import {render, InsertionPosition} from '../../helpers/render.js';
import {getISOStringDate} from '../../helpers/utils.js';
import DayItemComponent from './days/day.js';
import DaysListComponent from './days/days-list.js';
import EventsListComponent from './points/points-list.js';
import PointPresenter from '../../presenters/point.js';

export default class EventsGroupByDays {
  constructor(events, destinations, offers, editablePointsPresenter) {
    this._events = events;
    this._destinations = destinations;
    this._offers = offers;
    this._editablePointPresenter = editablePointsPresenter;
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
      const currentDateTime = getISOStringDate(event[`dateFrom`]).slice(0, 10);

      if (previousDateTime === currentDateTime) {
        const pointPresenter = new PointPresenter(currentEventsListElement, this._editablePointPresenter);
        pointPresenter.render(event, this._destinations, this._offers);
      } else {
        startDateTime = startDateTime ? startDateTime : currentDateTime;
        daysPassed = daysPassed ? this._getPassedDays(startDateTime, currentDateTime) : 1;

        const currentDayItemElement = new DayItemComponent(event, daysPassed);
        render(daysListComponent, currentDayItemElement, InsertionPosition.BEFOREEND);

        currentEventsListElement = new EventsListComponent();
        render(currentDayItemElement, currentEventsListElement, InsertionPosition.BEFOREEND);
        const pointPresenter = new PointPresenter(currentEventsListElement, this._editablePointPresenter);
        pointPresenter.render(event, this._destinations, this._offers);

        previousDateTime = currentDateTime;
      }
    }

    return daysListComponent;
  }
}
