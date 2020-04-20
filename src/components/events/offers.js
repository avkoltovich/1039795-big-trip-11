import {offerTitlesMap} from '../../helpers/const.js';

const offerPricesMap = {
  'event-offer-luggage': 30,
  'event-offer-comfort': 100,
  'event-offer-meal': 15,
  'event-offer-seats': 5,
  'event-offer-train': 40
};

const createOfferCheckboxTemplate = (offer, formCount) => {
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${offer.name}-${formCount}" type="checkbox" name="${offer}" ${offer.isChecked ? `checked` : ``}>
      <label class="event__offer-label" for="${offer.name}-${formCount}">
        <span class="event__offer-title">${offerTitlesMap[offer.name]}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offerPricesMap[offer.name]}</span>
      </label>
    </div>`
  );
};

const createOfferItemTemplate = (offer) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offerTitlesMap[offer.name]}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offerPricesMap[offer.name]}</span>
    </li>`
  );
};

export {createOfferCheckboxTemplate, createOfferItemTemplate};
