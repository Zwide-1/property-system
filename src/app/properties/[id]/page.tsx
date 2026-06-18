"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Map from "@/components/Map";

export default function PropertyDetails() {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/property-details/${id}/`)
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error(err));
  }, [id]);

  if (!data) {
    return <div className="p-6">Loading...</div>;
  }

  const stand = data.stand;
  const client = data.client;
  const payments = data.payments;
  const alerts = data.alerts;

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">
          {stand.name}
        </h1>

        <Link
          href={`/properties/edit/${id}`}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Edit Property
        </Link>
      </div>

      {/* Property Image */}
      <img
        src={stand.image}
        alt={stand.name}
        className="w-full h-96 object-cover rounded-lg mb-8"
      />

      {/* Main Cards */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Property Information */}
        <div className="border rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-3">
            Property Information
          </h2>

          <p><strong>Stand Number:</strong> {stand.stand_number}</p>
          <p><strong>Size:</strong> {stand.size_sqm} sqm</p>
          <p><strong>Price:</strong> ${stand.price}</p>
          <p><strong>Deposit Required:</strong> ${stand.deposit_required}</p>
          <p><strong>Description:</strong> {stand.description}</p>
        </div>

        {/* Client Information */}
        <div className="border rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-3">
            Client Information
          </h2>

          <p><strong>Name:</strong> {client?.name || "Not Allocated"}</p>
          <p><strong>Phone:</strong> {client?.phone_number || "-"}</p>
          <p><strong>National ID:</strong> {client?.national_id || "-"}</p>
        </div>

        {/* Payment Summary */}
        <div className="border rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-3">
            Payment Summary
          </h2>

          <p><strong>Total Price:</strong> ${payments.total_price}</p>
          <p><strong>Amount Paid:</strong> ${payments.amount_paid}</p>
          <p><strong>Balance:</strong> ${payments.balance}</p>
          <p><strong>Payments Made:</strong> {payments.payment_count}</p>
        </div>

        {/* Alerts */}
        <div className="border rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-3">
            Alerts
          </h2>

          <p>
            <strong>Total Alerts:</strong> {alerts.count}
          </p>

          <div className="my-3">
            {alerts.overdue_count > 0 ? (
              <span className="bg-red-500 text-white px-3 py-1 rounded">
                🔴 Overdue
              </span>
            ) : (
              <span className="bg-green-500 text-white px-3 py-1 rounded">
                🟢 Good Standing
              </span>
            )}
          </div>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => alert("Reminder Sent Successfully")}
          >
            Send Reminder
          </button>
        </div>

      </div>

      {/* Map */}
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          Property Location
        </h2>

        <Map
          lat={stand.latitude}
          lng={stand.longitude}
        />
      </div>

      {/* Payment History */}
      <div className="border rounded-lg p-4 mt-6">
        <h2 className="text-2xl font-semibold mb-4">
          Payment History
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Due Date</th>
                <th className="border p-2">Payment Date</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.payment_history?.map((payment: any) => (
                <tr key={payment.id}>
                  <td className="border p-2">{payment.id}</td>
                  <td className="border p-2">${payment.amount}</td>
                  <td className="border p-2">{payment.due_date}</td>
                  <td className="border p-2">
                    {payment.payment_date || "-"}
                  </td>
                  <td className="border p-2">
                    {payment.paid ? (
                      <span className="text-green-600 font-semibold">
                        Paid
                      </span>
                    ) : (
                      <span className="text-orange-600 font-semibold">
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}