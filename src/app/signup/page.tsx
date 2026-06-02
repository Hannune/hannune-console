import { Suspense } from "react";
import AuthForm from "@/components/auth-form";

export const metadata = { title: "Create account — Hannune Console" };

export default function SignupPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <Suspense fallback={null}>
        <AuthForm mode="signup" />
      </Suspense>
    </main>
  );
}
