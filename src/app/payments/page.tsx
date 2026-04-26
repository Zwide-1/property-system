"use client";

import { useEffect, useState } from "react";

interface Payment {
  id: number;
  amount: number;
  status: string;
  due_date: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/payments/")
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data); // 👈 debugging
        setPayments(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Payments</h1>

      {payments.length === 0 ? (
        <p>No payments found</p>
      ) : (
        payments.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
            <p>Amount: ${p.amount}</p>
            <p>Status: {p.status}</p>
            <p>Due: {p.due_date}</p>
          </div>
        ))
      )}
    </div>
  );
}