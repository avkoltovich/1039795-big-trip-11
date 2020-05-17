import {transferTypes, activityTypes, eventTypesMap} from '../../../helpers/const.js';
import {createOfferCheckboxTemplate} from './offer-template.js';
import {getFormatTime24H, castTimeFormat} from '../../../helpers/utils.js';
import AbstractSmartComponent from '../../abstract-smart-component.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const getStringDate = (date) => `${castTimeFormat(date.getDate())}/${castTimeFormat(date.getMonth())}/${date.getFullYear() % 100}`;

const capitalizeFirstLetter = (word) => word[0].toUpperCase() + word.slice(1);

const createEventTypeItemTemplate = (type, isChecked, id) => {
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
  return typesList.map((typeItem) => createEventTypeItemTemplate(typeItem, typeItem === type, id)).join(`\n`);
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

const getCityIndex = (city, destinations) => {
  return destinations.findIndex((item) => item.name === city);
};

// const getOffersIndex = (type, offers) => {
//   return offers.findIndex((item) => item.type === type);
// };

const createEditableEventTemplate = (event, destinations, allOffers, options = {}) => {
  const CITIES = destinations.map((item) => item.name);
  const {id, offers} = event;
  const price = event[`base_price`];
  const {placeholder, type, destination, isFavorite} = options;
  const cityIndex = getCityIndex(destination, destinations);
  const transferTypesFieldsetItems = createTypesFieldsetTemplate(transferTypes, type, id);
  const activityTypesFieldsetItems = createTypesFieldsetTemplate(activityTypes, type, id);
  const destinationItems = CITIES.map((destinationItem) => createDestinationItemTemplate(destinationItem)).join(`\n`);
  const eventStartTime = `${getStringDate(event[`date_from`])} ${getFormatTime24H(event[`date_from`])}`;
  const eventEndTime = `${getStringDate(event[`date_to`])} ${getFormatTime24H(event[`date_to`])}`;
  const favorite = `${isFavorite ? `checked` : ``}`;
  const offersCheckboxes = offers.map((offer) => createOfferCheckboxTemplate(offer, id)).join(`\n`);
  const cityDescription = destinations[cityIndex].description;
  const photosTape = destinations[cityIndex].pictures.map((picture) => createTripPhotoTemplate(picture.src)).join(`\n`);

  return (
    `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
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
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination}" list="destination-list-${id}">
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
      </form>
    </li>`
  );
};

export default class EditableEvent extends AbstractSmartComponent {
  constructor(event, destinations, offers) {
    super();

    this._event = event;
    this._destinations = destinations;
    this._offers = offers;
    this._type = event.type;
    this._destination = event[`destination`];
    this._isFavorite = event.isFavorite;
    this._placeholder = eventTypesMap[this._type];
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
    return createEditableEventTemplate(this._event, this._destinations, this._offers, {
      type: this._type,
      destination: this._destination,
      placeholder: this._placeholder,
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
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);

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

  _applyFlatpickr() {
    const dateStartInput = this.getElement().querySelector(`[name="event-start-time"]`);
    this._flatpickrStart = flatpickr(dateStartInput, {
      enableTime: true,
      altFormat: `d/m/y H:i`,
      altInput: true,
      [`time_24hr`]: true,
      defaultDate: this._event[`date_from`],
    });

    const dateEndInput = this.getElement().querySelector(`[name="event-end-time"]`);
    this._flatpickrEnd = flatpickr(dateEndInput, {
      enableTime: true,
      altFormat: `d/m/y H:i`,
      altInput: true,
      [`time_24hr`]: true,
      defaultDate: this._event[`date_to`],
    });
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`)
      .addEventListener(`change`, (evt) => {
        this._type = evt.target.value;
        this._placeholder = eventTypesMap[this._type];

        this.rerender();
      });

    element.querySelector(`.event__input--destination`)
    .addEventListener(`change`, (evt) => {
      this._city = evt.target.value;

      this.rerender();
    });

    element.querySelector(`.event__favorite-checkbox`)
    .addEventListener(`change`, () => {
      this._isFavorite = !this._isFavorite;
    });
  }

  _parseFormData(formData) {
    const startDate = formData.get(`event-start-time`);
    const endDate = formData.get(`event-end-time`);
    const eventPrice = formData.get(`event-price`);

    return {
      date: {
        start: new Date(startDate),
        end: new Date(endDate)
      },
      type: this._type,
      city: this._city,
      price: eventPrice,
      isFavorite: this._isFavorite
    };
  }
}
