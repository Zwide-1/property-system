"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stands, setStands] = useState([]);
  const [clients, setClients] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [payments, setPayments] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/stands/")
      .then((res) => res.json())
      .then(setStands);

    fetch("http://127.0.0.1:8000/api/clients/")
      .then((res) => res.json())
      .then(setClients);

fetch("http://127.0.0.1:8000/api/allocations/")
  .then((res) => res.json())
  .then(setAllocations);

    fetch("http://127.0.0.1:8000/api/payments/")
      .then((res) => res.json())
      .then(setPayments);

    fetch("http://127.0.0.1:8000/api/alerts/")
      .then((res) => res.json())
      .then(setAlerts);
  }, []);

  const allocatedStands = allocations.length;

  const availableStands =
    stands.length - allocatedStands;

  const overdueClients = payments.filter(
    (p: any) => !p.paid
  ).length;

  const outstandingBalance = payments
    .filter((p: any) => !p.paid)
    .reduce(
      (total: number, p: any) =>
        total + Number(p.amount),
      0
    );

  return (
    <div className="p-6">

      <h1 className="text-4xl font-bold mb-8">
        Property Dashboard
      </h1>

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="border rounded-lg p-4">
          <h3>Total Stands</h3>
          <p className="text-3xl font-bold">
            {stands.length}
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <h3>Allocated Stands</h3>
          <p className="text-3xl font-bold">
            {allocatedStands}
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <h3>Available Stands</h3>
          <p className="text-3xl font-bold">
            {availableStands}
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <h3>Total Clients</h3>
          <p className="text-3xl font-bold">
            {clients.length}
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <h3>Outstanding Balance</h3>
          <p className="text-3xl font-bold">
            ${outstandingBalance}
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <h3>Overdue Clients</h3>
          <p className="text-3xl font-bold">
            {overdueClients}
          </p>
        </div>
      </div>

      {/* Recent Alerts */}
            {/* Recent Alerts */}
      <div className="border rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-4">
          Recent Alerts
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Client</th>
              <th className="border p-2">Stand</th>
              <th className="border p-2">Message</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {alerts.map((alert: any) => (
              <tr key={alert.id}>
                <td className="border p-2">
                  {alert.client_name}
                </td>

                <td className="border p-2">
                  {alert.stand_number}
                </td>

                <td className="border p-2">
                  {alert.message}
                </td>

                <td className="border p-2">
                  {new Date(
                    alert.created_at
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}