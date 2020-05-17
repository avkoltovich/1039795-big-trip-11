import {getISOStringDate} from '../../../helpers/utils.js';
import AbstractComponent from '../../abstract-component.js';

const MONTH_NAMES = [
  `JAN`,
  `FEB`,
  `MAR`,
  `APR`,
  `MAY`,
  `JUN`,
  `JUL`,
  `AUG`,
  `SEP`,
  `OCT`,
  `NOV`,
  `DEC`,
];

const createDayItemTemplate = (event, count) => {
  const dateTime = getISOStringDate(event[`date_from`]).slice(0, 10);
  const monthAndDate = `${MONTH_NAMES[event[`date_from`].getMonth()]} ${event[`date_from`].getDate()}`;

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${count}</span>
        <time class="day__date" datetime="${dateTime}">${monthAndDate}</time>
      </div>
    </li>`
  );
};

export default class DayItem extends AbstractComponent {
  constructor(event, count) {
    super();

    this._event = event;
    this._count = count;
  }

  getTemplate() {
    return createDayItemTemplate(this._event, this._count);
  }
}
