import { createElement } from '../render.js';
import { getDate, getTime, getTimeLength, setFavoriteClass, DATE_FORMAT } from '../utils.js';

const createPointTemplate = (point, destinations, offers) => {
  const {basePrice, dateFrom, dateTo, isFavorite, type } = point;
  const pointDestination = destinations.find((dest) => dest.id === point.destination); // находим в пунктах назначения совпадающий по id c указанным в точке маршрута
  const typeOffers = offers.find((offer) => offer.type === point.type).offers; // находим в офферах совпадающие по типу с указанным в точке маршрута
  const selectedOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id)); // находим в списке офферов данного типа, выбранные в точке маршрута

  const date = getDate(dateFrom, DATE_FORMAT.POINT);
  const startTime = getTime(dateFrom);
  const endTime = getTime(dateTo);
  const timeLength = getTimeLength(dateFrom, dateTo);
  const favoriteClass = setFavoriteClass(isFavorite);

  return (
    `<li class="trip-events__item">
        <div class="event">
          <time class="event__date" datetime="2019-03-18">${date}</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} ${pointDestination.name}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="2019-03-18T10:30">${startTime}</time>
              —
              <time class="event__end-time" datetime="2019-03-18T11:00">${endTime}</time>
            </p>
            <p class="event__duration">${timeLength}</p>
          </div>
          <p class="event__price">
            €&nbsp;<span class="event__price-value">${basePrice}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${selectedOffers.map((offer) => ( // вставляем выбранные офферы
      `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        +€&nbsp;
        <span class="event__offer-price">${offer.price}</span>
        </li>`
    )).join('')}

          </ul>
          <button class="event__favorite-btn ${favoriteClass}" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
            </svg>
          </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
  );
};

export default class PointView {
  constructor({ point }, destinations, offers) {
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
  }

  getTemplate() {
    return createPointTemplate(this.point, this.destinations, this.offers);
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
