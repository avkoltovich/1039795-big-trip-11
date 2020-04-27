import {getISOStringDate} from './helpers/utils.js';
import {InsertionPosition, render, replace} from './helpers/render.js';
import InfoComponent from './components/header/info.js';
import MenuComponent from './components/header/menu.js';
import FilterComponent from './components/header/filter.js';
import SortingComponent from './components/sorting.js';
import DaysListComponent from './components/days/days-list.js';
import DayItemComponent from './components/days/day.js';
import EventEditComponent from './components/events/event-edit.js';
import EventsListComponent from './components/events/events-list.js';
import EventComponent from './components/events/event.js';
import NoEventsComponent from "./components/events/no-events.js";
import {getRandomEvents} from './mocks/events.js';

const POINTS_COUNT = 20;
const FORM_ID = 1;
const tripMain = document.querySelector(`.trip-main`);
const tripMainControls = tripMain.querySelector(`.trip-main__trip-controls`);
const tripEventsSection = document.querySelector(`.trip-events`);

const getSortingEvents = (events) => {
  return (
    events.slice().sort((a, b) => a.date.start - b.date.start)
  );
};

const getPassedDays = (start, end) => (new Date(new Date(end) - new Date(start))).getDate();

const randomEvents = getSortingEvents(getRandomEvents(POINTS_COUNT));

const renderHeader = () => {
  render(tripMain, new InfoComponent(), InsertionPosition.AFTERBEGIN);
  render(tripMainControls.querySelector(`h2`), new MenuComponent(), InsertionPosition.AFTEREND);
  render(tripMainControls, new FilterComponent(), InsertionPosition.BEFOREEND);
};

const renderDaysList = (daysListComponent) => {
  render(tripEventsSection.querySelector(`h2`), new SortingComponent(), InsertionPosition.AFTEREND);
  render(tripEventsSection, daysListComponent, InsertionPosition.BEFOREEND);
};

const renderDayItem = (daysListComponent, event, count) => {
  render(daysListComponent, new DayItemComponent(event, count), InsertionPosition.BEFOREEND);
};

const renderEventItem = (eventsListElement, event) => {
  const eventComponent = new EventComponent(event);
  const eventEditComponent = new EventEditComponent(event, FORM_ID);
  const rollUpEventButton = eventComponent.getElement().querySelector(`.event__rollup-btn`);

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

  rollUpEventButton.addEventListener(`click`, onRollUpEventButtonClick);

  eventEditComponent.getElement().addEventListener(`submit`, onEditFormSubmit);

  render(eventsListElement, eventComponent, InsertionPosition.BEFOREEND);
};

const renderMain = (events) => {
  if (events.length === 0) {
    render(tripEventsSection.querySelector(`h2`), new NoEventsComponent(), InsertionPosition.AFTEREND);
    return;
  }
  const daysListComponent = new DaysListComponent();
  renderDaysList(daysListComponent);
  let daysPassed;
  let startDateTime;
  let previousDateTime;

  for (let event of events) {
    const currentDateTime = getISOStringDate(event.date.start).slice(0, 10);

    if (previousDateTime === currentDateTime) {
      const currentDateTimeElement = daysListComponent.getElement().querySelector(`[datetime="${currentDateTime}"]`);
      const currentEventsListElement = currentDateTimeElement.parentElement.parentElement.querySelector(`.trip-events__list`);
      renderEventItem(currentEventsListElement, event);
    } else {
      startDateTime = startDateTime ? startDateTime : currentDateTime;
      daysPassed = daysPassed ? getPassedDays(startDateTime, currentDateTime) : 1;
      renderDayItem(daysListComponent.getElement(), event, daysPassed);
      const currentDateTimeElement = daysListComponent.getElement().querySelector(`[datetime="${currentDateTime}"]`);
      render(currentDateTimeElement.parentElement.parentElement, new EventsListComponent(), InsertionPosition.BEFOREEND);
      const currentEventsListElement = currentDateTimeElement.parentElement.parentElement.querySelector(`.trip-events__list`);
      renderEventItem(currentEventsListElement, event);
      previousDateTime = currentDateTime;
    }
  }
};

renderHeader();
renderMain(randomEvents);
