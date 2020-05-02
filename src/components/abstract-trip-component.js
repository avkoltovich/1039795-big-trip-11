import {InsertionPosition, createElement, render} from '../helpers/render.js';

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  render(container) {
    if (container instanceof AbstractComponent) {
      render(container.getElement(), this, InsertionPosition.BEFOREEND);
    } else {
      render(container, this, InsertionPosition.BEFOREEND);
    }
  }

  removeElement() {
    this._element = null;
  }
}
