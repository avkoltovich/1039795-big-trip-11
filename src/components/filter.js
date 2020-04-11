const FILTER_NAMES = [`everything`, `future`, `past`];

const createTripFilterMarkup = (name, isChecked) => {
  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${name}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${name}"
        ${isChecked ? `checked` : ``}
      />
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  );
};

const createTripFilterTemplate = () => {
  const filtersMarkup = FILTER_NAMES.map((it, i) => createTripFilterMarkup(it, i === 0)).join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersMarkup}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export {createTripFilterTemplate};
