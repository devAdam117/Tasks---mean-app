const Joi=require("joi");


const validateList=(list)=>{
    const schema= Joi.object({
        task:Joi.string().required().min(1).max(40),
        description:Joi.string().allow('').optional(),
        date:Joi.date()        
    })
    const result= schema.validate(list);
    return result;
}
exports.validateList=validateList;