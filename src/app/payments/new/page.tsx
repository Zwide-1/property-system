"use client";

import { useState } from "react";

export default function NewPaymentPage() {
  const [payment, setPayment] = useState({
    client: "",
    stand: "",
    amount: "",
    due_date: "",
    paid: false,
  });

  async function savePayment(e: any) {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payments/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payment),
      }
    );

    if (res.ok) {
      alert("Payment Added");
    }
  }

  return (
    <div className="p-6">
      <h1>Add Payment</h1>

      <form onSubmit={savePayment}>
        <input
          placeholder="Client ID"
          onChange={(e) =>
            setPayment({
              ...payment,
              client: e.target.value,
            })
          }
        />

        <input
          placeholder="Stand ID"
          onChange={(e) =>
            setPayment({
              ...payment,
              stand: e.target.value,
            })
          }
        />

        <input
          placeholder="Amount"
          onChange={(e) =>
            setPayment({
              ...payment,
              amount: e.target.value,
            })
          }
        />

        <button type="submit">
          Save Payment
        </button>
      </form>
    </div>
  );
}