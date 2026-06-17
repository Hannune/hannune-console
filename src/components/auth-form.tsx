"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";

export default function AuthForm({ mode }: { mode: Mode }) {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);

    const supabase = createClient();

    // Magic link: same call for signup + login (shouldCreateUser=true).
    // 사용자가 메일 받은 링크 클릭 -> /auth/callback 이 session 교환 -> /dashboard.
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        shouldCreateUser: true,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setNotice(
      "이메일을 확인하세요. 받은 메일의 magic link 를 클릭하면 자동 로그인됩니다.",
    );
    setLoading(false);
  }

  const isSignup = mode === "signup";

  return (
    <div className="mx-auto w-full max-w-sm">
      <h1 className="text-2xl font-semibold tracking-tight">
        {isSignup ? "Create your account" : "Sign in"}
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        {isSignup
          ? "One account for every Hannune service. Magic link sign-in, no password."
          : "Magic link sign-in, no password."}
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-olive/25 px-3 py-2 text-sm outline-none focus:border-olive"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {notice && <p className="text-sm text-green-700">{notice}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-olive px-3 py-2 text-sm font-medium text-cream hover:bg-olive-hover disabled:opacity-50"
        >
          {loading
            ? "Sending magic link…"
            : isSignup
              ? "Send magic link to sign up"
              : "Send magic link"}
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-500">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-olive underline">
              Sign in
            </Link>
          </>
        ) : (
          <>
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-olive underline"
            >
              Create one
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
