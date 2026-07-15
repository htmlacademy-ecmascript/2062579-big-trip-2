import dayjs from 'dayjs';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const TIME_FORMAT = 'HH:mm';
const DateFormat = { // форматы даты в разных блоках
  POINT: 'MMM DD', // в точке маршрута
  EDIT_POINT: 'DD/MM/YY' // в форме редактирования точки
};
const TimeFactors = {
  HOURS_PER_DAY: 24,
  MINUTES_PER_DAY: 1440,
  MINUTES_PER_HOUR: 60
};

const getDate = (dateFrom, dateFormat) => dateFrom ? dayjs(dateFrom).format(dateFormat) : '';

const getTime = (time) => time ? dayjs(time).format(TIME_FORMAT) : '';

const getTimeLength = (dateFrom, dateTo) => {
  let result = '';
  const days = dayjs(dateTo).diff(dayjs(dateFrom), 'd');
  const hours = dayjs(dateTo).diff(dayjs(dateFrom), 'h') % TimeFactors.HOURS_PER_DAY;
  const minutes = dayjs(dateTo).diff(dayjs(dateFrom), 'm') % TimeFactors.MINUTES_PER_DAY - hours * TimeFactors.MINUTES_PER_HOUR;

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

/**
 * функция установки класса для добавленных в избранное
 * @param {boolean} data - из данных точки, ключ isFavorite
 * @returns класс (строку) 'event__favorite-btn--active' или пустую строку
 */
const setFavoriteClass = (data) => data ? 'event__favorite-btn--active' : '';

/**
 * функция обновления данных точки
 * @param {*} items
 * @param {*} update
 * @returns обновленную точку или текущие данные
 */
const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export { getRandomArrayElement, getDate, getTime, getTimeLength, setFavoriteClass, updateItem, DateFormat };
