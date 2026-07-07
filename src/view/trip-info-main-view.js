import AbstractView from '../framework/view/abstract-view.js';

const createTripInfoMain = () => `<div class="trip-info__main">
    <h1 class="trip-info__title">Amsterdam — Chamonix — Geneva</h1>

    <p class="trip-info__dates">18&nbsp;—&nbsp;20 Mar</p>
  </div>`;

export default class TripInfoMainView extends AbstractView {
  get template() {
    return createTripInfoMain();
  }
}
