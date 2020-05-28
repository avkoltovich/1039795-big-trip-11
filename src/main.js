import API from './api.js';
import EventsModel from './models/events.js';
import FilterPresenter from './presenters/filter.js';
import InfoComponent from './components/header/info.js';
import MenuPresenter from './presenters/menu.js';
import StatsComponent from './components/stats/stats.js';
import TripPresenter from './presenters/trip.js';
import {InsertionPosition, render} from './helpers/render.js';

const AUTHORIZATION = `Basic z2StXBzjFLjS18cOMlo8wl5HcxPg7rjb`;

const renderHeader = (infoContainer) => {
  render(infoContainer, new InfoComponent(), InsertionPosition.AFTERBEGIN);
};

const infoContainer = document.querySelector(`.trip-main`);
const filterContainer = infoContainer.querySelector(`.trip-main__trip-controls`);
const menuContainer = filterContainer.querySelector(`h2`);
const boardContainer = document.querySelector(`.page-main .page-body__container`);
const tripEventsSection = boardContainer.querySelector(`.trip-events`);
const newEventButton = infoContainer.querySelector(`.trip-main__event-add-btn`);

const enableNewEventButton = () => {
  newEventButton.disabled = ``;
};

const api = new API(AUTHORIZATION);
const eventsModel = new EventsModel();

renderHeader(infoContainer);
const menuPresenter = new MenuPresenter(menuContainer);

const tableButtonHandler = () => {
  statsComponent.remove();
  tripPresenter.rerender();
};

const statsButtonHandler = () => {
  enableNewEventButton();
  statsComponent.render();
  render(boardContainer, statsComponent, InsertionPosition.AFTERBEGIN);
  tripPresenter.remove();
};

menuPresenter.setTableButtonHandler(tableButtonHandler.bind());
menuPresenter.setStatsButtonHandler(statsButtonHandler.bind());
menuPresenter.render();

const filterPresenter = new FilterPresenter(filterContainer, eventsModel);
filterPresenter.render();

const tripPresenter = new TripPresenter(tripEventsSection, eventsModel);

const statsComponent = new StatsComponent(eventsModel);

const onNewEventButtonClick = () => {
  filterPresenter.reset();
  tripPresenter.newEvent();
  newEventButton.disabled = `disabled`;
};

newEventButton.addEventListener(`click`, onNewEventButtonClick);

api.getData()
  .then((data) => {
    eventsModel.setEvents(data.events);
    eventsModel.setDestinations(data.destinations);
    eventsModel.setOffers(data.offers);
    tripPresenter.setEnableNewEventButtonHandler(enableNewEventButton);
    tripPresenter.render();
  });
