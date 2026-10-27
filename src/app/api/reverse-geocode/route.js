
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));

  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lon) ||
    lat < -90 ||
    lat > 90 ||
    lon < -180 ||
    lon > 180
  ) {
    return NextResponse.json(
      { error: "Invalid latitude or longitude." },
      { status: 400 }
    );
  }

  try {
    const url = new URL(
      "https://nominatim.openstreetmap.org/reverse"
    );

    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("lat", String(lat));
    url.searchParams.set("lon", String(lon));
    url.searchParams.set("addressdetails", "1");
    url.searchParams.set("zoom", "10");

    const response = await fetch(url, {
      headers: {
        "User-Agent": "POSRetailAdmin/1.0",
        "Accept-Language": "en",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Geocoding service returned ${response.status}.` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const address = data.address ?? {};

    const city =
      address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      address.city_district ||
      address.suburb ||
      address.county ||
      null;

    return NextResponse.json({
      city,
      state:
        address.state ||
        address.state_district ||
        address.region ||
        null,
      country: address.country || null,
      displayName: data.display_name || null,
      rawAddress: address,
    });
  } catch (error) {
    console.error("Reverse geocoding error:", error);

    return NextResponse.json(
      { error: "Unable to contact the geocoding service." },
      { status: 502 }
    );
  }
}
