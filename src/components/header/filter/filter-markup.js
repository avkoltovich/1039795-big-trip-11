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

export {createFilterMarkup};
