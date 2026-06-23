"use client";

import { useState } from "react";

export default function NewClientPage() {
  const [client, setClient] = useState({
    name: "",
    phone_number: "",
    national_id: "",
    email: "",
    address: "",
  });

  async function saveClient(e: any) {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/clients/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      }
    );

    if (res.ok) {
      alert("Client Saved");
    }
  }

  return (
    <div className="p-6">
      <h1>Add Client</h1>

      <form onSubmit={saveClient}>
        <input
          placeholder="Name"
          onChange={(e) =>
            setClient({
              ...client,
              name: e.target.value,
            })
          }
        />

        <input
          placeholder="Phone"
          onChange={(e) =>
            setClient({
              ...client,
              phone_number: e.target.value,
            })
          }
        />

        <input
          placeholder="National ID"
          onChange={(e) =>
            setClient({
              ...client,
              national_id: e.target.value,
            })
          }
        />

        <button type="submit">
          Save Client
        </button>
      </form>
    </div>
  );
}