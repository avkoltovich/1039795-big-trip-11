import {replace} from '../../helpers/render.js';
import {getISOStringDate} from '../../helpers/utils.js';
import DayItemComponent from './days/day.js';
import DaysListComponent from './days/days-list.js';
import EventEditComponent from './events/event-edit.js';
import EventsListComponent from './events/events-list.js';
import EventComponent from './events/event.js';

const getPassedDays = (start, end) => (new Date(new Date(end) - new Date(start))).getDate();

const renderEventItemElement = (eventsListElement, event) => {
  const eventComponent = new EventComponent(event);
  const eventEditComponent = new EventEditComponent(event);

  const replaceEventToEdit = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceEditToEvent = () => {
    replace(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onRollUpEventButtonClick = () => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const onEditFormSubmit = () => {
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  eventComponent.setEditButtonClickHandler(onRollUpEventButtonClick);

  eventEditComponent.setSubmitHandler(onEditFormSubmit);

  eventComponent.render(eventsListElement);
};

const getTripWithDays = (sortedEvents) => {
  const daysListComponent = new DaysListComponent();
  let daysPassed;
  let startDateTime;
  let previousDateTime;
  let currentEventsListElement;

  for (let event of sortedEvents) {
    const currentDateTime = getISOStringDate(event.date.start).slice(0, 10);

    if (previousDateTime === currentDateTime) {
      renderEventItemElement(currentEventsListElement, event);
    } else {
      startDateTime = startDateTime ? startDateTime : currentDateTime;
      daysPassed = daysPassed ? getPassedDays(startDateTime, currentDateTime) : 1;

      const currentDayItemElement = new DayItemComponent(event, daysPassed);
      currentDayItemElement.render(daysListComponent);

      currentEventsListElement = new EventsListComponent();
      currentEventsListElement.render(currentDayItemElement);
      renderEventItemElement(currentEventsListElement, event);

      previousDateTime = currentDateTime;
    }
  }

  return daysListComponent;
};

export {getTripWithDays};
