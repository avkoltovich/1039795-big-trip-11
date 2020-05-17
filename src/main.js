import EventsModel from './models/events.js';
import InfoComponent from './components/header/info.js';
import MenuComponent from './components/header/menu.js';
import FilterController from './controllers/filter.js';
import TripController from './controllers/trip.js';
import {InsertionPosition, render} from './helpers/render.js';
import {getRandomEvents} from './mocks/events.js';

const POINTS_COUNT = 20;

const renderHeader = (infoContainer, menuContainer) => {
  render(infoContainer, new InfoComponent(), InsertionPosition.AFTERBEGIN);
  render(menuContainer, new MenuComponent(), InsertionPosition.AFTEREND);
};

const infoContainer = document.querySelector(`.trip-main`);
const filterContainer = infoContainer.querySelector(`.trip-main__trip-controls`);
const menuContainer = filterContainer.querySelector(`h2`);
const tripEventsSection = document.querySelector(`.trip-events`);
const randomEvents = getRandomEvents(POINTS_COUNT);
const eventsModel = new EventsModel();
eventsModel.setEvents(randomEvents);
const tripController = new TripController(tripEventsSection, eventsModel);

renderHeader(infoContainer, menuContainer);
const filterController = new FilterController(filterContainer, eventsModel);
filterController.render();
tripController.render();
