import express from 'express';
import getCollection from './models/index.mjs';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.get("/todos", async (req,res)=>{
    const collection = getCollection();
    const todos = await collection.find({}).toArray();
    res.status(200).json(todos);
});

router.post("/todos", async (req,res)=>{
    const collection = getCollection();
    const {todo} = req.body;
    //todo = JSON.stringify(todo);
    const newTodo = await collection.insertOne({todo, status:false});
    res.status(201).json({todo, status:false, _id:newTodo.insertedId});
});

router.delete("/todos/:id", async(req,res)=>{
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const deletedTodo = await collection.deleteOne({_id});
    res.status(200).json(deletedTodo);
});

router.put("/todos/:id", async(req,res)=>{
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const {status} = req.body;
    if(typeof status !== "boolean"){
        return res.status(400).json({msg:"Invalid status"});
    }
    const updatedTodo = await collection.updateOne({_id},{$set:{status: !status}});
    res.status(200).json(updatedTodo);
}
);

export default router;