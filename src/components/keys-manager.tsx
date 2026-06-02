"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { issueKey, revokeKey } from "@/app/dashboard/[service]/actions";

export type KeyRow = {
  id: string;
  keyPrefix: string;
  name: string | null;
  createdAt: string;
  lastUsedAt: string | null;
};

function fmt(date: string | null): string {
  if (!date) return "—";
  return new Date(date).toISOString().slice(0, 10);
}

export default function KeysManager({
  service,
  apiBaseUrl,
  initialKeys,
}: {
  service: string;
  apiBaseUrl: string;
  initialKeys: KeyRow[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [newKey, setNewKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onIssue(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNewKey(null);
    startTransition(async () => {
      const res = await issueKey(service, name);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setNewKey(res.plaintext);
      setName("");
      router.refresh();
    });
  }

  function onRevoke(id: string) {
    if (!confirm("Revoke this key? Apps using it will stop working.")) return;
    setError(null);
    startTransition(async () => {
      const res = await revokeKey(service, id);
      if (!res.ok) {
        setError(res.error ?? "revoke failed");
        return;
      }
      router.refresh();
    });
  }

  async function copy() {
    if (!newKey) return;
    await navigator.clipboard.writeText(newKey);
    setCopied(true);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">API keys</h2>
      </div>

      {/* one-time plaintext reveal */}
      {newKey && (
        <div className="mt-4 rounded-lg border border-green-300 bg-green-50 p-4">
          <p className="text-sm font-medium text-green-800">
            Your new key (copy it now — it won&apos;t be shown again):
          </p>
          <div className="mt-2 flex items-center gap-2">
            <code className="flex-1 break-all rounded bg-white px-3 py-2 text-sm">
              {newKey}
            </code>
            <button
              onClick={copy}
              className="rounded-md bg-olive px-3 py-2 text-sm text-cream hover:bg-olive-hover"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="mt-2 text-xs text-green-700">
            Use it as a Bearer token against {apiBaseUrl}
          </p>
        </div>
      )}

      {/* issue form */}
      <form onSubmit={onIssue} className="mt-4 flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Key name (optional, e.g. production)"
          className="flex-1 rounded-md border border-olive/25 px-3 py-2 text-sm outline-none focus:border-olive"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-olive px-4 py-2 text-sm font-medium text-cream hover:bg-olive-hover disabled:opacity-50"
        >
          {pending ? "Working…" : "Create key"}
        </button>
      </form>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {/* key list */}
      <div className="mt-6 overflow-hidden rounded-lg border border-olive/15">
        {initialKeys.length === 0 ? (
          <p className="p-5 text-sm text-gray-500">
            No keys yet. Create one to start calling the API.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-400">
              <tr>
                <th className="px-4 py-3 font-medium">Key</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Last used</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {initialKeys.map((k) => (
                <tr key={k.id} className="border-t border-olive/10">
                  <td className="px-4 py-3">
                    <code>{k.keyPrefix}…</code>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{k.name ?? "—"}</td>
                  <td className="px-4 py-3 text-gray-500">{fmt(k.createdAt)}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {fmt(k.lastUsedAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => onRevoke(k.id)}
                      disabled={pending}
                      className="text-sm text-red-600 hover:underline disabled:opacity-50"
                    >
                      Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
