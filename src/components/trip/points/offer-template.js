const offerTitlesMap = {
  'Add luggage': `event-offer-luggage`,
  'Switch to comfort class': `event-offer-comfort`,
  'Add meal': `event-offer-meal`,
  'Choose seats': `event-offer-seats`,
  'Travel by train': `event-offer-train`
};

const createOfferCheckboxTemplate = (offer, formCount, selectedOffers) => {
  const index = selectedOffers.findIndex((item) => item.title === offer.title);
  const checked = `${index !== -1 ? `checked` : ``}`;
  const offerTitle = offer.title;
  const offerPrice = offer.price;
  const name = `${offerTitlesMap[offer.title]}`;
  const id = `${name}-${formCount}`;

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name="${name}" ${checked}>
      <label class="event__offer-label" for="${id}">
        <span class="event__offer-title">${offerTitle}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
      </label>
    </div>`
  );
};

const createOfferItemTemplate = (offer) => {
  const offerTitle = offer.title;
  const offerPrice = offer.price;

  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offerTitle}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
    </li>`
  );
};

export {createOfferCheckboxTemplate, createOfferItemTemplate};
