import {createTripInfoTemplate, createTripMenuTemplate, createTripFilterTemplate} from './components/header.js';
import {createTripSortingTemplate} from './components/trip-sorting.js';
import {createTripDaysListTemplate, createTripDayItemTemplate} from './components/trip-days-list.js';
import {createTripEventsListTemplate, createEditableTripEventPointTemplate, createTripEventItemTemplate} from './components/trip-events-list.js';

const NUMBER_OF_POINTS = 3;
const tripMain = document.querySelector(`.trip-main`);
const tripMainControls = tripMain.querySelector(`.trip-main__trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

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

const renderTripDayItem = () => {
  const tripDaysList = tripEvents.querySelector(`.trip-days`);
  insertComponent(tripDaysList, `beforeend`, createTripDayItemTemplate());
};

const renderTripEventsList = () => {
  const tripDayItem = tripEvents.querySelector(`.trip-days__item`);
  insertComponent(tripDayItem, `beforeend`, createTripEventsListTemplate());
};

const renderEditableTripEventItem = () => {
  const tripEventsList = tripEvents.querySelector(`.trip-events__list`);
  insertComponent(tripEventsList, `beforeend`, createEditableTripEventPointTemplate());
};

const renderTripEventItems = () => {
  const tripEventsList = tripEvents.querySelector(`.trip-events__list`);
  for (let i = 0; i < NUMBER_OF_POINTS; i++) {
    insertComponent(tripEventsList, `beforeend`, createTripEventItemTemplate());
  }
};

renderHeader();
renderTripDaysList();
renderTripDayItem();
renderTripEventsList();
renderEditableTripEventItem();
renderTripEventItems();
