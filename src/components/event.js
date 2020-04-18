import {eventTypesMap} from '../const.js';
import {createOfferItemTemplate} from './offers.js';
import {castTimeFormat, getFormatTime24H, getISOStringDate, createElement} from '../utils.js';

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

  const minutes = `${castTimeFormat(duration)}M`;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${eventTypesMap[type]}${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${getISOStringDate(date.start).slice(0, 16)}">${getFormatTime24H(date.start)}</time>
            &mdash;
            <time class="event__end-time" datetime="${getISOStringDate(date.end).slice(0, 16)}">${getFormatTime24H(date.end)}</time>
          </p>
          <p class="event__duration">${days}${hours}${minutes}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offers.map((offer) => createOfferItemTemplate(offer)).join(`\n`)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Event {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
