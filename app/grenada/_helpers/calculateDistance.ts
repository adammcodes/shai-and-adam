// Takes coordinates of two point and returns distance between them in km
// Round to 1 decimal place

export type Coordinates = {
  lat: number;
  lng: number;
};

// define a function to convert degrees to radians
const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

function calculateDistance(pos1: Coordinates, pos2: Coordinates) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(pos2.lat - pos1.lat); // deg2rad below
  const dLon = deg2rad(pos2.lng - pos1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(pos1.lat)) *
      Math.cos(deg2rad(pos2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c * 10) / 10;
}

export default calculateDistance;
