import {renderHeader} from './components/header/header.js';
import TripController from './controllers/trip.js';
import {getRandomEvents} from './mocks/events.js';

const POINTS_COUNT = 20;
const infoContainer = document.querySelector(`.trip-main`);
const filterContainer = infoContainer.querySelector(`.trip-main__trip-controls`);
const menuContainer = filterContainer.querySelector(`h2`);

const tripEventsSection = document.querySelector(`.trip-events`);

const randomEvents = getRandomEvents(POINTS_COUNT);

const tripController = new TripController(tripEventsSection);

renderHeader(infoContainer, menuContainer, filterContainer);
tripController.render(randomEvents);
