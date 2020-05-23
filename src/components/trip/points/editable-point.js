import {transferTypes, activityTypes, eventTypesMap, offerTitlesMap} from '../../../helpers/const.js';
import {createOfferCheckboxTemplate} from './offer-template.js';
import {getFormatTime24H, castTimeFormat} from '../../../helpers/utils.js';
import AbstractSmartComponent from '../../abstract-smart-component.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const getStringDate = (date) => `${castTimeFormat(date.getDate())}/${castTimeFormat(date.getMonth())}/${date.getFullYear() % 100}`;

const capitalizeFirstLetter = (word) => word[0].toUpperCase() + word.slice(1);

const createPointTypeItemTemplate = (type, isChecked, id) => {
  const eventTypeString = capitalizeFirstLetter(type);
  const checked = `${type}" ${isChecked ? `checked` : ``}`;

  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${checked}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${eventTypeString}</label>
    </div>`
  );
};

const createTypesFieldsetTemplate = (typesList, type, id) => {
  return typesList.map((typeItem) => createPointTypeItemTemplate(typeItem, typeItem === type, id)).join(`\n`);
};

const createDestinationItemTemplate = (city) => {
  return (
    `<option value="${city}"></option>`
  );
};

const createTripPhotoTemplate = (src) => {
  return (
    `<img class="event__photo" src="${src}" alt="Event photo">`
  );
};

const createEditablePointTemplate = (event, destinations, options = {}) => {
  const CITIES = destinations.map((item) => item.name);
  const price = event[`basePrice`];
  const {placeholder, type, destination, offers, selectedOffers, id, isFavorite} = options;
  const transferTypesFieldsetItems = createTypesFieldsetTemplate(transferTypes, type, id);
  const activityTypesFieldsetItems = createTypesFieldsetTemplate(activityTypes, type, id);
  const destinationItems = CITIES.map((destinationItem) => createDestinationItemTemplate(destinationItem)).join(`\n`);
  const eventStartTime = `${getStringDate(event[`dateFrom`])} ${getFormatTime24H(event[`dateFrom`])}`;
  const eventEndTime = `${getStringDate(event[`dateTo`])} ${getFormatTime24H(event[`dateTo`])}`;
  const favorite = `${isFavorite ? `checked` : ``}`;
  const offersCheckboxes = offers.map((offer) => createOfferCheckboxTemplate(offer, id, selectedOffers)).join(`\n`);
  const city = destination.name;
  const cityDescription = destination.description;
  const photosTape = destination.pictures.map((picture) => createTripPhotoTemplate(picture.src)).join(`\n`);

  return (
    `<form class="event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                ${transferTypesFieldsetItems}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                ${activityTypesFieldsetItems}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
              ${placeholder}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${city}" list="destination-list-${id}">
            <datalist id="destination-list-${id}">
              ${destinationItems}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${eventStartTime}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${eventEndTime}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-${id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${favorite}>
          <label class="event__favorite-btn" for="event-favorite-${id}">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offersCheckboxes}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${cityDescription}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
              ${photosTape}
              </div>
            </div>
          </section>
        </section>
      </form>`
  );
};

export default class EditablePoint extends AbstractSmartComponent {
  constructor(event, destinations, offers) {
    super();

    this._event = event;
    this._id = event.id;
    this._destinations = destinations;
    this._type = event.type;
    this._allOffers = offers;
    this._allOffersByType = this._allOffers[this._getOffersIndexByType(this._type)].offers;
    this._selectedOffers = event.offers;
    this._destination = event.destination;
    this._placeholder = eventTypesMap[this._type];
    this._city = event.destination.name;
    this._isFavorite = event[`isFavorite`];
    this._submitHandler = null;
    this._collapseHandler = null;
    this._deleteButtonClickHandler = null;

    this._flatpickrStart = null;
    this._flatpickrEnd = null;
    this._applyFlatpickr();

    this._subscribeOnEvents();
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setCollapseHandler(this._collapseHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  getTemplate() {
    return createEditablePointTemplate(this._event, this._destinations, {
      id: this._id,
      type: this._type,
      destination: this._destination,
      placeholder: this._placeholder,
      offers: this._allOffersByType,
      selectedOffers: this._selectedOffers,
      isFavorite: this._isFavorite
    });
  }

  getData() {
    const form = this.getElement().querySelector(`.event--edit`);
    const formData = new FormData(form);

    return this._parseFormData(formData);
  }

  removeElement() {
    if (this._flatpickrStart) {
      this._flatpickrStart.destroy();
      this._flatpickrStart = null;
    }

    if (this._flatpickrEnd) {
      this._flatpickrEnd.destroy();
      this._flatpickrEnd = null;
    }

    super.removeElement();
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  setCollapseHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);

    this._collapseHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-checkbox`)
      .addEventListener(`click`, handler);
  }

  _applyFlatpickr() {
    const dateStartInput = this.getElement().querySelector(`[name="event-start-time"]`);
    this._flatpickrStart = flatpickr(dateStartInput, {
      enableTime: true,
      altFormat: `d/m/y H:i`,
      altInput: true,
      [`time_24hr`]: true,
      defaultDate: this._event[`dateFrom`],
    });

    const dateEndInput = this.getElement().querySelector(`[name="event-end-time"]`);
    this._flatpickrEnd = flatpickr(dateEndInput, {
      enableTime: true,
      altFormat: `d/m/y H:i`,
      altInput: true,
      [`time_24hr`]: true,
      defaultDate: this._event[`dateTo`],
    });
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`)
      .addEventListener(`change`, (evt) => {
        this._type = evt.target.value;
        this._placeholder = eventTypesMap[this._type];
        this._allOffersByType = this._allOffers[this._getOffersIndexByType(this._type)].offers;

        this.rerender();
      });

    element.querySelector(`.event__input--destination`)
    .addEventListener(`change`, (evt) => {
      this._city = evt.target.value;
      this._destination = this._destinations[this._getDestinationIndex(this._city)];

      this.rerender();
    });
  }

  _getDestinationIndex(city) {
    return this._destinations.findIndex((item) => item.name === city);
  }

  _getOffersIndexByType(type) {
    return this._allOffers.findIndex((item) => item.type === type);
  }

  _getOffersIndexByTitle(title) {
    return this._allOffersByType.findIndex((item) => item.title === title);
  }

  _getSelectedOffers() {
    let selectedOffers = [];
    const offers = this.getElement().querySelectorAll(`.event__offer-checkbox:checked`);
    offers.forEach((item) => {
      selectedOffers.push(this._allOffersByType[this._getOffersIndexByTitle(offerTitlesMap[item.name])]);
    });

    return selectedOffers;
  }

  _getFavoriteStatus() {
    return (this.getElement().querySelector(`.event__favorite-checkbox:checked`)) ? true : false;
  }

  _parseFormData(formData) {
    const startDate = formData.get(`event-start-time`);
    const endDate = formData.get(`event-end-time`);
    const eventPrice = formData.get(`event-price`);
    this._selectedOffers = this._getSelectedOffers();
    this._isFavorite = this._getFavoriteStatus();

    return {
      'basePrice': eventPrice,
      'dateFrom': new Date(startDate),
      'dateTo': new Date(endDate),
      'destination': this._destination,
      'id': this._id,
      'isFavorite': this._isFavorite,
      'offers': this._selectedOffers,
      'type': this._type
    };
  }
}
