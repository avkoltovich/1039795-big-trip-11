import {getISOStringDate} from '../helpers/utils.js';
import {InsertionPosition, render, replace, remove} from '../helpers/render.js';
import SortingComponent, {sortTypeMap} from '../components/sorting.js';
import DaysListComponent from '../components/days/days-list.js';
import DayItemComponent from '../components/days/day.js';
import DayItemBlankComponent from '../components/days/day-blank.js';
import EventEditComponent from '../components/events/event-edit.js';
import EventsListComponent from '../components/events/events-list.js';
import EventComponent from '../components/events/event.js';
import NoEventsComponent from '../components/events/no-events.js';

const getPassedDays = (start, end) => (new Date(new Date(end) - new Date(start))).getDate();

const renderSortingElement = (eventsSection, sortingComponent) => {
  render(eventsSection.querySelector(`h2`), sortingComponent, InsertionPosition.AFTEREND);
};

const renderDaysListElement = (eventsSection, daysListComponent) => {
  render(eventsSection, daysListComponent, InsertionPosition.BEFOREEND);
};

const renderDayItemElement = (daysListComponent, dayItemComponent) => {
  render(daysListComponent.getElement(), dayItemComponent, InsertionPosition.BEFOREEND);
};

const renderEventsListElement = (eventsListContainer, EventsListElement) => {
  render(eventsListContainer.getElement(), EventsListElement, InsertionPosition.BEFOREEND);
};

const renderEventItemElement = (eventsListElement, event) => {
  const eventComponent = new EventComponent(event);
  const eventEditComponent = new EventEditComponent(event);

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

const renderEventsByDays = (daysListComponent, sortedEvents) => {
  let daysPassed;
  let startDateTime;
  let previousDateTime;
  let currentEventsListElement;

  for (let event of sortedEvents) {
    const currentDateTime = getISOStringDate(event.date.start).slice(0, 10);

    if (previousDateTime === currentDateTime) {
      renderEventItemElement(currentEventsListElement, event);
    } else {
      startDateTime = startDateTime ? startDateTime : currentDateTime;
      daysPassed = daysPassed ? getPassedDays(startDateTime, currentDateTime) : 1;

      const currentDayItemElement = new DayItemComponent(event, daysPassed);
      renderDayItemElement(daysListComponent, currentDayItemElement);

      currentEventsListElement = new EventsListComponent();
      renderEventsListElement(currentDayItemElement, currentEventsListElement);
      renderEventItemElement(currentEventsListElement, event);

      previousDateTime = currentDateTime;
    }
  }
};

const renderEventsByTimeOrPrice = (daysListComponent, sortedEvents) => {
  const dayItemComponent = new DayItemBlankComponent();
  renderDayItemElement(daysListComponent, dayItemComponent);

  const eventsListComponent = new EventsListComponent();
  renderEventsListElement(dayItemComponent, eventsListComponent);

  for (let event of sortedEvents) {
    renderEventItemElement(eventsListComponent, event);
  }
};

const renderSortedEvents = (sortType, daysListComponent, events) => {
  let sortedEvents = [];
  const showingEvents = events.slice();

  switch (sortType) {
    case sortTypeMap.DEFAULT:
      sortedEvents = showingEvents.sort((a, b) => a.date.start - b.date.start);
      renderEventsByDays(daysListComponent, sortedEvents);
      break;
    case sortTypeMap.TIME:
      sortedEvents = showingEvents.sort((a, b) => (b.date.end - b.date.start) - (a.date.end - a.date.start));
      renderEventsByTimeOrPrice(daysListComponent, sortedEvents);
      break;
    case sortTypeMap.PRICE:
      sortedEvents = showingEvents.sort((a, b) => b.price - a.price);
      renderEventsByTimeOrPrice(daysListComponent, sortedEvents);
      break;
    default:
      sortedEvents = showingEvents.sort((a, b) => a.date.start - b.date.start);
      renderEventsByDays(daysListComponent, sortedEvents);
      break;
  }
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noEventsComponent = new NoEventsComponent();
    this._sortingComponent = new SortingComponent();
    this._daysListComponent = new DaysListComponent();
  }

  render(events) {
    if (events.length === 0) {
      render(this._container.querySelector(`h2`), this._noEventsComponent, InsertionPosition.AFTEREND);
      return;
    }

    this._sortingComponent.setSortTypeChangeHandler(() => {
      remove(this._daysListComponent.getElement());
      this._daysListComponent.removeElement();
      renderDaysListElement(this._container, this._daysListComponent);
      renderSortedEvents(this._sortingComponent.getSortType(), this._daysListComponent, events);
    });

    renderSortingElement(this._container, this._sortingComponent);
    renderDaysListElement(this._container, this._daysListComponent);
    renderSortedEvents(this._sortingComponent.getSortType(), this._daysListComponent, events);
  }
}
