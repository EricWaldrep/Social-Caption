"use client";

import React, { useState } from "react";
import { Button, Card, Input, Textarea } from "@/components/ui";
import Result from "@/components/Result";

export default function Page(): JSX.Element {
  // Form state
  const [platform, setPlatform] = useState<"tiktok" | "instagram" | "youtube">("tiktok");
  const [tone, setTone] = useState<
    "educational" | "funny" | "bold" | "luxury" | "inspirational" | "authoritative" | "story"
  >("educational");
  const [cta, setCta] = useState<
    "follow" | "comment" | "save" | "share" | "visit_bio" | "buy_now" | "dm_me"
  >("follow");
  const [keywords, setKeywords] = useState("");
  const [context, setContext] = useState("");

  // App state
  const [loading, setLoading] = useState(false);
  const [upgrading, setUpgrading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform,
          tone,
          cta,
          keywords: keywords
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
            .slice(0, 12),
          context,
        }),
      });

      const j = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 429 && j?.error === "limit_reached") {
          setError("Daily free limit reached. Upgrade to Pro for unlimited captions.");
          return;
        }
        throw new Error(j?.error || "Request failed");
      }

      setData(j);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function startCheckout(plan: "pro" | "agency" = "pro") {
    try {
      setUpgrading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j?.url) {
        alert(j?.error || "Checkout error. Check your Stripe env vars and restart the server.");
        return;
      }
      window.location.href = j.url;
    } catch (err: any) {
      alert(err?.message || "Network error starting checkout");
    } finally {
      setUpgrading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <header className="py-10 text-center">
        <h1 className="text-4xl font-extrabold">SocialCaption</h1>
        <p className="mt-2 opacity-80">Captions that connect. Hashtags that perform.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="space-y-4">
            {/* Platform */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setPlatform("tiktok")}
                className={`rounded-xl px-3 py-2 ring-1 ring-white/10 ${
                  platform === "tiktok" ? "bg-white/15" : "bg-white/5"
                }`}
              >
                TikTok
              </button>
              <button
                onClick={() => setPlatform("instagram")}
                className={`rounded-xl px-3 py-2 ring-1 ring-white/10 ${
                  platform === "instagram" ? "bg-white/15" : "bg-white/5"
                }`}
              >
                Instagram
              </button>
              <button
                onClick={() => setPlatform("youtube")}
                className={`rounded-xl px-3 py-2 ring-1 ring-white/10 ${
                  platform === "youtube" ? "bg-white/15" : "bg-white/5"
                }`}
              >
                YouTube
              </button>
            </div>

            {/* Tone */}
            <div className="grid grid-cols-3 gap-2">
              {[
                "educational",
                "funny",
                "bold",
                "luxury",
                "inspirational",
                "authoritative",
                "story",
              ].map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t as typeof tone)}
                  className={`rounded-xl px-3 py-2 ring-1 ring-white/10 ${
                    tone === t ? "bg-white/15" : "bg-white/5"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="grid grid-cols-3 gap-2">
              {["follow", "comment", "save", "share", "visit_bio", "buy_now", "dm_me"].map((c) => (
                <button
                  key={c}
                  onClick={() => setCta(c as typeof cta)}
                  className={`rounded-xl px-3 py-2 ring-1 ring-white/10 ${
                    cta === c ? "bg-white/15" : "bg-white/5"
                  }`}
                >
                  {c.replace("_", " ")}
                </button>
              ))}
            </div>

            {/* Keywords */}
            <div>
              <label className="mb-1 block text-sm opacity-70">
                Keywords (comma-separated, up to 12)
              </label>
              <Input
                placeholder="travel, luxury, balkans"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>

            {/* Context */}
            <div>
              <label className="mb-1 block text-sm opacity-70">Post context</label>
              <Textarea
                rows={5}
                placeholder="30s reel: sunrise drone shot over Kotor Bay; tip about packing light"
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
            </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={generate} disabled={loading || context.length < 10}>
              {loading ? "Generating..." : "Generate"}
            </Button>

            <Button onClick={() => startCheckout("pro")} disabled={upgrading}>
              {upgrading ? "Opening Checkout..." : "Upgrade to Pro"}
            </Button>

            <Button onClick={() => startCheckout("agency")} disabled={upgrading}>
              {upgrading ? "Opening Checkout..." : "Upgrade to Agency"}
            </Button>
          </div>

            {/* Error message */}
            {error && <p className="text-red-400">{error}</p>}
          </div>
        </Card>

        <Card>
          <Result data={data} />
        </Card>
      </div>

      <footer className="py-10 text-center opacity-60">
        <p>Generated by SocialCaption</p>
      </footer>
    </div>
  );
}

