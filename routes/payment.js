const express=require("express");
const sendStripeKey=require("../controller/paymentController").sendStripeKey;
const sendRazorpayKey=require("../controller/paymentController").sendRazorpayKey;
const captureStripePayment=require("../controller/paymentController").captureStripePayment;
const captureRazorpayPayment=require("../controller/paymentController").captureRazorpayPayment;

const router=express.Router();
router.route("/stripekey").get(sendStripeKey);
router.route("/razorpaykey").get(sendRazorpayKey);

router.route("/stripepayment").get(captureStripePayment);
router.route("/razorpaypayment").get(captureRazorpayPayment);


module.exports=router;