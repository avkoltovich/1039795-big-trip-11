import {eventTypesMap} from '../../helpers/const.js';
import {createOfferItemTemplate} from './offers.js';
import {castTimeFormat, getFormatTime24H, getISOStringDate} from '../../helpers/utils.js';
import AbstractComponent from '../abstract.js';

const SHOWING_OFFERS_COUNT = 3;

const createEventTemplate = (event) => {
  const {date, type, city, price, offers} = event;

  let duration = (date.end - date.start) / 60000;
  let days = ``;
  let hours = ``;

  if (duration >= 1440) {
    days = `${castTimeFormat(Math.floor(duration / 1440))}D `;
    duration = duration - parseInt(days, 10) * 1440;
    hours = `00H `;
  }

  if (duration >= 60) {
    hours = `${castTimeFormat(Math.floor(duration / 60))}H `;
    duration = duration - parseInt(hours, 10) * 60;
  }

  const eventType = eventTypesMap[type];
  const minutes = `${castTimeFormat(duration)}M`;
  const dataTimeStart = getISOStringDate(date.start).slice(0, 16);
  const dataTimeStart24H = getFormatTime24H(date.start);
  const dataTimeEnd = getISOStringDate(date.end).slice(0, 16);
  const dataTimeEnd24H = getFormatTime24H(date.end);
  const selectedOffers = offers.slice(0, SHOWING_OFFERS_COUNT).map((offer) => createOfferItemTemplate(offer)).join(`\n`);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${eventType}${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dataTimeStart}">${dataTimeStart24H}</time>
            &mdash;
            <time class="event__end-time" datetime="${dataTimeEnd}">${dataTimeEnd24H}</time>
          </p>
          <p class="event__duration">${days}${hours}${minutes}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${selectedOffers}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Event extends AbstractComponent {
  constructor(event) {
    super();

    this._event = event;
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
