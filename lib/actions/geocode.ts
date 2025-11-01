interface GeocodeResult {
  country: string;
  formattedAddress: string;
}

export async function getCountryFromCoordinates(
  lat: number,
  lng: number
): Promise<GeocodeResult> {

  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Gogoplanner/1.0 rogenasefin6@gmail.com",
      },
    });

    if (!response.ok) {
      console.error("OpenStreetMap API error:", response.statusText);
      return { country: "Unknown", formattedAddress: "Unknown location" };
    }

    const data = await response.json();

 
    if (!data || !data.address) {
      console.warn("No OpenStreetMap results found for:", lat, lng);
      return { country: "Unknown", formattedAddress: "Unknown location" };
    }


    const country = data.address.country || "Unknown";
    const formattedAddress =
      data.display_name || data.name || "Unknown location";

    return { country, formattedAddress };
  } catch (error) {
    console.error("Error in getCountryFromCoordinates (OpenStreetMap):", error);
    return { country: "Unknown", formattedAddress: "Unknown location" };
  }
}
