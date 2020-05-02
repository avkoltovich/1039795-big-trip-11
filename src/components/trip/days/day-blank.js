import AbstractTripComponent from '../../abstract-trip-component.js';

const createDayItemBlankTemplate = () => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
      </div>
    </li>`
  );
};

export default class DayBlankItem extends AbstractTripComponent {
  getTemplate() {
    return createDayItemBlankTemplate();
  }
}
