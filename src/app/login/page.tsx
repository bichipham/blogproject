"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/reduxStore/store";
import { login } from "@/reduxStore/authSlice";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await dispatch(login({ username, password }));
    if (login.fulfilled.match(result)) {
      router.push("/newsfeed");
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-center h-screen
      h-screen bg-gradient-to-br from-purple-400 via-purple-600 to-purple-900"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-120 bg-white p-6 rounded-2xl shadow-md"
      >
        <h2 className="text-center text-2xl font-bold mb-4 ">
          {`Login to Beincom's Blog`}
        </h2>
        <label className="text-lg font-medium">Email:</label>
        <input
          //type="email"
          placeholder="User name"
          className="border border-gray-500
            h-12 px-3 py-2 
            text-base leading-5 
            rounded-md 
            shadow-sm"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="text-lg font-medium">Password:</label>
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-500
            h-12 px-3 py-2 
            text-base leading-5 
            rounded-md 
            shadow-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-purple-600 text-white p-2 rounded h-12 mt-4 hover:bg-purple-700 transition-colors duration-300 cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
}
