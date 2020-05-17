import EventsModel from './models/events.js';
import InfoComponent from './components/header/info.js';
import MenuComponent from './components/header/menu.js';
import FilterPresenter from './presenters/filter.js';
import TripPresenter from './presenters/trip.js';
import {InsertionPosition, render} from './helpers/render.js';
import {getDestinations, getOffersByType, getRandomEvents} from './mocks/events.js';

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
const randomDestinations = getDestinations();
const randomOffers = getOffersByType();
const eventsModel = new EventsModel();
eventsModel.setEvents(randomEvents);
eventsModel.setDestinations(randomDestinations);
eventsModel.setOffers(randomOffers);
const tripPresenter = new TripPresenter(tripEventsSection, eventsModel);

renderHeader(infoContainer, menuContainer);
const filterPresenter = new FilterPresenter(filterContainer, eventsModel);
filterPresenter.render();
tripPresenter.render();
