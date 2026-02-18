import { useState } from "react";
import { useRouter } from "../router";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const { navigate } = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD;

    if (password === adminPass) {
      localStorage.setItem("isAdmin", "true");
      toast.success("Login successful ✅");
      navigate("/admin");
    } else {
      toast.error("Wrong Password ❌");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none"
              placeholder="Enter admin password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
