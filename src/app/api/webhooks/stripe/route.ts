import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { add } from 'date-fns'

import { pricing } from "@/constants/pricing";
import { getUserByEmail } from "@/actions";
import { prisma } from "@/config/prisma";

import type { Price } from "@/types/plan";

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
        const { data: { object: { customer_details } } } = event;


        if (!amount_total || !pricing[amount_total as Price]) {
          throw new Error("Invalid price or price not found");
        }

        const paidPlan = pricing[amount_total as Price]

        const userExists = await getUserByEmail(customer_details?.email!)

        if (!userExists) {
          throw new Error(`The user does not exist with the email: ${customer_details?.email}`);
        }

        const months = {
          monthly: 1,
          quarterly: 3,
          annually: 12,
        }[paidPlan.recurrency!]

        const user = await prisma.user.update({
          where: { email: customer_details?.email! }, data: {
            license: paidPlan.license, 
            licensedUntil: add(new Date(), {
              months,
            }),
            recurrency: paidPlan.recurrency,
          }
        })

        console.log("User:", JSON.stringify(user));
        break;
      default:
        throw new Error("Unhandled relevant event!");
    }
  } catch (error: any) {
    throw new Error(`Webhook handler failed: ${error.message}`);
  }

  return new NextResponse(JSON.stringify({ received: true }));
}
