import {createElement} from '../../helpers/utils.js';

const FILTER_NAMES = [`everything`, `future`, `past`];

const createFilterMarkup = (name, isChecked) => {
  const checked = `${isChecked ? `checked` : ``}`;

  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${name}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${name}"
        ${checked}
      />
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  );
};

const createFilterTemplate = () => {
  const filtersMarkup = FILTER_NAMES.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersMarkup}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filter {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate();
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
