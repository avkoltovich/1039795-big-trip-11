import {getISOStringDate, getPassedDays} from './utils.js';
import {createTripInfoTemplate} from './components/info.js';
import {createTripMenuTemplate} from './components/menu.js';
import {createTripFilterTemplate} from './components/filter.js';
import {createTripSortingTemplate} from './components/sorting.js';
import {createTripDaysListTemplate, createTripDayItemTemplate} from './components/days.js';
import {createTripEventsListTemplate, createEditableTripEventPointTemplate, createTripEventItemTemplate} from './components/events.js';
import {getRandomTripEvents} from './mocks/events.js';

const POINTS_COUNT = 20;
const FORM_COUNT = 1;
const tripMain = document.querySelector(`.trip-main`);
const tripMainControls = tripMain.querySelector(`.trip-main__trip-controls`);
const tripEventsSection = document.querySelector(`.trip-events`);

const getSortingEvents = (events) => {
  return (
    events.slice().sort((a, b) => a.date.start - b.date.start)
  );
};

const randomEvents = getSortingEvents(getRandomTripEvents(POINTS_COUNT));

const insertComponent = (container, position, template) => {
  container.insertAdjacentHTML(position, template);
};

const renderHeader = () => {
  insertComponent(tripMain, `afterbegin`, createTripInfoTemplate());
  insertComponent(tripMainControls.querySelector(`h2`), `afterend`, createTripMenuTemplate());
  insertComponent(tripMainControls, `beforeend`, createTripFilterTemplate());
};

const renderTripDaysList = () => {
  insertComponent(tripEventsSection.querySelector(`h2`), `afterend`, createTripSortingTemplate());
  insertComponent(tripEventsSection, `beforeend`, createTripDaysListTemplate());
};

const renderTripDayItem = (event, count, eventsList) => {
  const tripDaysList = tripEventsSection.querySelector(`.trip-days`);
  insertComponent(tripDaysList, `beforeend`, createTripDayItemTemplate(event, count, eventsList));
};

const renderEditableTripEventItem = (event) => {
  insertComponent(tripEventsSection.querySelector(`h2`), `afterend`, createEditableTripEventPointTemplate(event));
};

const renderTripEventItem = (container, event) => {
  insertComponent(container, `beforeend`, createTripEventItemTemplate(event));
};

const renderMain = (events) => {
  renderEditableTripEventItem(events[0], FORM_COUNT);
  renderTripDaysList();
  const tripDaysList = tripEventsSection.querySelector(`.trip-days`);
  const slicedEvents = events.slice(1);
  let daysPassed;
  let startDateTime;
  let previousDateTime;

  for (let event of slicedEvents) {
    const currentDateTime = getISOStringDate(event.date.start).slice(0, 10);

    if (previousDateTime === currentDateTime) {
      const currentDateTimeElement = tripDaysList.querySelector(`[datetime="${currentDateTime}"]`);
      renderTripEventItem(currentDateTimeElement.parentElement.nextElementSibling, event);
    } else {
      startDateTime = startDateTime ? startDateTime : currentDateTime;
      daysPassed = daysPassed ? getPassedDays(startDateTime, currentDateTime) : 1;
      renderTripDayItem(event, daysPassed, createTripEventsListTemplate(createTripEventItemTemplate(event)));
      previousDateTime = currentDateTime;
    }
  }
};

renderHeader();
renderMain(randomEvents);
