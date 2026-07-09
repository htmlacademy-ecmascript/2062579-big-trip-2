import dayjs from 'dayjs';

const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const filter = {
  [FilterTypes.EVERYTHING]: (points) => points.length > 0,
  [FilterTypes.FUTURE]: (points) => points.some((point) => isPointFuture(point.dateFrom)),
  [FilterTypes.PRESENT]: (points) => points.some((point) => isPointPresent(point.dateFrom, point.dateTo)),
  [FilterTypes.PAST]: (points) => points.some((point) => isPointPast(point.dateTo))
};

function isPointPast(dateTo) {
  return dateTo && dayjs().isAfter(dateTo, 'H');
}

function isPointFuture(dateFrom) {
  return dateFrom && dayjs().isBefore(dateFrom, 'H');
}

function isPointPresent(dateFrom, dateTo) {
  return (dateTo && dayjs().isBefore(dateTo, 'H')) && (dateFrom && dayjs().isAfter(dateFrom, 'H'));
}

const generateFilter = (points) => Object.entries(filter).map(
  ([filterType, filterValue]) => ({
    type: filterType,
    value: filterValue(points)
  })
);

export { generateFilter };
