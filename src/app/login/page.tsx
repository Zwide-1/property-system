"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username && password) {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border p-6 rounded shadow w-96">
        <h1 className="text-2xl font-bold mb-4">
          Property Management Login
        </h1>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          className="border p-2 w-full mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
}