"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";

export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    // TODO: Add login logic, cookie or jwt...
    // const response = await fetch("/api/auth/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // });

    // if (response.ok) {
    //   router.push("/profile");
    // } else {
    //   // Handle errors
    // }
    router.push("/movies");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <main className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Sign in
        </h1>

        {/* Add onSubmit handler and name attributes */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            name="email"
            type="text"
            placeholder="Email or username"
            className="w-full p-3 rounded text-white border"
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded text-white border"
          />

          <label className="flex items-center gap-2 text-white/80">
            <input type="checkbox" name="remember" className="rounded" />
            Remember me
          </label>

          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-primary hover:bg-primary/80 text-white font-medium transition-colors"
          >
            Login
          </button>
        </form>
      </main>

      {/* Decorative wave effect at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-48 pointer-events-none">
        <div
          className="absolute bottom-0 left-0 right-0 h-full bg-[#0d2647] opacity-50"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black)",
          }}
        />
      </div>
    </div>
  );
}
