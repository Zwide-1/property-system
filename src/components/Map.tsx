"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

export default function Map({ lat, lng }: any) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDASEi41rDNkvqoePmcHrRBCAg6tnTMpbo",
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