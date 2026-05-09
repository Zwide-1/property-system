"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  Users,
  Settings,
  Bell,
  Menu,
} from "lucide-react";

import { properties } from "@/data/properties";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const totalProperties = properties.length;
  const paidClients = properties.filter((p) => p.status === "Paid").length;
  const paymentsDue = properties.filter((p) => p.status === "Pending");
  const paymentsDueAmount = paymentsDue.reduce((sum, p) => sum + p.price, 0);
  const [alerts, setAlerts] = useState([]);

  const stats = [
    {
      title: "Total Properties",
      value: totalProperties,
      change: "+12.5%",
      trend: "up",
      icon: Building2,
    },
    {
      title: "Payments Due",
      value: paymentsDueAmount,
      change: `${paymentsDue.length} pending`,
      trend: "down",
      icon: CreditCard,
    },
    {
      title: "Paid Clients",
      value: paidClients,
      change: "+3 this month",
      trend: "up",
      icon: Users,
    },
  ];
  useEffect(() => {
  fetch("http://127.0.0.1:8000/api/missed-payments/")
    .then((res) => res.json())
    .then((data) => setAlerts(data))
    .catch((err) => console.error("Failed to load alerts:", err));
}, []);

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden lg:block">
        <div className="p-4 font-bold text-lg">Admin Panel</div>
        <nav className="space-y-2 p-4">
          <div className="flex items-center gap-2 cursor-pointer">
            <LayoutDashboard size={18} /> Dashboard
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Building2 size={18} /> Properties
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <CreditCard size={18} /> Payments
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Users size={18} /> Clients
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Settings size={18} /> Settings
          </div>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1">
        
        {/* Navbar */}
        <header className="flex justify-between items-center p-4 bg-white border-b">
          <button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu />
          </button>
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-3 py-1"
          />
          <Bell />
        </header>

        {/* Content */}
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between">
                  <p>{stat.title}</p>
                  <stat.icon />
                </div>
                <h2 className="text-xl font-bold">
                  {stat.title === "Payments Due"
                    ? `$${stat.value.toLocaleString("fr-FR")}`
                    : stat.value}
                </h2>
                <p className="text-sm text-gray-500">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Alerts Section */}
<div className="mt-6 bg-white p-4 rounded shadow border-l-4 border-red-500">
  <h2 className="font-bold mb-3 flex items-center gap-2">
    ⚠️ Payment Alerts
  </h2>

  {alerts.length === 0 ? (
    <p className="text-gray-500">No missed payments 🎉</p>
  ) : (
    alerts.map((alert: any, index) => (
      <div
        key={index}
        className="flex justify-between py-2 border-b text-red-600"
      >
        <div>{alert.client}</div>
        <div>${alert.amount}</div>
        <div>Due: {alert.due_date}</div>
      </div>
    ))
  )}
</div>


          {/* Recent Properties */}
          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-3">Recent Properties</h2>
            {properties.map((p) => (
              <div key={p.id} className="flex justify-between border-b py-2">
                <div>{p.title}</div>
                <div>${p.price.toLocaleString("fr-FR")}</div>
                <div>{p.status}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}