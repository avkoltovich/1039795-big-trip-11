import AbstractTripComponent from '../../abstract-trip-component.js';

const createEventsListTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};

export default class EventsList extends AbstractTripComponent {
  getTemplate() {
    return createEventsListTemplate();
  }
}
