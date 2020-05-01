import {InsertionPosition, render} from '../../helpers/render.js';
import InfoComponent from './info.js';
import MenuComponent from './menu.js';
import FilterComponent from './filter.js';

const renderHeader = (infoContainer, menuContainer, filterContainer) => {
  render(infoContainer, new InfoComponent(), InsertionPosition.AFTERBEGIN);
  render(menuContainer, new MenuComponent(), InsertionPosition.AFTEREND);
  render(filterContainer, new FilterComponent(), InsertionPosition.BEFOREEND);
};

export {renderHeader};
