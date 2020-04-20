import {createElement} from "../../helpers/utils.js";

const createEventsListTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};

export default class EventsList {
  constructor(eventItems) {
    this._eventItems = eventItems;
    this._element = null;
  }

  getTemplate() {
    return createEventsListTemplate(this._eventItems);
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
