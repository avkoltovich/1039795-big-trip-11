import {offerTitlesMap} from '../../../helpers/const.js';

const offerPricesMap = {
  'event-offer-luggage': 30,
  'event-offer-comfort': 100,
  'event-offer-meal': 15,
  'event-offer-seats': 5,
  'event-offer-train': 40
};

const createOfferCheckboxTemplate = (offer, formCount) => {
  const checked = `${offer.isChecked ? `checked` : ``}`;
  const offerTitle = offerTitlesMap[offer.name];
  const offerPrice = offerPricesMap[offer.name];

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${offer.name}-${formCount}" type="checkbox" name="${offer}" ${checked}>
      <label class="event__offer-label" for="${offer.name}-${formCount}">
        <span class="event__offer-title">${offerTitle}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
      </label>
    </div>`
  );
};

const createOfferItemTemplate = (offer) => {
  const offerTitle = offerTitlesMap[offer.name];
  const offerPrice = offerPricesMap[offer.name];

  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offerTitle}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
    </li>`
  );
};

export {createOfferCheckboxTemplate, createOfferItemTemplate};
