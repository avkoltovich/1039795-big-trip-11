import {createElement} from "../utils.js";

const createEventsListTemplate = (eventItems = ``) => {
  return (
    `<ul class="trip-events__list">
      ${eventItems}
    </ul>`
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
