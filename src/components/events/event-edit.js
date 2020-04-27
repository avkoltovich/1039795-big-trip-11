import {transferTypes, activityTypes, eventTypesMap} from '../../helpers/const.js';
import {createOfferCheckboxTemplate} from './offers.js';
import {getFormatTime24H, castTimeFormat} from '../../helpers/utils.js';
import AbstractComponent from '../abstract.js';

const CITIES = [`London`, `Berlin`, `Moscow`, `Krasnodar`, `Paris`, `Amsterdam`, `Oslo`];

const getStringDate = (date) => `${castTimeFormat(date.getDate())}/${castTimeFormat(date.getMonth())}/${date.getFullYear() % 100}`;

const capitalizeFirstLetter = (word) => word[0].toUpperCase() + word.slice(1);

const createEventTypeItemTemplate = (type, isChecked, formID) => {
  const eventTypeString = capitalizeFirstLetter(type);
  const checked = `${type}" ${isChecked ? `checked` : ``}`;

  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-${formID}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${checked}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${formID}">${eventTypeString}</label>
    </div>`
  );
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

const createEventEditTemplate = (event, formID) => {
  const {date, destination, type, city, price, isFavorite, offers, photos} = event;
  const transferTypesFieldsetItems = transferTypes.map((typeItem) => createEventTypeItemTemplate(typeItem, typeItem === type, formID)).join(`\n`);
  const activityTypesFieldsetItems = activityTypes.map((typeItem) => createEventTypeItemTemplate(typeItem, typeItem === type, formID)).join(`\n`);
  const eventType = eventTypesMap[type];
  const destinationItems = CITIES.map((destinationItem) => createDestinationItemTemplate(destinationItem)).join(`\n`);
  const eventStartTime = `${getStringDate(date.start)} ${getFormatTime24H(date.start)}`;
  const eventEndTime = `${getStringDate(date.end)} ${getFormatTime24H(date.end)}`;
  const favorite = `${isFavorite ? `checked` : ``}`;
  const offersCheckboxes = offers.map((offer) => createOfferCheckboxTemplate(offer, formID)).join(`\n`);
  const photosTape = photos.map((photo) => createTripPhotoTemplate(photo)).join(`\n`);

  return (
    `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${formID}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${formID}" type="checkbox">

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
            <label class="event__label  event__type-output" for="event-destination-${formID}">
              ${eventType}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${formID}" type="text" name="event-destination" value="${city}" list="destination-list-${formID}">
            <datalist id="destination-list-${formID}">
              ${destinationItems}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${formID}">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-${formID}" type="text" name="event-start-time" value="${eventStartTime}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${formID}">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-${formID}" type="text" name="event-end-time" value="${eventEndTime}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${formID}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${formID}" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-${formID}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${favorite}>
          <label class="event__favorite-btn" for="event-favorite-${formID}">
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
            <p class="event__destination-description">${destination}</p>

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

export default class EventEdit extends AbstractComponent {
  constructor(event, formID) {
    super();

    this._event = event;
    this._formID = formID;
  }

  getTemplate() {
    return createEventEditTemplate(this._event, this._formID);
  }
}
