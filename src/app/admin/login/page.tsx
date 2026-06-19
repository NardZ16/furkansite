"use client";

import { useActionState } from "react";
import { login } from "@/actions/auth";

export default function LoginPage() {
  const [state, formAction] = useActionState(login, null as any);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-surface border border-white/10 p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold mb-2">Yönetici Girişi</h1>
          <p className="text-muted text-sm">Admin paneline erişmek için şifrenizi girin.</p>
        </div>

        <form action={formAction} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-muted mb-2">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
              placeholder="••••••••"
            />
          </div>

          {state?.error && (
            <div className="text-red-400 text-sm text-center bg-red-500/10 p-3 rounded-lg">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-accent text-black font-bold py-3 rounded-xl hover:bg-amber-400 transition-colors"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}
