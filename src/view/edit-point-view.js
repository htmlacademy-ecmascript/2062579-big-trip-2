import { createElement } from '../render.js';
import { getDate, getTime, DATE_FORMAT } from '../utils.js';
import { POINT_TYPES } from '../mock/mock-points.js';

const createEditpointTemplate = (point, destinations, offers) => {
  const {basePrice, dateFrom, dateTo, type } = point;
  const pointDestination = destinations.find((dest) => dest.id === point.destination); // находим в пунктах назначения совпадающий по id c указанным в точке маршрута
  const typeOffers = offers.find((offer) => offer.type === point.type).offers; // находим в офферах совпадающие по типу с указанным в точке маршрута
  const selectedOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id)); // находим в списке офферов данного типа, выбранные в точке маршрута

  const date = getDate(dateFrom, DATE_FORMAT.EDIT_POINT);
  const startTime = getTime(dateFrom);
  const endTime = getTime(dateTo);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${point.id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${point.id}" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              ${POINT_TYPES.map((pointType) => (
    `<div class="event__type-item">
                  <input id="event-type-${pointType}-${point.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointType === type ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-${point.id}">${pointType}</label>
                </div>`
  )).join('')}

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${point.id}">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${pointDestination.name}" list="destination-list-${point.id}">
          <datalist id="destination-list-${point.id}">
            ${destinations.map((dest) => (
    `<option value="${dest.name}">
              </option>`
  )).join('')}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${point.id}">From</label>
          <input class="event__input  event__input--time" id="event-start-time-${point.id}" type="text" name="event-start-time" value="${date} ${startTime}">
          —
          <label class="visually-hidden" for="event-end-time-${point.id}">To</label>
          <input class="event__input  event__input--time" id="event-end-time-${point.id}" type="text" name="event-end-time" value="${date} ${endTime}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${point.id}">
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input class="event__input  event__input--price" id="event-price-${point.id}" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">

      ${typeOffers.length ? // если в данной точке есть доступные офферы, выводим их список, если нет - пустую строку
    `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${typeOffers.map((typeOffer) => `
              <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${typeOffers.id}-${point.id}" type="checkbox" name="event-offer-${typeOffers.id}" ${selectedOffers.map((selectedOffer) => selectedOffer.id).includes(typeOffer.id) ? 'checked' : ''}>
              <label class="event__offer-label" for="event-offer-${typeOffers.id}-${point.id}">
                <span class="event__offer-title">${typeOffer.title}</span>
                +€&nbsp;
                <span class="event__offer-price">${typeOffer.price}</span>
              </label>
          </div>`).join('')}

    </section>` : ''}


        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${pointDestination.description}</p>
        </section>
      </section>
    </form>
  </li>`;
};

export default class EditPointView {
  constructor({ point }, destinations, offers) {
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
  }

  getTemplate() {
    return createEditpointTemplate(this.point, this.destinations, this.offers);
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
