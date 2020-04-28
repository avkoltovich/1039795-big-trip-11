import {InsertionPosition, render} from './helpers/render.js';
import InfoComponent from './components/header/info.js';
import MenuComponent from './components/header/menu.js';
import FilterComponent from './components/header/filter.js';
import TripController from './controllers/trip.js';
import {getRandomEvents} from './mocks/events.js';

const POINTS_COUNT = 20;
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
  render(tripMain, new InfoComponent(), InsertionPosition.AFTERBEGIN);
  render(tripMainControls.querySelector(`h2`), new MenuComponent(), InsertionPosition.AFTEREND);
  render(tripMainControls, new FilterComponent(), InsertionPosition.BEFOREEND);
};

const tripController = new TripController(tripEventsSection);

renderHeader();
tripController.render(randomEvents);
