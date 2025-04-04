'use client'

import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";

export default function OpenStreetMap() {
    const [isLoading, setIsLoading] = useState(true); // State to manage loading
    const coordinates: LatLngExpression = [37.7795939, -122.4167938];

    useEffect(() => {
        // Set loading to false when the map is ready
        const timeout = setTimeout(() => setIsLoading(false), 1000); // Simulated delay for loading effect
        return () => clearTimeout(timeout); // Cleanup the timeout on unmount
    }, []);

    return (
        <div className="w-full h-[300px] md:h-[500px] p-6 relative">
            {isLoading && (
                <div className="absolute inset-0 flex justify-center items-center bg-white opacity-70 z-10">
                    <p className="text-xl font-semibold">Loading Map...</p>
                </div>
            )}
            <MapContainer
                center={coordinates}
                zoom={13}
                className="w-full h-full rounded-lg"
                whenReady={() => setIsLoading(false)} // Set loading to false when map is ready
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={coordinates}>
                    <Popup>
                        Datnas Office - 23A Anderson street
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
