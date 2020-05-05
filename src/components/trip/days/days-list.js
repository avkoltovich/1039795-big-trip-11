import AbstractTripComponent from '../abstract-trip-component.js';

const createDaysListTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class DaysList extends AbstractTripComponent {
  getTemplate() {
    return createDaysListTemplate();
  }
}
