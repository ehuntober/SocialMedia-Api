const router = require('express').Router();
const Post = require("../models/Post")
const User = require('../models/User')

// Create new Post 
router.post("/", async(req,res)=>{
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json({
            "message": "Post created successfully",
            "data": savedPost

        })
//  driver 08131309383
    }
    catch(error){
        res.status(500).json(error)

     }
})

// Update existing Post
router.put("/id", async(req,res)=>{
    try{
        const post = await Post.findOne(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({ $set: req.body})
            res.status(200).json("Your post has been updated!!!")
        } else{
            res.status(403).json("You can only update your post !")
        }
        res.status(200).json({
            "message": "Post created successfully",
            "data": savedPost
        })

    }
    catch(error){
        res.status(500).json(error)

    }
})

module.exports = router