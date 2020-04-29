import {getISOStringDate} from '../helpers/utils.js';
import {InsertionPosition, render, replace} from '../helpers/render.js';
import SortingComponent, {sortTypeMap} from '../components/sorting.js';
import DaysListComponent from '../components/days/days-list.js';
import DayItemComponent from '../components/days/day.js';
import EventEditComponent from '../components/events/event-edit.js';
import EventsListComponent from '../components/events/events-list.js';
import EventComponent from '../components/events/event.js';
import NoEventsComponent from "../components/events/no-events.js";

const FORM_ID = 1;

const getPassedDays = (start, end) => (new Date(new Date(end) - new Date(start))).getDate();

const renderSortingElement = (eventsSection, sortingComponent) => {
  render(eventsSection.querySelector(`h2`), sortingComponent, InsertionPosition.AFTEREND);
};

const renderDaysList = (eventsSection, daysListComponent) => {
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

const getSortedEvents = (events, sortType) => {
  let sortedEvents = [];
  const showingEvents = events.slice();

  switch (sortType) {
    case sortTypeMap.DEFAULT:
      sortedEvents = showingEvents.sort((a, b) => a.date.start - b.date.start);
      break;

    default:
      sortedEvents = showingEvents.sort((a, b) => a.date.start - b.date.start);
      break;
  }

  return sortedEvents;
};

const renderTripList = (eventsSection, sortedEvents) => {
  const daysListComponent = new DaysListComponent();
  renderDaysList(eventsSection, daysListComponent);

  let daysPassed;
  let startDateTime;
  let previousDateTime;
  let currentEventsListElement;

  for (let event of sortedEvents) {
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

const renderTripBoard = (eventsSection, events) => {
  if (events.length === 0) {
    render(eventsSection.querySelector(`h2`), new NoEventsComponent(), InsertionPosition.AFTEREND);
    return;
  }

  const sortingComponent = new SortingComponent();
  const sortedEvents = getSortedEvents(events, sortingComponent.getSortType());

  sortingComponent.setSortTypeChangeHandler(() => {
    console.log(sortingComponent.getSortType());
  });

  renderSortingElement(eventsSection, sortingComponent);

  renderTripList(eventsSection, sortedEvents);
};

export default class TripController {
  constructor(container) {
    this._container = container;
  }

  render(events) {
    renderTripBoard(this._container, events);
  }
}
