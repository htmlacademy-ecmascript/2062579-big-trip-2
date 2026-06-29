import { getRandomArrayElement } from '../utils.js';
import { mockDestinations } from './mock-destinations.js';
import { mockOffers } from './mock-offers.js';

const mockPrices = [5, 10, 20, 30, 40, 45, 50, 75, 90, 95, 100, 105, 115, 120, 150, 175, 200, 250, 300];

const mockPoints = [
  {
    'id': 'sadsdf-6516',
    'base_price': getRandomArrayElement(mockPrices),
    'date_from': '2026-05-09T11:22:33.444Z',
    'date_to': '2026-05-09T11:52:35.666Z',
    'destination': '', // связано с набором mockDestinations по ключу
    'is_favorite': false,
    'offers': [], // связано с набором mockOffers по ключу
    'type': 'taxi' // допустимый список: taxi┃bus┃train┃ship┃drive┃flight┃check-in┃sightseeing┃restaurant
  },
  {
    'id': 'jhklkl-5552',
    'base_price': getRandomArrayElement(mockPrices),
    'date_from': '2026-05-10T09:00:33.444Z',
    'date_to': '2026-05-10T10:15:35.666Z',
    'destination': '',
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': 'dlgfjo-6482',
    'base_price': getRandomArrayElement(mockPrices),
    'date_from': '2026-05-21T23:00:33.444Z',
    'date_to': '2026-05-22T08:00:35.666Z',
    'destination': '',
    'is_favorite': true,
    'offers': [],
    'type': 'train'
  },
  {
    'id': 'leryhn-7965',
    'base_price': getRandomArrayElement(mockPrices),
    'date_from': '2026-06-30T10:30:33.444Z',
    'date_to': '2026-06-30T11:05:35.555Z',
    'destination': '',
    'is_favorite': false,
    'offers': [],
    'type': 'bus'
  },
  {
    'id': 'weweff-4682',
    'base_price': getRandomArrayElement(mockPrices),
    'date_from': '2026-07-10T15:00:33.444Z',
    'date_to': '2026-07-10T18:00:35.555Z',
    'destination': '',
    'is_favorite': true,
    'offers': [],
    'type': 'restaurant'
  },
  {
    'id': 'sdlkvb-4655',
    'base_price': getRandomArrayElement(mockPrices),
    'date_from': '2026-07-21T22:00:33.444Z',
    'date_to': '2026-07-22T04:00:35.555Z',
    'destination': '',
    'is_favorite': false,
    'offers': [],
    'type': 'flight'
  },
  {
    'id': 'eszesz-0987',
    'base_price': getRandomArrayElement(mockPrices),
    'date_from': '2026-09-01T09:00:33.444Z',
    'date_to': '2026-09-01T10:00:35.666Z',
    'destination': '',
    'is_favorite': true,
    'offers': [],
    'type': 'check-in'
  },
  {
    'id': 'woinok-9475',
    'base_price': getRandomArrayElement(mockPrices),
    'date_from': '2026-09-30T10:30:33.444Z',
    'date_to': '2026-09-30T11:35:35.555Z',
    'destination': '',
    'is_favorite': false,
    'offers': [],
    'type': 'bus'
  },
  {
    'id': 'sdfrgs-4578',
    'base_price': getRandomArrayElement(mockPrices),
    'date_from': '2026-10-05T18:00:33.444Z',
    'date_to': '2026-10-05T21:00:35.555Z',
    'destination': '',
    'is_favorite': true,
    'offers': [],
    'type': 'restaurant'
  },
  {
    'id': 'hygfsd-5265',
    'base_price': getRandomArrayElement(mockPrices),
    'date_from': '2026-12-25T12:13:33.444Z',
    'date_to': '2026-12-25T15:41:35.555Z',
    'destination': '',
    'is_favorite': true,
    'offers': [],
    'type': 'flight'
  },
];

const getRandomPoint = () => getRandomArrayElement(mockPoints);

export { getRandomPoint };
