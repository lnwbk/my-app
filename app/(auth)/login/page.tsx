"use client";
import { fetchActionApi } from "@/app/utils/action";
import { useState } from "react";
import { setAccessToken } from "@/app/utils/action"; 
interface LoginResponse {
  jwt: string;
  user: {
    id: number;
    documentId: number;
  }
}
export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    let body = {
      identifier: identifier,
      password: password,
    };
    const res = await fetchActionApi("/api/auth/local", {
      method: "POST",
      body: JSON.stringify(body),
    } as any);
    console.log(res);
    if(res) {
        if (res.status === 200) {
          const token = res.data as LoginResponse
          await setAccessToken(token.jwt);
            window.location.href = "/";
        } else {
            alert("เข้าสู่ระบบไม่สําเร็จ");
        }
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          เข้าสู่ระบบ
        </h1>
        <form onSubmit={(e) => login(e)}>
          <div className="mb-4">
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              ชื่อผู้ใช้
            </label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              รหัสผ่าน
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  );
}
