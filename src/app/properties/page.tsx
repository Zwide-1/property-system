"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PropertiesPage() {
  const [stands, setStands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/stands/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Stands:", data);
        setStands(data);
      })
      .catch((err) => {
        console.error("Failed to load stands:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6">Loading properties...</div>;
  }

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Properties
        </h1>

        <Link
          href="/properties/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Property
        </Link>
      </div>

      {/* Properties Grid */}
      {stands.length === 0 ? (
        <p>No properties found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {stands.map((stand) => (
            <Link
              key={stand.id}
              href={`/properties/${stand.id}`}
            >
              <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer">

                {/* Image */}
                {stand.image && (
                  <img
                    src={stand.image}
                    alt={stand.name}
                    className="w-full h-48 object-cover"
                  />
                )}

                {/* Card Body */}
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">
                    {stand.name}
                  </h2>

                  <p>
                    <strong>Stand:</strong>{" "}
                    {stand.stand_number}
                  </p>

                  <p>
                    <strong>Size:</strong>{" "}
                    {stand.size_sqm} sqm
                  </p>

                  <p>
                    <strong>Price:</strong> $
                    {Number(
                      stand.price
                    ).toLocaleString()}
                  </p>

                  <p>
                    <strong>Latitude:</strong>{" "}
                    {stand.latitude}
                  </p>

                  <p>
                    <strong>Longitude:</strong>{" "}
                    {stand.longitude}
                  </p>
                </div>

              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}