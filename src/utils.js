import dayjs from 'dayjs';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const DATE_FORMAT = { // форматы даты в разных блоках
  POINT: 'MMM DD', // в точке маршрута
  EDIT_POINT: 'DD/MM/YY' // в форме редактирования точки
};
const TIME_FACTORS = {
  HOURS_PER_DAY: 24,
  MINUTES_PER_DAY: 1440,
  MINUTES_PER_HOUR: 60
};

const TIME_FORMAT = 'HH:mm';

const getDate = (dateFrom, dateFormat) => dateFrom ? dayjs(dateFrom).format(dateFormat) : '';

const getTime = (time) => time ? dayjs(time).format(TIME_FORMAT) : '';

const getTimeLength = (dateFrom, dateTo) => {
  let result = '';
  const days = dayjs(dateTo).diff(dayjs(dateFrom), 'd');
  const hours = dayjs(dateTo).diff(dayjs(dateFrom), 'h') % TIME_FACTORS.HOURS_PER_DAY;
  const minutes = dayjs(dateTo).diff(dayjs(dateFrom), 'm') % TIME_FACTORS.MINUTES_PER_DAY - hours * TIME_FACTORS.MINUTES_PER_HOUR;

  let displayDays = '';
  if(days > 0 && days < 10) {
    displayDays = `0${days}D`;
  } else if(days >= 10) {
    displayDays = `${days}D`;
  }

  let displayHours = '';
  if(hours > 0 && hours < 10) {
    displayHours = `0${hours}H`;
  } else if(hours >= 10) {
    displayHours = `${hours}H`;
  }

  let displayMinutes = '00M';
  if(minutes > 0 && minutes < 10) {
    displayMinutes = `0${minutes}M`;
  } else if(minutes >= 10) {
    displayMinutes = `${minutes}M`;
  }

  result = `${displayDays} ${displayHours} ${displayMinutes}`;
  return result;
};

const setFavoriteClass = (data) => data ? 'event__favorite-btn--active' : '';

export { getRandomArrayElement, getDate, getTime, getTimeLength, setFavoriteClass, DATE_FORMAT };
