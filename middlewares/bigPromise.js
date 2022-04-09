const { promises } = require("nodemailer/lib/xoauth2");

module.exports=(func)=>(req,res,next)=>
promises.resolve(func(req,res,next)).catch(next);