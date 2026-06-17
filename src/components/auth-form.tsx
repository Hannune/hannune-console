"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);

    const supabase = createClient();

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      // Supabase Auth 에서 "Confirm email" OFF 면 가입 즉시 session 생성 → 바로 dashboard.
      // ON 이면 session 없음 → 사용자가 메일 confirm link 클릭 → /auth/callback → dashboard.
      if (data.session) {
        router.push(next);
        router.refresh();
        return;
      }
      setNotice(
        "이메일을 확인하세요. 받은 메일의 confirm 링크를 클릭하면 자동 로그인됩니다.",
      );
      setLoading(false);
      return;
    }

    // login: 비번
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push(next);
    router.refresh();
  }

  async function onMagicLink() {
    if (!email) {
      setError("이메일을 먼저 입력하세요.");
      return;
    }
    setLoading(true);
    setError(null);
    setNotice(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        shouldCreateUser: false,
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
          ? "One account for every Hannune service."
          : "Welcome back."}
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
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete={isSignup ? "new-password" : "current-password"}
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            ? "Please wait…"
            : isSignup
              ? "Create account"
              : "Sign in"}
        </button>
      </form>

      {!isSignup && (
        <button
          type="button"
          onClick={onMagicLink}
          disabled={loading}
          className="mt-3 w-full rounded-md border border-olive/25 px-3 py-2 text-sm font-medium text-olive hover:bg-olive/5 disabled:opacity-50"
        >
          비번 없이 magic link 로 로그인
        </button>
      )}

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
