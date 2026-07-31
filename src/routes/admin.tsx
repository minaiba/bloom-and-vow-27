import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  Check,
  Download,
  LogOut,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { claimAdmin } from "@/lib/admin.functions";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Guest Admin — Olivia & Ralph" },
      { name: "description", content: "Private RSVP management for the wedding of Olivia and Ralph." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Guest Admin — Olivia & Ralph" },
      { property: "og:description", content: "Private RSVP management dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

type Rsvp = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  attending: boolean;
  guests: number;
  allergies: string | null;
  menu_notes: string | null;
  message: string | null;
  created_at: string;
};

const input =
  "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-ring/30";

function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => (await supabase.auth.getSession()).data.session,
    staleTime: 0,
  });
}

function LoginCard({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const fn =
      mode === "signin"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          });
    const { error } = await fn;
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(mode === "signin" ? "Welcome back" : "Account created");
    onDone();
  };

  return (
    <div className="flex min-h-screen items-center justify-center paper px-6">
      <form onSubmit={submit} className="glass w-full max-w-sm space-y-5 rounded-3xl p-8">
        <div className="text-center">
          <h1 className="script text-4xl text-primary">Guest Admin</h1>
          <p className="mt-2 text-xs text-muted-foreground">
            Private area for the couple only.
          </p>
        </div>
        <input
          className={input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-full bg-primary px-6 py-3 text-[0.65rem] uppercase tracking-[0.3em] text-primary-foreground disabled:opacity-60"
        >
          {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="w-full text-center text-xs text-muted-foreground underline-offset-4 hover:underline"
        >
          {mode === "signin"
            ? "First time? Create the admin account"
            : "Already have an account? Sign in"}
        </button>
      </form>
    </div>
  );
}

function AdminPage() {
  const session = useSession();
  const qc = useQueryClient();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "yes" | "no">("all");
  const [editing, setEditing] = useState<Rsvp | null>(null);

  const userId = session.data?.user.id;

  const role = useQuery({
    queryKey: ["role", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId!)
        .eq("role", "admin")
        .maybeSingle();
      return data?.role ?? null;
    },
  });

  const rsvps = useQuery({
    queryKey: ["rsvps"],
    enabled: role.data === "admin",
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rsvps")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Rsvp[];
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("rsvps").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Guest removed");
      qc.invalidateQueries({ queryKey: ["rsvps"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const update = useMutation({
    mutationFn: async (row: Rsvp) => {
      const { error } = await supabase
        .from("rsvps")
        .update({
          first_name: row.first_name,
          last_name: row.last_name,
          phone: row.phone,
          email: row.email,
          attending: row.attending,
          guests: row.guests,
          allergies: row.allergies,
          menu_notes: row.menu_notes,
          message: row.message,
        })
        .eq("id", row.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Guest updated");
      setEditing(null);
      qc.invalidateQueries({ queryKey: ["rsvps"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const claim = useMutation({
    mutationFn: () => claimAdmin(),
    onSuccess: (res) => {
      if (res.granted) {
        toast.success("You are now the administrator");
        role.refetch();
      } else {
        toast.error(res.reason);
      }
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const rows = useMemo(() => {
    const list = rsvps.data ?? [];
    const q = query.trim().toLowerCase();
    return list.filter((r) => {
      const matchesFilter =
        filter === "all" || (filter === "yes" ? r.attending : !r.attending);
      const matchesQuery =
        !q ||
        `${r.first_name} ${r.last_name} ${r.email} ${r.phone}`
          .toLowerCase()
          .includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [rsvps.data, query, filter]);

  const stats = useMemo(() => {
    const list = rsvps.data ?? [];
    return {
      accepted: list.filter((r) => r.attending).length,
      declined: list.filter((r) => !r.attending).length,
      guests: list.reduce((sum, r) => sum + (r.attending ? r.guests : 0), 0),
    };
  }, [rsvps.data]);

  const download = (content: string, filename: string, mime: string) => {
    const url = URL.createObjectURL(new Blob([content], { type: mime }));
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toTable = () => {
    const headers = [
      "First name",
      "Last name",
      "Phone",
      "Email",
      "Attending",
      "Guests",
      "Allergies",
      "Menu notes",
      "Message",
      "Submitted",
    ];
    const body = rows.map((r) => [
      r.first_name,
      r.last_name,
      r.phone,
      r.email,
      r.attending ? "Yes" : "No",
      String(r.guests),
      r.allergies ?? "",
      r.menu_notes ?? "",
      r.message ?? "",
      new Date(r.created_at).toLocaleString(),
    ]);
    return { headers, body };
  };

  const exportCsv = () => {
    const { headers, body } = toTable();
    const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const csv = [headers, ...body].map((r) => r.map(esc).join(",")).join("\n");
    download("\uFEFF" + csv, "wedding-guests.csv", "text/csv;charset=utf-8");
  };

  const exportExcel = () => {
    const { headers, body } = toTable();
    const escape = (v: string) =>
      v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const html = `<html xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8"></head><body><table border="1"><thead><tr>${headers
      .map((h) => `<th>${escape(h)}</th>`)
      .join("")}</tr></thead><tbody>${body
      .map((r) => `<tr>${r.map((c) => `<td>${escape(c)}</td>`).join("")}</tr>`)
      .join("")}</tbody></table></body></html>`;
    download(html, "wedding-guests.xls", "application/vnd.ms-excel");
  };

  if (session.isLoading) {
    return <div className="min-h-screen paper" />;
  }

  if (!session.data) {
    return <LoginCard onDone={() => session.refetch()} />;
  }

  if (role.isLoading) {
    return <div className="min-h-screen paper" />;
  }

  if (role.data !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center paper px-6">
        <div className="glass max-w-md rounded-3xl p-8 text-center">
          <h1 className="script text-3xl text-primary">Access restricted</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            This account is not an administrator. If you are setting up the site for
            the first time, claim the administrator role below.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => claim.mutate()}
              disabled={claim.isPending}
              className="rounded-full bg-primary px-6 py-3 text-[0.65rem] uppercase tracking-[0.3em] text-primary-foreground disabled:opacity-60"
            >
              {claim.isPending ? "Working…" : "Claim admin access"}
            </button>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                session.refetch();
              }}
              className="text-xs text-muted-foreground underline-offset-4 hover:underline"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen paper px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="script text-4xl text-primary">Guest List</h1>
            <p className="mt-1 text-xs text-muted-foreground">
              {session.data.user.email}
            </p>
          </div>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              session.refetch();
            }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 text-[0.6rem] uppercase tracking-[0.25em] text-primary hover:bg-secondary"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </header>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["Accepted", stats.accepted],
            ["Declined", stats.declined],
            ["Total guests", stats.guests],
          ].map(([label, value]) => (
            <div key={label as string} className="glass rounded-2xl p-6">
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                {label}
              </p>
              <p className="script mt-2 text-4xl text-primary">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              className={cn(input, "pl-11")}
              placeholder="Search name, email or phone"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {(["all", "yes", "no"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-[0.6rem] uppercase tracking-[0.25em] transition-colors",
                filter === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input text-foreground/70 hover:bg-secondary",
              )}
            >
              {f === "all" ? "All" : f === "yes" ? "Attending" : "Declined"}
            </button>
          ))}
          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 text-[0.6rem] uppercase tracking-[0.25em] text-primary hover:bg-secondary"
          >
            <Download className="h-3.5 w-3.5" /> CSV
          </button>
          <button
            onClick={exportExcel}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 text-[0.6rem] uppercase tracking-[0.25em] text-primary hover:bg-secondary"
          >
            <Download className="h-3.5 w-3.5" /> Excel
          </button>
        </div>

        <div className="glass mt-6 overflow-x-auto rounded-3xl">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
                <th className="px-5 py-4">Guest</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Attending</th>
                <th className="px-5 py-4">Seats</th>
                <th className="px-5 py-4">Notes</th>
                <th className="px-5 py-4" />
              </tr>
            </thead>
            <tbody>
              {rsvps.isLoading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">
                    Loading…
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">
                    No guests yet.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-b border-border/60 last:border-0">
                    <td className="px-5 py-4">
                      <p className="font-medium text-foreground">
                        {r.first_name} {r.last_name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(r.created_at).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-xs text-foreground/70">
                      <p>{r.email}</p>
                      <p>{r.phone}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em]",
                          r.attending
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground",
                        )}
                      >
                        {r.attending ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        {r.attending ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-5 py-4">{r.guests}</td>
                    <td className="max-w-[240px] px-5 py-4 text-xs text-foreground/70">
                      {[r.allergies, r.menu_notes, r.message].filter(Boolean).join(" · ") || "—"}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditing(r)}
                          className="rounded-full border border-input px-4 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] hover:bg-secondary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => remove.mutate(r.id)}
                          aria-label="Delete guest"
                          className="rounded-full border border-destructive/40 p-2 text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-sm"
          onClick={() => setEditing(null)}
        >
          <div
            className="glass w-full max-w-lg space-y-4 rounded-3xl bg-card p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="script text-2xl text-primary">Edit guest</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className={input}
                value={editing.first_name}
                onChange={(e) => setEditing({ ...editing, first_name: e.target.value })}
              />
              <input
                className={input}
                value={editing.last_name}
                onChange={(e) => setEditing({ ...editing, last_name: e.target.value })}
              />
              <input
                className={input}
                value={editing.email}
                onChange={(e) => setEditing({ ...editing, email: e.target.value })}
              />
              <input
                className={input}
                value={editing.phone}
                onChange={(e) => setEditing({ ...editing, phone: e.target.value })}
              />
              <input
                className={input}
                type="number"
                min={0}
                value={editing.guests}
                onChange={(e) =>
                  setEditing({ ...editing, guests: Number(e.target.value) || 0 })
                }
              />
              <select
                className={input}
                value={editing.attending ? "yes" : "no"}
                onChange={(e) =>
                  setEditing({ ...editing, attending: e.target.value === "yes" })
                }
              >
                <option value="yes">Attending</option>
                <option value="no">Declined</option>
              </select>
            </div>
            <textarea
              className={input}
              rows={3}
              value={editing.message ?? ""}
              onChange={(e) => setEditing({ ...editing, message: e.target.value })}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditing(null)}
                className="rounded-full border border-input px-6 py-2.5 text-[0.6rem] uppercase tracking-[0.25em]"
              >
                Cancel
              </button>
              <button
                onClick={() => update.mutate(editing)}
                disabled={update.isPending}
                className="rounded-full bg-primary px-6 py-2.5 text-[0.6rem] uppercase tracking-[0.25em] text-primary-foreground disabled:opacity-60"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
