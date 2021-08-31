const { validateList } = require("./validation");

const getAll = async (Schema) => {
    const result = await Schema.find()
                               .sort({date:-1})  
                               .select() ;
                                             
    return result;
}

const getSingle = async (id,Schema) => {
    const result = await Schema.find({_id:id})
                               .select();
    return result;
}

const postSingle = async (listInfo,Schema)=>{
    let check =await Schema.find({task:listInfo.task});    
    if(check.length===0){
        const user = await new Schema({
            task:listInfo.task,
            description:listInfo.description
        }).save();
        return user;
    }
    else {
        return "Task with this name already exists!"
    }   
}
const deleteSingle = async (id,Schema)=> {
    let result;
     await Schema.findByIdAndRemove((id),function(err,msg){
        if (err){
            result=null;
        }
        else{
            result=msg;
        }
    });
    return result;
}

const updateSingle = async (listInfo,id,Schema)=> {          
    let result = await Schema.findByIdAndUpdate(id,listInfo);    
    return result;
    
}


exports.getAll=getAll;
exports.getSingle=getSingle;
exports.postSingle=postSingle;
exports.deleteSingle=deleteSingle;
exports.updateSingle=updateSingle;