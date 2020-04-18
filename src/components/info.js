import {createElement} from "../utils.js";

const createInfoTemplate = (cost) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost ? cost : 0}</span>
      </p>
    </section>`
  );
};

export default class Info {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createInfoTemplate();
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
