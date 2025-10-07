// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2023-10-16" });

export async function POST(req: Request) {
  try {
    const { plan } = await req.json();
    const priceId =
      plan === "agency"
        ? process.env.STRIPE_PRICE_AGENCY_MONTHLY
        : process.env.STRIPE_PRICE_PRO_MONTHLY;

    if (!priceId) {
      return NextResponse.json({ error: "Missing Stripe price ID" }, { status: 500 });
    }

    const origin = req.headers.get("origin") || "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/thank-you`,
      cancel_url: `${origin}/`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "stripe_error" }, { status: 500 });
  }
}

