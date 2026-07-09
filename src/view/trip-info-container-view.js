import AbstractView from '../framework/view/abstract-view.js';

const createTripInfoSectionTemplate = () => `<section class="trip-main__trip-info  trip-info">
  </section>`;

export default class TripInfoSectionView extends AbstractView {
  get template() {
    return createTripInfoSectionTemplate();
  }
}
