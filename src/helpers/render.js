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

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

const remove = (element) => {
  element.remove();
};

export {createElement, InsertionPosition, render, replace, remove};
