import AbstractComponent from '../abstract.js';

const createEventsListTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};

export default class EventsList extends AbstractComponent {
  constructor(eventItems) {
    super();

    this._eventItems = eventItems;
  }

  getTemplate() {
    return createEventsListTemplate(this._eventItems);
  }
}
