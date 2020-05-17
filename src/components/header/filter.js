import AbstractComponent from '../abstract-component.js';
import {filterTypeMap} from '../../helpers/const.js';

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

export default class Filter extends AbstractComponent {
  constructor() {
    super();

    this._currentFilterType = filterTypeMap.DEFAULT;
  }

  getTemplate() {
    return createFilterTemplate();
  }

  getFilterType() {
    return this._currentSortType;
  }

  setFilterTypeChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      const filterType = evt.target.value;

      if (this._currentFilterType === filterType) {
        return;
      }

      this._currentFilterType = filterType;

      handler(this._currentFilterType);
    });
  }
}
