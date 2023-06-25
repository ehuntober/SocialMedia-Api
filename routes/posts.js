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
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body }, {new: true});
            res.status(200).json({
                "message":"Your post has been updated!!!",
                "data": post})
        } else {
            res.status(403).json("You can only update your post!");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});


// delete post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.userId === req.body.userId) {
            await post.deleteOne({ $set: req.body }, {new: true});
            res.status(200).json("Your post have been deleted")
        } else {
            res.status(403).json("You can only delete your post!");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});


// get all posts

router.get("/", async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post)
        }
    catch (error) {
        res.status(500).json(error);
    }
});


// Post like/dislike API

router.get("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json("The post has been liked!")
        } 
        
        else{
            await post.updateOne({$pull: {likes: req.body.userId}})
            res.status(200).json("The post has been disliked")
        }
  
        }
    catch (error) {
        res.status(500).json(error);
    }
});

// get a post  by id

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        res.status(200).json(post)
        }
    catch (error) {
        res.status(500).json(error);
    }
});

// get timeline post


router.get('/timeline/:userId', async(req,res)=>{
    try{
        const currentUser = await User.findOne(req.params.userId);
        const userPosts = await Post.find({userId: currentUser._id})
        const friendPosts = await Promise.all(
            currentUser.followings.map((firendId) =>{
                return Post.find({ userId: firendId});
            })
        )

        res.status(200).json( userPosts.concat(...friendPosts))


    }

    catch(error){
        res.status(500).json(error)
    }
})




router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username})
        const post = await Post.find({userId: user._id});

        res.status(200).json(post)
        }
    catch (error) {
        res.status(500).json(error);
    }
});






































module.exports = router