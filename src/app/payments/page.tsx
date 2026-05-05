"use client";

import { useEffect, useState } from "react";

// =========================
// TYPE
// =========================
interface Payment {
  id: number;
  amount: number;
  paid: boolean;
  due_date: string;
}

// =========================
// PAGE
// =========================
export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);

  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");

  // =========================
  // GET PAYMENTS
  // =========================
  const fetchPayments = () => {
    fetch("http://127.0.0.1:8000/api/payments/")
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);
        setPayments(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // =========================
  // ADD PAYMENT
  // =========================
  async function addPayment() {
    const res = await fetch("http://127.0.0.1:8000/api/payments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client: 1, // temporary
        stand: 1,  // temporary
        amount: Number(amount),
        due_date: dueDate,
        paid: false,
      }),
    });

    if (res.ok) {
      alert("Payment added successfully ✅");

      setAmount("");
      setDueDate("");

      fetchPayments();
    } else {
      alert("Failed to add payment ❌");
    }
  }

  // =========================
  // STATUS LOGIC (IMPORTANT FIX)
  // =========================
  const getStatus = (p: Payment) => {
    const today = new Date();
    const due = new Date(p.due_date);

    if (p.paid) return "Paid";
    if (due < today) return "Overdue";
    return "Pending";
  };

  // =========================
  // UI
  // =========================
  return (
    <div style={{ padding: 20 }}>
      <h1>💳 Payments</h1>

      {/* ================= FORM ================= */}
      <div style={{ marginBottom: 20, padding: 10, border: "1px solid #ddd" }}>
        <h3>Add Payment</h3>

        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ display: "block", marginBottom: 10 }}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{ display: "block", marginBottom: 10 }}
        />

        <button onClick={addPayment}>Add Payment</button>
      </div>

      {/* ================= LIST ================= */}
      {payments.length === 0 ? (
        <p>No payments found</p>
      ) : (
        payments.map((p) => (
          <div
            key={p.id}
            style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
          >
            <p>Amount: ${p.amount}</p>

            {/* FIXED STATUS LOGIC */}
            <p>Status: {getStatus(p)}</p>

            <p>Due: {p.due_date}</p>
          </div>
        ))
      )}
    </div>
  );
}