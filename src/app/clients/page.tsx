"use client";

import { useEffect, useState } from "react";

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Clients:", data);
        setClients(data);
      })
      .catch((err) => {
        console.error("Failed to load clients:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6">Loading clients...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Clients
      </h1>

      {clients.length === 0 ? (
        <p>No clients found</p>
      ) : (
        clients.map((client) => (
          <div
            key={client.id}
            className="border rounded p-4 mb-3"
          >
            <p><strong>ID:</strong> {client.id}</p>
            <p><strong>Name:</strong> {client.name}</p>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Phone:</strong> {client.phone}</p>
          </div>
        ))
      )}
    </div>
  );
}