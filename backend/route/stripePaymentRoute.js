import express from "express";
import "dotenv/config";
import stripe from "stripe";

const stripeInstance = stripe(process.env.STRIPE_SECRET);

const stripeRoute = express.Router();

stripeRoute.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  console.log(products[0].name + products[0].price + products[0].quantity);

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));

  const session = await stripeInstance.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/success-payment",
    cancel_url: "http://localhost:5173/",
  });

  res.json({ id: session.id });
});
export default stripeRoute;
