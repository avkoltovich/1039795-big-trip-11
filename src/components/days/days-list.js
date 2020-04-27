import AbstractComponent from '../abstract.js';

const createDaysListTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class DaysList extends AbstractComponent {
  getTemplate() {
    return createDaysListTemplate();
  }
}
