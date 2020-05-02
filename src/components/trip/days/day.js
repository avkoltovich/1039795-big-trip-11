import {getISOStringDate} from '../../../helpers/utils.js';
import AbstractTripComponent from '../../abstract-trip-component.js';

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
  const {date} = event;
  const dateTime = getISOStringDate(date.start).slice(0, 10);
  const monthAndDate = `${MONTH_NAMES[date.start.getMonth()]} ${date.start.getDate()}`;

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${count}</span>
        <time class="day__date" datetime="${dateTime}">${monthAndDate}</time>
      </div>
    </li>`
  );
};

export default class DayItem extends AbstractTripComponent {
  constructor(event, count) {
    super();

    this._event = event;
    this._count = count;
  }

  getTemplate() {
    return createDayItemTemplate(this._event, this._count);
  }
}
