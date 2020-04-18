import {createElement} from "../utils.js";

const createDaysListTemplate = (dayItems = ``) => {
  return (
    `<ul class="trip-days">
      ${dayItems}
    </ul>`
  );
};

export default class DaysList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createDaysListTemplate();
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
