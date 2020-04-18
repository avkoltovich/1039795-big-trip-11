import {getISOStringDate, getPassedDays, InsertionPosition, render} from './utils.js';
import InfoComponent from './components/info.js';
import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import SortingComponent from './components/sorting.js';
import DaysListComponent from './components/days-list.js';
import DayItemComponent from './components/day.js';
import EditEventComponent from './components/edit-event.js';
import EventsListComponent from './components/events-list.js';
import EventComponent from './components/event.js';
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

const randomEvents = getSortingEvents(getRandomEvents(POINTS_COUNT));

const renderHeader = () => {
  render(tripMain, new InfoComponent().getElement(), InsertionPosition.AFTERBEGIN);
  render(tripMainControls.querySelector(`h2`), new MenuComponent().getElement(), InsertionPosition.AFTEREND);
  render(tripMainControls, new FilterComponent().getElement(), InsertionPosition.BEFOREEND);
};

const renderTripDaysList = (daysListComponent) => {
  render(tripEventsSection.querySelector(`h2`), new SortingComponent().getElement(), InsertionPosition.AFTEREND);
  render(tripEventsSection, daysListComponent, InsertionPosition.BEFOREEND);
};

const renderTripDayItem = (daysListComponent, event, count) => {
  render(daysListComponent, new DayItemComponent(event, count).getElement(), InsertionPosition.BEFOREEND);
};

const renderEditEventForm = (event, formID) => {
  render(tripEventsSection.querySelector(`h2`), new EditEventComponent(event, formID).getElement(), InsertionPosition.AFTEREND);
};

const renderMain = (events) => {
  renderEditEventForm(events[0], FORM_ID);
  const daysListComponent = new DaysListComponent().getElement();
  renderTripDaysList(daysListComponent);
  const slicedEvents = events.slice(1);
  let daysPassed;
  let startDateTime;
  let previousDateTime;

  for (let event of slicedEvents) {
    const currentDateTime = getISOStringDate(event.date.start).slice(0, 10);

    if (previousDateTime === currentDateTime) {
      const currentDateTimeElement = daysListComponent.querySelector(`[datetime="${currentDateTime}"]`);
      const currentEventsListElement = currentDateTimeElement.parentElement.parentElement.querySelector(`.trip-events__list`);
      render(currentEventsListElement, new EventComponent(event).getElement(), InsertionPosition.BEFOREEND);
    } else {
      startDateTime = startDateTime ? startDateTime : currentDateTime;
      daysPassed = daysPassed ? getPassedDays(startDateTime, currentDateTime) : 1;
      renderTripDayItem(daysListComponent, event, daysPassed);
      const currentDateTimeElement = daysListComponent.querySelector(`[datetime="${currentDateTime}"]`);
      render(currentDateTimeElement.parentElement.parentElement, new EventsListComponent().getElement(), InsertionPosition.BEFOREEND);
      const currentEventsListElement = currentDateTimeElement.parentElement.parentElement.querySelector(`.trip-events__list`);
      render(currentEventsListElement, new EventComponent(event).getElement(), InsertionPosition.BEFOREEND);
      previousDateTime = currentDateTime;
    }
  }
};

renderHeader();
renderMain(randomEvents);
