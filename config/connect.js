const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/data-house').
    then(
        ()=>{
            console.log("connected to data-house");
        }
    )
    .catch(
        (err)=>{
            console.error("error when trying to connect to data-house: "+err);
        }
    )

    module.exports= mongoose;