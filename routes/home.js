const express=require("express");
const { home,homedummy } = require("../controller/homeController");
const router=express.Router();
router.route("/").get(home);
router.route("/dummy").get(homedummy);
module.exports=router;