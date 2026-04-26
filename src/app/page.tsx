"use client";

import { useEffect, useState } from "react";
import Map from "../components/Map";

export default function Home() {
  const [stands, setStands] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/stands/")
      .then(res => res.json())
      .then(data => setStands(data));
  }, []);

  return (
    <div>
      <h1>Stands</h1>

      {stands.map((s: any, i) => (
        <div key={i}>
          <h2>{s.name}</h2>
          <p>Lat: {s.latitude}</p>
          <p>Lng: {s.longitude}</p>

          {s.image && <img src={s.image} width="200" />}

          <Map lat={s.latitude} lng={s.longitude} />
        </div>
      ))}
    </div>
  );
}