import {getISOStringDate} from '../helpers/utils.js';
import {InsertionPosition, render, replace} from '../helpers/render.js';
import SortingComponent from '../components/sorting.js';
import DaysListComponent from '../components/days/days-list.js';
import DayItemComponent from '../components/days/day.js';
import EventEditComponent from '../components/events/event-edit.js';
import EventsListComponent from '../components/events/events-list.js';
import EventComponent from '../components/events/event.js';
import NoEventsComponent from "../components/events/no-events.js";

const FORM_ID = 1;

const getPassedDays = (start, end) => (new Date(new Date(end) - new Date(start))).getDate();

const renderDaysList = (eventsSection, daysListComponent) => {
  render(eventsSection.querySelector(`h2`), new SortingComponent(), InsertionPosition.AFTEREND);
  render(eventsSection, daysListComponent, InsertionPosition.BEFOREEND);
};

const renderDayItem = (daysListComponent, dayItemComponent) => {
  render(daysListComponent.getElement(), dayItemComponent, InsertionPosition.BEFOREEND);
};

const renderEventsList = (eventsListContainer, EventsListElement) => {
  render(eventsListContainer.getElement(), EventsListElement, InsertionPosition.BEFOREEND);
};

const renderEventItem = (eventsListElement, event) => {
  const eventComponent = new EventComponent(event);
  const eventEditComponent = new EventEditComponent(event, FORM_ID);

  const replaceEventToEdit = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceEditToEvent = () => {
    replace(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onRollUpEventButtonClick = () => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const onEditFormSubmit = () => {
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  eventComponent.setEditButtonClickHandler(onRollUpEventButtonClick);

  eventEditComponent.setSubmitHandler(onEditFormSubmit);

  render(eventsListElement.getElement(), eventComponent, InsertionPosition.BEFOREEND);
};

const renderTrip = (eventsSection, events) => {
  if (events.length === 0) {
    render(eventsSection.querySelector(`h2`), new NoEventsComponent(), InsertionPosition.AFTEREND);
    return;
  }

  const daysListComponent = new DaysListComponent();

  renderDaysList(eventsSection, daysListComponent);

  let daysPassed;
  let startDateTime;
  let previousDateTime;
  let currentEventsListElement;

  for (let event of events) {
    const currentDateTime = getISOStringDate(event.date.start).slice(0, 10);

    if (previousDateTime === currentDateTime) {
      renderEventItem(currentEventsListElement, event);
    } else {
      startDateTime = startDateTime ? startDateTime : currentDateTime;
      daysPassed = daysPassed ? getPassedDays(startDateTime, currentDateTime) : 1;

      const currentDayItemElement = new DayItemComponent(event, daysPassed);
      renderDayItem(daysListComponent, currentDayItemElement);

      currentEventsListElement = new EventsListComponent();
      renderEventsList(currentDayItemElement, currentEventsListElement);
      renderEventItem(currentEventsListElement, event);

      previousDateTime = currentDateTime;
    }
  }
};

export default class TripController {
  constructor(container) {
    this._container = container;
  }

  render(events) {
    renderTrip(this._container, events);
  }
}
