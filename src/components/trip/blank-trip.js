import AbstractTripComponent from './abstract-trip-component.js';

const createNoEventsTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class BlankTrip extends AbstractTripComponent {
  getTemplate() {
    return createNoEventsTemplate();
  }
}

