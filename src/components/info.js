const createTripInfoTemplate = (cost) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost ? cost : 0}</span>
      </p>
    </section>`
  );
};

export {createTripInfoTemplate};
