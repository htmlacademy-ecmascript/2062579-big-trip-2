import AbstractView from '../framework/view/abstract-view.js';

const createTripInfoCost = (tripCosts) => `<p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${tripCosts}</span>
  </p>`;

export default class TripInfoCostView extends AbstractView {
  #tripCosts = null;

  constructor(tripCosts) {
    super();
    this.#tripCosts = tripCosts;
  }

  get template() {
    return createTripInfoCost(this.#tripCosts);
  }
}
