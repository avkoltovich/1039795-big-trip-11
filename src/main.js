import {getISOStringDate, InsertionPosition, render} from './helpers/utils.js';
import InfoComponent from './components/header/info.js';
import MenuComponent from './components/header/menu.js';
import FilterComponent from './components/header/filter/filter.js';
import SortingComponent from './components/sorting.js';
import DaysListComponent from './components/days/days-list.js';
import DayItemComponent from './components/days/day.js';
import EventEditComponent from './components/events/event-edit/event-edit.js';
import EventsListComponent from './components/events/events-list.js';
import EventComponent from './components/events/event.js';
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
  render(tripMain, new InfoComponent().getElement(), InsertionPosition.AFTERBEGIN);
  render(tripMainControls.querySelector(`h2`), new MenuComponent().getElement(), InsertionPosition.AFTEREND);
  render(tripMainControls, new FilterComponent().getElement(), InsertionPosition.BEFOREEND);
};

const renderDaysList = (daysListComponent) => {
  render(tripEventsSection.querySelector(`h2`), new SortingComponent().getElement(), InsertionPosition.AFTEREND);
  render(tripEventsSection, daysListComponent, InsertionPosition.BEFOREEND);
};

const renderDayItem = (daysListComponent, event, count) => {
  render(daysListComponent, new DayItemComponent(event, count).getElement(), InsertionPosition.BEFOREEND);
};

const renderEventItem = (eventsListElement, event) => {
  const onRollUpEventButtonClick = () => {
    eventComponent.getElement().replaceChild(eventEditComponent.getElement(), eventInnerWrapper);
  };

  const onRollUpEventEditButtonClick = () => {
    eventComponent.getElement().replaceChild(eventInnerWrapper, eventEditComponent.getElement());
  };

  const eventComponent = new EventComponent(event);
  const eventInnerWrapper = eventComponent.getElement().querySelector(`.event`);
  const rollUpEventButton = eventInnerWrapper.querySelector(`.event__rollup-btn`);
  rollUpEventButton.addEventListener(`click`, onRollUpEventButtonClick);

  const eventEditComponent = new EventEditComponent(event, FORM_ID);
  eventEditComponent.getElement().addEventListener(`submit`, onRollUpEventEditButtonClick);

  render(eventsListElement, eventComponent.getElement(), InsertionPosition.BEFOREEND);
};

const renderMain = (events) => {
  const daysListComponent = new DaysListComponent().getElement();
  renderDaysList(daysListComponent);
  let daysPassed;
  let startDateTime;
  let previousDateTime;

  for (let event of events) {
    const currentDateTime = getISOStringDate(event.date.start).slice(0, 10);

    if (previousDateTime === currentDateTime) {
      const currentDateTimeElement = daysListComponent.querySelector(`[datetime="${currentDateTime}"]`);
      const currentEventsListElement = currentDateTimeElement.parentElement.parentElement.querySelector(`.trip-events__list`);
      renderEventItem(currentEventsListElement, event);
    } else {
      startDateTime = startDateTime ? startDateTime : currentDateTime;
      daysPassed = daysPassed ? getPassedDays(startDateTime, currentDateTime) : 1;
      renderDayItem(daysListComponent, event, daysPassed);
      const currentDateTimeElement = daysListComponent.querySelector(`[datetime="${currentDateTime}"]`);
      render(currentDateTimeElement.parentElement.parentElement, new EventsListComponent().getElement(), InsertionPosition.BEFOREEND);
      const currentEventsListElement = currentDateTimeElement.parentElement.parentElement.querySelector(`.trip-events__list`);
      renderEventItem(currentEventsListElement, event);
      previousDateTime = currentDateTime;
    }
  }
};

renderHeader();
renderMain(randomEvents);
