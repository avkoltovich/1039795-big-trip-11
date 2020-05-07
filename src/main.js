import {InsertionPosition, render} from './helpers/render.js';
import InfoComponent from './components/header/info.js';
import MenuComponent from './components/header/menu.js';
import FilterComponent from './components/header/filter.js';
import TripController from './controllers/trip.js';
import {getRandomEvents} from './mocks/events.js';

const POINTS_COUNT = 20;

const renderHeader = (infoContainer, menuContainer, filterContainer) => {
  render(infoContainer, new InfoComponent(), InsertionPosition.AFTERBEGIN);
  render(menuContainer, new MenuComponent(), InsertionPosition.AFTEREND);
  render(filterContainer, new FilterComponent(), InsertionPosition.BEFOREEND);
};

const infoContainer = document.querySelector(`.trip-main`);
const filterContainer = infoContainer.querySelector(`.trip-main__trip-controls`);
const menuContainer = filterContainer.querySelector(`h2`);
const tripEventsSection = document.querySelector(`.trip-events`);
const randomEvents = getRandomEvents(POINTS_COUNT);
const tripController = new TripController(randomEvents);

renderHeader(infoContainer, menuContainer, filterContainer);
tripController.render(tripEventsSection);
