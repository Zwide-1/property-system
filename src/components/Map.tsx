"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

export default function Map({ lat, lng }: any) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      zoom={15}
      center={{ lat, lng }}
      mapContainerStyle={{ width: "100%", height: "300px" }}
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  );
}