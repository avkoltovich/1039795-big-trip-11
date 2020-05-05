import {InsertionPosition, render} from '../../helpers/render.js';
import AbstractComponent from '../abstract-component.js';

export default class AbstractTripComponent extends AbstractComponent {
  render(container) {
    if (container instanceof AbstractComponent) {
      render(container.getElement(), this, InsertionPosition.BEFOREEND);
    } else {
      render(container, this, InsertionPosition.BEFOREEND);
    }
  }
}
