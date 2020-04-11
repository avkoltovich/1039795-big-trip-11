import {getISOStringDate} from '../utils.js';

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

const createTripDaysListTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

const createTripDayItemTemplate = (event, count) => {
  const {date} = event;

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${count}</span>
        <time class="day__date" datetime="${getISOStringDate(date.start).slice(0, 10)}">${MONTH_NAMES[date.start.getMonth()]} ${date.start.getDate()}</time>
      </div>
    </li>`
  );
};

export {createTripDaysListTemplate, createTripDayItemTemplate};
