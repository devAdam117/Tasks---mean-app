const mongoose = require("mongoose");

   mongoose.connect("mongodb://localhost/tasks",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
   })
    .then(()=>{ console.log("Connected to MongoDB! ✔️")})
    .catch((err)=>{console.error(err)});  
    

module.exports= mongoose;