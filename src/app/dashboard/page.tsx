"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stands, setStands] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [allocations, setAllocations] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/stands/`)
      .then((res) => res.json())
      .then(setStands);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/`)
      .then((res) => res.json())
      .then(setClients);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/allocations/`)
      .then((res) => res.json())
      .then(setAllocations);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/`)
      .then((res) => res.json())
      .then(setPayments);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/alerts/`)
      .then((res) => res.json())
      .then(setAlerts);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings/`)
      .then((res) => res.json())
      .then(setSettings);
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
  <div
    className="p-6 min-h-screen"
    style={{
      backgroundImage:
        settings?.background_image
          ? `url(${settings.background_image})`
          : "none",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >

      {/* Dashboard Header Branding */}
      {settings && (
        <div className="flex items-center gap-4 mb-8">
          {settings.company_logo && (
            <img
              src={settings.company_logo}
              alt="Company Logo"
              className="h-16 w-16 object-contain"
            />
          )}

          <div>
            <h1 className="text-3xl font-bold">
              {settings.company_name}
            </h1>

            <p className="text-gray-600">
              Property Management Dashboard
            </p>
          </div>
        </div>
      )}

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="border rounded-lg p-4 shadow-sm">
          <h3>Total Stands</h3>
          <p className="text-3xl font-bold">
            {stands.length}
          </p>
        </div>

        <div className="border rounded-lg p-4 shadow-sm">
          <h3>Allocated Stands</h3>
          <p className="text-3xl font-bold">
            {allocatedStands}
          </p>
        </div>

        <div className="border rounded-lg p-4 shadow-sm">
          <h3>Available Stands</h3>
          <p className="text-3xl font-bold">
            {availableStands}
          </p>
        </div>

        <div className="border rounded-lg p-4 shadow-sm">
          <h3>Total Clients</h3>
          <p className="text-3xl font-bold">
            {clients.length}
          </p>
        </div>

        <div className="border rounded-lg p-4 shadow-sm">
          <h3>Outstanding Balance</h3>
          <p className="text-3xl font-bold">
            ${outstandingBalance.toLocaleString()}
          </p>
        </div>

        <div className="border rounded-lg p-4 shadow-sm">
          <h3>Overdue Clients</h3>
          <p className="text-3xl font-bold">
            {overdueClients}
          </p>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="border rounded-lg p-4 shadow-sm">
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
            {alerts.length > 0 ? (
              alerts.map((alert: any) => (
                <tr key={alert.id}>
                  <td className="border p-2">
                    {alert.client_name || "N/A"}
                  </td>

                  <td className="border p-2">
                    {alert.stand_number || "N/A"}
                  </td>

                  <td className="border p-2">
                    {alert.message}
                  </td>

                  <td className="border p-2">
                    {alert.created_at
                      ? new Date(
                          alert.created_at
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="border p-4 text-center"
                >
                  No alerts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}