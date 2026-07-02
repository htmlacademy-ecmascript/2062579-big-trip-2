import { getRandomPoint } from '../mock/mock-points.js';
import { mockDestinations } from '../mock/mock-destinations.js';
import { mockOffers } from '../mock/mock-offers.js';

const POINTS_NUMBER = 4; // количество отрисовываемых точек маршрута

export default class PointsModel {
  points = Array.from({ length: POINTS_NUMBER }, getRandomPoint);
  destinations = mockDestinations;
  offers = mockOffers;

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
