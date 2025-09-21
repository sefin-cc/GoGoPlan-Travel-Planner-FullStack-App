"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function geocodeAddress(address: string) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`,
    {
      headers: {
        "User-Agent": "Gogoplanner/1.0 rogenasefin6@gmail.com", 
      },
    }
  );

  const data = await response.json();
  if (!data || data.length === 0) {
    throw new Error("Address not found");
  }

  const { lat, lon } = data[0]; // OSM returns `lat` and `lon`
  return { lat: parseFloat(lat), lng: parseFloat(lon) };
}


export async function addLocation(formData: FormData, tripId: string) {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }

  const address = formData.get("address")?.toString();
  if (!address) {
    throw new Error("Missing address");
  }

  const { lat, lng } = await geocodeAddress(address);

  const count = await prisma.location.count({
    where: { tripId },
  });

  await prisma.location.create({
    data: {
      locationTitle: address,
      lat,
      lng,
      tripId,
      order: count,
    },
  });

  redirect(`/trips/${tripId}`);
}