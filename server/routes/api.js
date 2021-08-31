const express= require("express");
const router = express.Router();
const mongoose = require("../models/conn");
const schemas = require("../models/schemas");
const validators = require("../models/validation");
const queries = require("../models/queries");

router.get("/tasks",async (req,res)=>{
    let result = await queries.getAll(schemas.ListsSchema);
    res.send(result);
})

router.get("/tasks/:id",async (req,res)=>{
    let result = await queries.getSingle(req.params.id,schemas.ListsSchema);
    res.send(result);
})

router.post("/tasks", async (req,res)=>{
    let task = req.body;
    console.log(task);
    const result =  validators.validateList(task);  
    if(!result.error){
        let user = await queries.postSingle(task,schemas.ListsSchema);
        res.status(200).send(user);
        
    }

    else {
        res.status(404).send("Task nesplna poziadavky" +result.error);
    }

})
router.delete("/tasks/:id",async (req,res)=>{
    let id = req.params.id;
    const result = await queries.deleteSingle(id,schemas.ListsSchema);
    console.log(result);
    result!=null ? res.status(200).send(`User with id: ${id} is deleted`):res.status(400).send("Not such user with this id!"); 
})

router.put("/tasks", async (req,res)=>{
    //new task update
    let task = {    
        task:req.body.task,
        description:req.body.description
    };
    console.log(task)
    console.log(req.body)
    let id = req.body._id;
    
    const result = validators.validateList(task);
    if(!result.error){
        let result = await queries.updateSingle(task,id,schemas.ListsSchema);        
        res.status(200).send(result);       
    }
    else {        
        res.status(404).send(result.error);
    }
})


module.exports=router;

module.exports=router;