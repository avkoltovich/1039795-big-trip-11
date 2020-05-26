import {TRANSFER_TYPE, ACTIVITY_TYPES, offerTitlesMap} from '../helpers/const.js';

const CITIES = [`London`, `Berlin`, `Moscow`, `Krasnodar`, `Paris`, `Amsterdam`, `Oslo`];
const STRINGS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const eventTypes = TRANSFER_TYPE.concat(ACTIVITY_TYPES);

const offers = Object.values(offerTitlesMap);

const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

const getRandomArrayItem = (array) => {
  return array[getRandomIntegerNumber(0, array.length - 1)];
};

const getRandomStartDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);
  targetDate.setHours(targetDate.getHours() + getRandomIntegerNumber(0, 23));
  targetDate.setMinutes(targetDate.getMinutes() + getRandomIntegerNumber(0, 59));

  return targetDate;
};

const getRandomEndDate = (startDate) => {
  const randomEndDate = new Date(startDate);
  randomEndDate.setHours(randomEndDate.getHours() + getRandomIntegerNumber(1, 48));
  randomEndDate.setMinutes(randomEndDate.getMinutes() + getRandomIntegerNumber(0, 59));
  return randomEndDate;
};

const getRandomDestination = (strings) => {
  const destinations = [];
  const length = getRandomIntegerNumber(1, 5);
  for (let i = 0; i < length; i++) {
    destinations.push(getRandomArrayItem(strings));
  }
  return destinations.join(` `);
};

const getRandomPhoto = () => {
  return (
    `img/photos/${getRandomIntegerNumber(1, 5)}.jpg`
  );
};

const getRandomPictures = () => {
  const pictures = [];
  const length = getRandomIntegerNumber(1, 5);
  for (let i = 0; i < length; i++) {
    pictures.push({
      'src': getRandomPhoto(),
      'description': getRandomDestination(STRINGS)
    });
  }
  return pictures;
};

const getDestinations = () => {
  const destinations = [];
  CITIES.forEach((item) => {
    destinations.push({
      'description': getRandomDestination(STRINGS),
      'name': item,
      'pictures': getRandomPictures()
    });
  });

  return destinations;
};

const getOffer = (index) => {
  return {
    'title': offers[index],
    'price': getRandomIntegerNumber(5, 160)
  };
};

const getOffers = () => {
  const randomOffers = [];

  const count = getRandomIntegerNumber(1, 5);

  for (let index = 0; index < count; index++) {
    randomOffers.push(getOffer(index));
  }

  return randomOffers;
};

const getOffersByType = () => {
  const offersByType = [];

  for (const iterator of eventTypes) {
    offersByType.push({
      'type': iterator,
      'offers': getOffers()
    });
  }

  return offersByType;
};

const getRandomEvent = (idNumber) => {
  const randomDate = getRandomStartDate();
  const randomEndDate = getRandomEndDate(randomDate);
  return {
    'basePrice': getRandomIntegerNumber(5, 160),
    'dateFrom': randomDate,
    'dateTo': randomEndDate,
    'destination': getRandomArrayItem(getDestinations()),
    'id': idNumber,
    'isFavorite': Math.random() > 0.5,
    'offers': getOffers(),
    'type': getRandomArrayItem(eventTypes)
  };
};

const getRandomEvents = (count) => {
  const randomEvents = [];

  for (let index = 0; index < count; index++) {
    randomEvents.push(getRandomEvent(index));
  }

  return randomEvents;
};

export {getDestinations, getOffersByType, getRandomEvents};
