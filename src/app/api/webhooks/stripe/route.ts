import { pricing } from "@/constants/pricing";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import type { Price } from "@/types/plan";
import { getSession } from "@/actions";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeSecretKey!);

const relevantEvents = new Set(["checkout.session.completed"]);

export async function POST(req: NextRequest) {
  const body = await req.text();

  const sig = req.headers.get("stripe-signature") as string;

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    throw new Error("Webhook secret not found.");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log(`🔔  Webhook received: ${event.type}`);
  } catch (err: any) {
    throw new Error(`Webhook Error: ${err.message}`);
  }

  if (!relevantEvents.has(event.type)) {
    throw new Error(`Unsupported event type: ${event.type}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const { data: { object: { amount_total } } } = event;

        if (!amount_total || !pricing[amount_total as Price]) {
          throw new Error("Invalid price or price not found");
        }

        const plan = pricing[amount_total as Price]

        // const { user } = await getSession();

        console.log("Plan:", plan);
        break;
      default:
        throw new Error("Unhandled relevant event!");
    }
  } catch (error: any) {
    throw new Error(`Webhook handler failed: ${error.message}`);
  }

  return new NextResponse(JSON.stringify({ received: true }));
}
