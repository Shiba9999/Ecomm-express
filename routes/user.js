const express=require("express");
const signup=require("../controller/userController").signup;
const login=require("../controller/userController").login;
const logout=require("../controller/userController").logout;
const forgotPassword=require("../controller/userController").passwordReset;
const router=express.Router();
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/password/reset/:token").post(forgotPassword);
module.exports=router;