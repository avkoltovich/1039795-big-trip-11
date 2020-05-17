import moment from "moment";
import {eventTypesMap} from '../../../helpers/const.js';
import {createOfferItemTemplate} from './offer-template.js';
import {getFormatTime24H, getISOStringDate} from '../../../helpers/utils.js';
import AbstractComponent from '../../abstract-component.js';

const SHOWING_OFFERS_COUNT = 3;

const getDurationString = (duration) => {
  const days = moment.duration(duration).days();
  const hours = moment.duration(duration).hours();
  const minutes = moment.duration(duration).minutes();
  let formattedDuration = ``;

  if (days) {
    formattedDuration = `${days}D `;
  }

  if (days || hours) {
    formattedDuration += `${hours}H `;
  }

  return (formattedDuration += `${minutes}M`);
};

const createCollapsedEventTemplate = (event) => {
  const {type, city, offers} = event;
  const price = event[`base_price`];

  const duration = (event[`date_to`] - event[`date_from`]);
  const durationString = getDurationString(duration);
  const eventType = eventTypesMap[type];
  const dataTimeStart = getISOStringDate(event[`date_from`]).slice(0, 16);
  const dataTimeStart24H = getFormatTime24H(event[`date_from`]);
  const dataTimeEnd = getISOStringDate(event[`date_to`]).slice(0, 16);
  const dataTimeEnd24H = getFormatTime24H(event[`date_to`]);
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
          <p class="event__duration">${durationString}</p>
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

export default class CollapsedEvent extends AbstractComponent {
  constructor(event) {
    super();

    this._event = event;
  }

  getTemplate() {
    return createCollapsedEventTemplate(this._event);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
