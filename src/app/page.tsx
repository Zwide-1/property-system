"use client";

import { useEffect, useState } from "react";
import Map from "../components/Map";
import PropertyCard from "../components/PropertyCard";

export default function Home() {
  const [stands, setStands] = useState([]);
  const [settings, setSettings] = useState<any>(null);

  // Fetch stands (existing)
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/stands/")
      .then((res) => res.json())
      .then((data) => setStands(data));
  }, []);

  // Fetch site settings (NEW)
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/settings/")
      .then((res) => res.json())
      .then((data) => setSettings(data));
  }, []);

  if (!settings) return <div>Loading...</div>;

  return (
    <div
      style={{
        backgroundColor: settings.background_color,
        backgroundImage: settings.background_image
          ? `url(http://127.0.0.1:8000${settings.background_image})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Site Title */}
      <h1 className="text-white text-4xl mb-6">
        {settings.site_name}
      </h1>

      {/* Stands Section */}
      <h2 className="text-white text-2xl mb-4">Available Stands</h2>

      {stands.map((s: any, i) => (
        <div
          key={i}
          className="bg-white/80 p-4 mb-4 rounded-lg shadow"
        >
          <h3 className="text-xl font-bold">{s.name}</h3>
          <p>Lat: {s.latitude}</p>
          <p>Lng: {s.longitude}</p>

          {s.image && (
            <img
              src={`http://127.0.0.1:8000${s.image}`}
              width="200"
              className="my-2 rounded"
            />
          )}

          <Map lat={s.latitude} lng={s.longitude} />
        </div>
      ))}
    </div>
  );
}