const bigPromise=require("../middlewares/bigPromise");
//two method to write the same code

exports.home = bigPromise( function(req, res) {
    res.status(200).send({
        message: 'Welcome to the API'
    });
});

exports.homedummy = async (req, res) => {
   try{
    res.status(200).send({
        message: 'Welcome to the Dummy'
    });
   }
   catch(err){
       console.log(err);
   }
}

