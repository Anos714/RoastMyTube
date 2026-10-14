"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Unplug, UserX, LogOut, Loader2, ShieldCheck, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Reveal } from "@/components/landing/primitives";
import { signOut, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

interface YtStatus {
  connected: boolean;
  channelTitle?: string;
  subs?: number;
  roastCount?: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [status, setStatus] = useState<YtStatus | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [pending, setPending] = useState<null | "history" | "disconnect" | "account">(null);

  useEffect(() => {
    if (!isPending && !session) router.replace("/login");
  }, [isPending, session, router]);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    void (async () => {
      try {
        const [pRes, hRes] = await Promise.all([
          fetch("/api/youtube/profile"),
          fetch("/api/roast/history"),
        ]);
        if (cancelled) return;
        if (pRes.ok) {
          const p = await pRes.json();
          const h = hRes.ok ? await hRes.json() : [];
          setStatus({
            connected: true,
            channelTitle: p.channelTitle,
            subs: p.subs,
            roastCount: Array.isArray(h) ? h.length : 0,
          });
        } else {
          setStatus({ connected: false });
        }
      } catch {
        if (!cancelled) setStatus({ connected: false });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session]);

  const clearHistory = async () => {
    setBusy("history");
    try {
      const res = await fetch("/api/roast/history", { method: "DELETE" });
      if (res.ok) {
        toast("History wiped — like it never happened");
        setStatus((s) => (s ? { ...s, roastCount: 0 } : s));
      } else toast("Delete failed — try again");
    } finally {
      setBusy(null);
      setPending(null);
    }
  };

  const disconnect = async () => {
    setBusy("disconnect");
    try {
      const res = await fetch("/api/account/google", { method: "DELETE" });
      if (res.ok) {
        toast("YouTube disconnected");
        signOut();
        router.push("/");
      } else toast("Disconnect failed — try again");
    } finally {
      setBusy(null);
      setPending(null);
    }
  };

  const deleteAccount = async () => {
    setBusy("account");
    try {
      const res = await fetch("/api/account", { method: "DELETE" });
      if (res.ok) {
        toast("Account deleted — it was fun roasting you");
        await signOut();
        router.push("/");
      } else toast("Delete failed — try again");
    } finally {
      setBusy(null);
      setPending(null);
    }
  };

  const MODALS = {
    history: {
      title: "Delete roast history?",
      description: "All your saved roast reports will be permanently deleted. This can't be undone.",
      confirmLabel: "Delete history",
      run: clearHistory,
    },
    disconnect: {
      title: "Disconnect YouTube?",
      description: "Google access is revoked and you're signed out. Next login asks for consent again.",
      confirmLabel: "Disconnect",
      run: disconnect,
    },
    account: {
      title: "Delete your account?",
      description: "Everything goes: profile, sessions, all roast reports. Gone forever. The roasts were great while they lasted.",
      confirmLabel: "Delete everything",
      run: deleteAccount,
    },
  } as const;

  if (isPending) {
    return (
      <main className="grid min-h-screen place-items-center">
        <Loader2 className="size-8 animate-spin text-roast" />
      </main>
    );
  }
  if (!session) return null;

  const initial = (session.user.name ?? session.user.email ?? "?").charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen flex-col bg-void text-white">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <Reveal>
          <p className="font-roast-mono text-xs font-bold tracking-[0.25em] text-roast">
            ACCOUNT — 04
          </p>
          <h1 className="font-display mt-3 text-3xl font-bold tracking-tight uppercase sm:text-5xl">
            Victim <span className="text-gradient-roast">profile</span>
          </h1>
        </Reveal>

        {/* identity card */}
        <Reveal delay={0.1} className="mt-8">
          <Card className="card-brutal">
            <CardContent className="flex items-center gap-4 p-6">
              {session.user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={session.user.image} alt="" className="size-16 rounded-2xl" />
              ) : (
                <span className="font-display grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-roast to-ember text-3xl font-bold">
                  {initial}
                </span>
              )}
              <div className="min-w-0">
                <p className="font-display truncate text-xl font-bold">
                  {session.user.name ?? "Anonymous Victim"}
                </p>
                <p className="font-roast-mono truncate text-xs text-muted">{session.user.email}</p>
                <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-muted">
                  <ShieldCheck className="size-3.5 text-toxic" />
                  {status == null
                    ? "Checking YouTube…"
                    : status.connected
                      ? `YouTube connected — ${status.channelTitle}`
                      : "YouTube not connected"}
                </p>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        {/* stats */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          {[
            { label: "ROASTS SERVED", value: status?.roastCount != null ? String(status.roastCount) : "—" },
            { label: "YT SUBS", value: status?.subs != null ? status.subs.toLocaleString("en-IN") : "—" },
            { label: "DIGNITY LEFT", value: "0%" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={0.15 + i * 0.08}>
              <Card className="h-full">
                <CardContent className="p-5 text-center">
                  <p className="font-roast-mono text-2xl font-bold text-toxic sm:text-3xl">{s.value}</p>
                  <p className="font-roast-mono mt-1 text-[10px] tracking-[0.2em] text-muted">{s.label}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* actions */}
        <Reveal delay={0.2} className="mt-4">
          <Card>
            <CardContent className="flex flex-col gap-3 p-6 sm:flex-row">
              <Button variant="roast" className="flex-1" onClick={() => router.push("/roast")}>
                <Flame /> New roast
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => signOut()}>
                <LogOut /> Sign out
              </Button>
            </CardContent>
          </Card>
        </Reveal>

        {/* danger zone */}
        <Reveal delay={0.25} className="mt-4">
          <div className="overflow-hidden rounded-2xl border border-roast/40">
            <div className="hazard-stripes h-2" aria-hidden="true" />
            <div className="bg-card p-6">
              <p className="font-roast-mono text-xs font-bold tracking-[0.25em] text-roast">
                DANGER ZONE
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Button
                  variant="outline"
                  className="border-roast/40 hover:border-roast hover:bg-roast/10"
                  disabled={busy != null}
                  onClick={() => setPending("history")}
                >
                  <Trash2 /> {busy === "history" ? "Deleting…" : "Delete roast history"}
                </Button>
                <Button
                  variant="outline"
                  className="border-roast/40 hover:border-roast hover:bg-roast/10"
                  disabled={busy != null}
                  onClick={() => setPending("disconnect")}
                >
                  <Unplug /> {busy === "disconnect" ? "Working…" : "Disconnect YouTube"}
                </Button>
                <Button
                  variant="roast"
                  disabled={busy != null}
                  onClick={() => setPending("account")}
                >
                  <UserX /> {busy === "account" ? "Deleting…" : "Delete my account"}
                </Button>
              </div>
              <p className="mt-3 text-xs text-muted">
                History deletes only your saved reports. Disconnect revokes Google access and signs
                you out — next login re-asks consent. Delete my account wipes everything: profile,
                sessions, reports. Forever.
              </p>
            </div>
          </div>
        </Reveal>
      </main>
      <Footer />
      {pending && (
        <ConfirmModal
          open
          title={MODALS[pending].title}
          description={MODALS[pending].description}
          confirmLabel={MODALS[pending].confirmLabel}
          busy={busy != null}
          busyLabel="Working…"
          onConfirm={() => void MODALS[pending].run()}
          onClose={() => (busy == null ? setPending(null) : undefined)}
        />
      )}
    </div>
  );
}
