const capitalizeFirstLetter = (word) => word[0].toUpperCase() + word.slice(1);

const createEventTypeItemTemplate = (type, isChecked, formID) => {
  const eventTypeString = capitalizeFirstLetter(type);
  const checked = `${type}" ${isChecked ? `checked` : ``}`;

  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-${formID}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${checked}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${formID}">${eventTypeString}</label>
    </div>`
  );
};

export {createEventTypeItemTemplate};
