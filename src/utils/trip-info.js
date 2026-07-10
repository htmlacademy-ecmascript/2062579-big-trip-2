const calculateCosts = (points) => {
  let sumCosts = 0;
  for (const point of points) {
    sumCosts += point.basePrice;
  }
  return sumCosts;
};

const createTripInfoDestinationeNames = (pointsModelData) => {
  const points = pointsModelData.points;
  const destinations = pointsModelData.destinations;
  const destinationNames = [];
  for(const point of points) {
    const pointDestinationName = destinations.find((dest) => dest.id === point.destination);
    destinationNames.push(pointDestinationName.name);
  }
  if(destinationNames.length < 4) {
    return destinationNames.join(' — ');
  } else {
    const tripInfoDestsShort = ['', ' . . . ', ''];
    tripInfoDestsShort[0] = destinationNames[0];
    tripInfoDestsShort[2] = destinationNames[destinationNames.length - 1];
    return tripInfoDestsShort.join(' — ') ;
  }
};

export { createTripInfoDestinationeNames, calculateCosts };
