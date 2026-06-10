"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Map from "@/components/Map";

export default function PropertyDetails() {
  const params = useParams();
  const id = params.id;

  const [stand, setStand] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://127.0.0.1:8000/api/stands/${id}/`)
      .then((res) => res.json())
      .then((data) => setStand(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!stand) {
    return <div className="p-6">Loading property...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">
        {stand.name}
      </h1>

    <h1>{stand.name}</h1>

    <p>{stand.image}</p>
    
      <img
        src={stand.image}
        alt={stand.name}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />

      <div className="space-y-3 mb-6">
        <p>
          <strong>Description:</strong> {stand.description}
        </p>

        <p>
          <strong>Latitude:</strong> {stand.latitude}
        </p>

        <p>
          <strong>Longitude:</strong> {stand.longitude}
        </p>
      </div>

      <Map
        lat={stand.latitude}
        lng={stand.longitude}
      />
    </div>
  );
}