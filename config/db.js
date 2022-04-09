const mongoose = require("mongoose");
const DB_URL=process.env.DB_URL ;
const connectWithDb=()=>{
    mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex:true,
      // useFindAndModify:false
    })
    .then(() => {
      console.log("connected to mongoDB");
    })
    .catch((err) => {
      console.log("error connecting to mongoDB", err);
      process.exit(1);
    });
}
module.exports=connectWithDb;