import AbstractTripComponent from '../../abstract-trip.js';

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
