import AbstractView from '../framework/view/abstract-view.js';

const createTripInfoMain = (tripInfoDestinationeNames) => `<div class="trip-info__main">
    <h1 class="trip-info__title">${tripInfoDestinationeNames}</h1>

    <p class="trip-info__dates">18&nbsp;—&nbsp;20 Mar</p>
  </div>`;

export default class TripInfoMainView extends AbstractView {
  #tripInfoDestinationeNames = null;

  constructor(tripInfoDestinationeNames) {
    super();
    this.#tripInfoDestinationeNames = tripInfoDestinationeNames;
  }

  get template() {
    return createTripInfoMain(this.#tripInfoDestinationeNames);
  }
}
