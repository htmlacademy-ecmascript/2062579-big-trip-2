import { createElement } from '../render.js';

const createTripInfoCost = () => (
  `<p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>`
);

export default class TripInfoCostView {
  getTemplate() {
    return createTripInfoCost;
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
