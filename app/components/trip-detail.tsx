"use client"

import Image from "next/image";
import { Trip } from "../generated/prisma";

interface TripDetailClientProps{
    trip: Trip;
}

export default function TripDetailClient({trip} : TripDetailClientProps) {


    return (
    <div className="container mx-auto px-4 py-8 space-y-8">
        {trip.imageUrl && (
            <div>
                {" "}
                <Image src={trip.imageUrl} alt={trip.title} className="object-cover" fill priority />
            </div>
        )}
    </div>
    )
}