const app=require('./app');
const connectWithDb = require('./config/db');
const cloudinary = require('cloudinary');
connectWithDb();

//cloudinanry config goes here
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});