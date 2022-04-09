const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Razorpay=require("razorpay");
exports.sendStripeKey = async function (req, res, next) {
  try {
    res.status(200).json({
      stripeKey: process.env.STRIPE_API_KEY,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.captureStripePayment = async function (req, res, next) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",

      //optional
      metadata: { integration_check: "accept_a_payment" },
    });
    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.sendRazorpayKey = async function (req, res, next) {
  try {
    res.status(200).json({
      stripeKey: process.env.RAZORPAY_API_KEY,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.captureRazorpayPayment = async function (req, res, next) {
  try {
    const amount = req.body.amount;
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    const myOrder = await instance.orders.create({
      amount: req.body.amount,
      currency: "INR",
      receipt: "receipt#1",
    });
    res.status(200).json({
      success: true,
      amount,
      order: myOrder,
    });
  } catch (err) {
    console.log(err);
  }
};
