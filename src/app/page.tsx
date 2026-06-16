"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Map from "../components/Map";
import PropertyCard from "@/components/PropertyCard";
import Footer from "@/components/Footer";

export default function Home() {
  const [stands, setStands] = useState([]);
  const [settings, setSettings] = useState<any>(null);

  // Fetch stands
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/stands/")
      .then((res) => res.json())
      .then((data) => setStands(data));
  }, []);

  // Fetch site settings
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
      {/* Company Branding */}
<div className="mb-8 flex items-center gap-4">
  {settings.company_logo && (
    <img
      src={`http://127.0.0.1:8000${settings.company_logo}`}
      alt="Company Logo"
      className="h-20 w-20 object-contain"
    />
  )}

  <div>
    <h1 className="text-4xl font-bold text-white">
      {settings.company_name}
    </h1>

    <p className="text-white text-lg">
      {settings.site_name}
    </p>
  </div>
</div>

      {/* Dashboard Button */}
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Dashboard
        </Link>
      </div>

      {/* Stands Section */}
      <h2 className="text-white text-2xl mb-6">
        Available Stands
      </h2>

      {/* GRID OF PROPERTY CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        {stands.map((s: any) => (
          <div key={s.id}>
            <PropertyCard
              id={String(s.id)}
              image={
                s.image
                  ? `http://127.0.0.1:8000${s.image}`
                  : "https://via.placeholder.com/800x600"
              }
              title={s.name}
              price={s.price || 0}
              coordinates={{
                lat: s.latitude,
                lng: s.longitude,
              }}
              status={s.status || "Pending"}
            />

<Footer settings={settings} />

            {/* Map BELOW each card */}
            <div className="mt-2">
              <Map lat={s.latitude} lng={s.longitude} />
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}