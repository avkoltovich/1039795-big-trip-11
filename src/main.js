import {getISOStringDate} from './utils.js';
import {createTripInfoTemplate} from './components/info.js';
import {createTripMenuTemplate} from './components/menu.js';
import {createTripFilterTemplate} from './components/filter.js';
import {createTripSortingTemplate, getSortingEvents} from './components/sorting.js';
import {createTripDaysListTemplate, createTripDayItemTemplate} from './components/days.js';
import {createTripEventsListTemplate, createEditableTripEventPointTemplate, createTripEventItemTemplate} from './components/events.js';
import {getRandomTripEvents} from './mocks/events.js';

const POINTS_COUNT = 20;
const tripMain = document.querySelector(`.trip-main`);
const tripMainControls = tripMain.querySelector(`.trip-main__trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);
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
  insertComponent(tripEvents.querySelector(`h2`), `afterend`, createTripSortingTemplate());
  insertComponent(tripEvents, `beforeend`, createTripDaysListTemplate());
};

const renderTripDayItem = (event, count) => {
  const tripDaysList = tripEvents.querySelector(`.trip-days`);
  insertComponent(tripDaysList, `beforeend`, createTripDayItemTemplate(event, count));
};

const renderTripEventsList = (container) => {
  insertComponent(container, `afterend`, createTripEventsListTemplate());
};

const renderEditableTripEventItem = (container, event) => {
  insertComponent(container, `beforeend`, createEditableTripEventPointTemplate(event));
};

const renderTripEventItem = (container, event) => {
  insertComponent(container, `beforeend`, createTripEventItemTemplate(event));
};

const renderMain = (events) => {
  renderTripDaysList();
  let daysCount = 1;
  let editableEventsCount = 1;

  for (let event of events) {
    const currentDateTime = getISOStringDate(event.date.start).slice(0, 10);
    let currentDateTimeElement = tripEvents.querySelector(`[datetime="${currentDateTime}"]`);

    if (currentDateTimeElement) {
      renderTripEventItem(currentDateTimeElement.parentElement.nextElementSibling, event);
    } else {
      renderTripDayItem(event, daysCount);
      daysCount++;
      currentDateTimeElement = tripEvents.querySelector(`[datetime="${currentDateTime}"]`);
      renderTripEventsList(currentDateTimeElement.parentElement);

      if (editableEventsCount === 1) {
        renderEditableTripEventItem(currentDateTimeElement.parentElement.nextElementSibling, event);
        editableEventsCount++;
      } else {
        renderTripEventItem(currentDateTimeElement.parentElement.nextElementSibling, event);
      }
    }
  }
};

renderHeader();
renderMain(randomEvents);
