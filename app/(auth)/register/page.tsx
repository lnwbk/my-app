"use client";
import { fetchActionApi } from "@/app/utils/action";
import { useState } from "react";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const register = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        
        if (password !== confirmPassword) {
            setErrorMessage("รหัสผ่านไม่ตรงกัน");
            return;
        }

        setLoading(true);
        
        let body = {
            username: username,
            email: email,
            password: password,
        };
        
        try {
            const res = await fetchActionApi("/api/auth/local/register", {
                method: "POST",
                body: JSON.stringify(body),
            });

            if (res.status !== 200) {
                console.log(res);
                setErrorMessage("เกิดข้อผิดพลาดในการสมัครสมาชิก");
            } else {
                setSuccessMessage("สมัครสมาชิกสำเร็จ");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("เกิดข้อผิดพลาดบางประการ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
            <h2 className="text-2xl font-semibold text-center mb-6">สมัครสมาชิก</h2>
            <form onSubmit={(e) => register(e)} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                        placeholder="Username"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                        placeholder="Email"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                        placeholder="Password"
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                        placeholder="Confirm Password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
                </button>
            </form>

            {errorMessage && (
                <p className="mt-4 text-sm text-red-500 text-center">{errorMessage}</p>
            )}

            {successMessage && (
                <p className="mt-4 text-sm text-green-500 text-center">{successMessage}</p>
            )}
        </div>
    );
}
