"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/stands/")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center text-black"
      style={{ backgroundImage: "url('/land.jpg')" }}
    >
      <div className="bg-black/50 min-h-screen p-6">

        <h1 className="text-3xl font-bold mb-6">
          Welcome Property System
        </h1>

        <h2 className="text-xl font-semibold mb-4">
          Stands
        </h2>

        {data.length === 0 ? (
          <p>Loading data...</p>
        ) : (
          data.map((item: any) => (
            <div
              key={item.id}
              className="bg-white text-black p-4 rounded shadow mb-4"
            >
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p>GPS: {item.gps}</p>
            </div>
          ))
        )}

      </div>
    </div>
  );
}