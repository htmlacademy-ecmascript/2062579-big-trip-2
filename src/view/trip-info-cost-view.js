import AbstractView from '../framework/view/abstract-view.js';

const createTripInfoCost = () => `<p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">1230</span>
  </p>`;

export default class TripInfoCostView extends AbstractView {
  get template() {
    return createTripInfoCost();
  }
}
