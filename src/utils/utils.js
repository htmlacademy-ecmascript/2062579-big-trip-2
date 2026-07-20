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
const SortingTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

/**
 * функция проверки нажатия клавиши Escape
 * @param {*} evt
 * @returns true/false
 */
const isEscapeDown = (evt) => evt.key === 'Escape';

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
 * базовая функция для сортировки
 */
const getWeightForNullDate = (paramA, paramB) => {
  if (paramA === null && paramB === null) {
    return 0;
  }
  if (paramA === null) {
    return 1;
  }
  if (paramB === null) {
    return -1;
  }
  return null;
};

/**
 * функция для сортировки по цене (от дороже к дешевле)
 * @param {Object} pointA - объект с данными первой точки маршрута
 * @param {Object} pointB - объект с данными второй точки маршрута
 * @returns число - разницу в цене между точками маршрута
 */
const sortPrice = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.basePrice, pointB.basePrice);

  return weight ?? pointB.basePrice - pointA.basePrice;
};

/**
 * функция для сортировки по дате (от ранней к поздней)
 * @param {Object} pointA - объект с данными первой точки маршрута
 * @param {Object} pointB - объект с данными второй точки маршрута
 * @returns число - разницу во времени между началом точек маршрута
 */
const sortDay = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

/**
 * функция для сортировки по длительности времени (от более длительной к менее)
 * @param {Object} pointA - объект с данными первой точки маршрута
 * @param {Object} pointB - объект с данными второй точки маршрута
 * @returns число - разницу в продолжительности точек маршрута
 */
const sortTime = (pointA, pointB) => {
  const weight = getWeightForNullDate(dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom)), dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)));

  return weight ?? dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) - dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
};

/**
 * функция установки класса для добавленных в избранное
 * @param {boolean} data - из данных точки, ключ isFavorite
 * @returns строку (класс в разметке) 'event__favorite-btn--active' или пустую строку
 */
const setFavoriteClass = (data) => data ? 'event__favorite-btn--active' : '';

/**
 * функция обновления данных точки
 * @param {*} items
 * @param {*} update
 * @returns обновленную точку или текущие данные
 */
const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export { isEscapeDown, getRandomArrayElement, getDate, getTime, getTimeLength, setFavoriteClass, updateItem, sortPrice, sortDay, sortTime, DateFormat, SortingTypes };
