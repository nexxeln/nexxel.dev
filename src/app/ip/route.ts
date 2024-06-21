import { geolocation } from "@vercel/edge";

export function GET(request: Request) {
  const { city, latitude, longitude } = geolocation(request);

  if (!latitude || !longitude) {
    return new Response("No latitude or longitude found", {
      status: 400,
    });
  }

  const myLatitude = 13.0843;
  const myLongitude = 80.2705;
  const distance = calculateDistance(
    myLatitude,
    myLongitude,
    parseFloat(latitude),
    parseFloat(longitude),
  );

  return new Response(
    JSON.stringify({
      distance: Math.round(distance * 100) / 100,
      city: city ?? "Unknown",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}
