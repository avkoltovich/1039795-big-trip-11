const castTimeFormat = (value) => {
  return String(value).padStart(2, `0`);
};

const getFormatTime24H = (date) => `${castTimeFormat(date.getHours())}:${castTimeFormat(date.getMinutes())}`;

const getISOStringDate = (date) => {
  const isoDate = new Date(date);
  isoDate.setHours(isoDate.getHours() - isoDate.getTimezoneOffset() / 60);
  return isoDate.toISOString();
};

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

export {castTimeFormat, getFormatTime24H, getISOStringDate, createElement, InsertionPosition, render};
