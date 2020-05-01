import {InsertionPosition, createElement, render} from '../helpers/render.js';

export default class AbstractComponent {
  constructor(container) {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
    this._container = container;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  render() {
    if (`getElement` in this._container) {
      render(this._container.getElement(), this, InsertionPosition.BEFOREEND);
    } else {
      render(this._container, this, InsertionPosition.BEFOREEND);
    }
  }

  removeElement() {
    this._element = null;
  }
}
