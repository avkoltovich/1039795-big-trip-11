const castTimeFormat = (value) => {
  return String(value).padStart(2, `0`);
};

const getFormatTime24H = (date) => `${castTimeFormat(date.getHours())}:${castTimeFormat(date.getMinutes())}`;

const getStringDate = (date) => `${castTimeFormat(date.getDate())}/${castTimeFormat(date.getMonth())}/${date.getFullYear() % 100}`;

const getISOStringDate = (date) => {
  const isoDate = new Date(date);
  isoDate.setHours(isoDate.getHours() - isoDate.getTimezoneOffset() / 60);
  return isoDate.toISOString();
};

const getPassedDays = (start, end) => (new Date(new Date(end) - new Date(start))).getDate();

const capitalizeFirstLetter = (word) => word[0].toUpperCase() + word.slice(1);

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const InsertionPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

const render = (container, element, position) => {
  switch (position) {
    case InsertionPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case InsertionPosition.AFTEREND:
      container.after(element);
      break;
    case InsertionPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export {castTimeFormat, getFormatTime24H, getStringDate, getISOStringDate, capitalizeFirstLetter, getPassedDays, createElement, InsertionPosition, render};
