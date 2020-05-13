import moment from "moment";

const castTimeFormat = (value) => {
  return String(value).padStart(2, `0`);
};

const getFormatTime24H = (date) => moment(date).format(`hh:mm`);

const getISOStringDate = (date) => {
  const isoDate = new Date(date);
  isoDate.setHours(isoDate.getHours() - isoDate.getTimezoneOffset() / 60);
  return isoDate.toISOString();
};

export {castTimeFormat, getFormatTime24H, getISOStringDate};
