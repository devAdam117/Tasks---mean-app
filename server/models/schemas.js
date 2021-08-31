const  mongoose  = require("mongoose");


  const ListsSchema = mongoose.model("task", new mongoose.Schema({
    task : {
        type:String,
        required:true,
        
    },
    description: {
        type: String        
    },    
    date: { 
        type: Date,
        default: Date.now
         }
})) 

//
exports.ListsSchema=ListsSchema;