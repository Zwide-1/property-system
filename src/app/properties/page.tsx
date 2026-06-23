"use client";

import { useEffect, useState } from "react";

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
      <h1 className="text-2xl font-bold mb-4">
        Properties
      </h1>

      {stands.length === 0 ? (
        <p>No properties found</p>
      ) : (
        stands.map((stand) => (
          <div
            key={stand.id}
            className="border rounded p-4 mb-3"
          >
            <p><strong>Name:</strong> {stand.name}</p>
            <p><strong>Price:</strong> ${stand.price}</p>
            <p><strong>Status:</strong> {stand.status}</p>
          </div>
        ))
      )}
    </div>
  );
}