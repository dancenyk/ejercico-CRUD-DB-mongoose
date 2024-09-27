const express = require ("express");
const router = express.Router(); 
const Task = require("../models/Task.js");

router.post("/create", async(req, res) =>{
    try{
        const task = await Task.create({...req.body, completed: false}); 
        res.status(200).json(task);
    }catch (error){
        console.error(error);
        res.status(500)
        .send({message :"there was a problem trying to create a task"});
    }
});


router.get("/", async(req, res)=>{
    try{
     const allTasks = await Task.find();
     res.status(201).json(allTasks);
    }catch(error){
        console.error(error);
        res.status(500)
        .send({message : "there was a problem trying to get all tasks"});

    }
});


router.get("/id/:_id", async(req,res)=>{
    try{
        const taskById = await Task.findById(req.params._id);
        res.status(200).json(taskById);
    }catch(error){
        console.error(error);
        res.status(500)
        .send({message: "there was a problem trying to find task by id"});
    }
});


router.put("/markAsCompleted/:_id", async (req, res) =>{
    try{
        const taskId = req.params._id
        const task = await Task.findByIdAndUpdate(
          taskId, {
            completed: true
          }, {new: true}
        )
        res.json(task)
    }catch(error){
        console.error(error);
        res.status(500)
        .send({message: "there was a problem trying to mark as completed"});
    }
});


router.put("/id/:_id", async (req, res) => {
    try {
        const taskId = req.params._id;
        
        if (!req.body.title) {
            return res.status(400).send({ message: "Title is required" });
        }
        const updatedTask = await Task.findByIdAndUpdate(
            taskId, 
            { title: req.body.title }, 
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).send({ message: "Task not found" });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to update the task" });
    }
});


router.delete ("/id/:_id", async (req, res)=>{
    try{
        const taskIdToDelete = req.params._id
        const task = await Task.findByIdAndDelete(taskIdToDelete)
        res.json({mensaje: "task eliminado", task })
    
    }catch(error){
        console.error(error);
        res.status(500)
        .send({message: "there was a problem trying to delete the task"});
    }
});


module.exports = router; 