import { NextResponse } from "next/server";
import { GenSchema } from "@/lib/schemas";
import buildPrompt from "@/lib/prompt";
import { callLLM } from "@/lib/llm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = GenSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "bad_input" }, { status: 400 });
    const { platform, tone, cta, keywords, context } = parsed.data;

    const prompt = buildPrompt({ platform, tone, cta, keywords, context });
    const out = await callLLM(prompt);

    const lim = platform === "tiktok" ? 8 : platform === "instagram" ? 20 : 15;
    out.hashtags.primary = (out.hashtags.primary||[]).slice(0, Math.min(5, lim));
    out.hashtags.secondary = (out.hashtags.secondary||[]).slice(0, Math.max(0, lim - out.hashtags.primary.length - 5));
    out.hashtags.experimental = (out.hashtags.experimental||[]).slice(0, Math.max(0, lim - out.hashtags.primary.length - out.hashtags.secondary.length));

    return NextResponse.json(out);
  } catch (e:any) {
    return NextResponse.json({ error: e.message || "server_error" }, { status: 500 });
  }
}
