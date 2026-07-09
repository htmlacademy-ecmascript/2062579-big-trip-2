import { getRandomPoint } from '../mock/mock-points.js';
import { mockDestinations } from '../mock/mock-destinations.js';
import { mockOffers } from '../mock/mock-offers.js';

const POINTS_NUMBER = 3; // количество отрисовываемых точек маршрута

export default class PointsModel {
  #points = Array.from({ length: POINTS_NUMBER }, getRandomPoint);
  #destinations = mockDestinations;
  #offers = mockOffers;

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }
}
