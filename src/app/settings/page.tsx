"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Settings:", data);
        setSettings(data);
      })
      .catch((err) => {
        console.error("Failed to load settings:", err);
      });
  }, []);

  if (!settings) {
    return <div className="p-6">Loading settings...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Settings
      </h1>

      {settings.company_logo && (
        <img
          src={settings.company_logo}
          alt="Company Logo"
          className="h-24 mb-4"
        />
      )}

      <p><strong>Company:</strong> {settings.company_name}</p>
      <p><strong>Site:</strong> {settings.site_name}</p>
      <p><strong>Email:</strong> {settings.contact_email}</p>
      <p><strong>Phone:</strong> {settings.contact_phone}</p>
      <p><strong>Address:</strong> {settings.address}</p>

      {settings.background_image && (
        <div className="mt-6">
          <img
            src={settings.background_image}
            alt="Background"
            className="max-w-md rounded border"
          />
        </div>
      )}
    </div>
  );
}