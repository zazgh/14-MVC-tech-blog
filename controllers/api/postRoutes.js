const express = require('express');
const router = require('express').Router();
const {User, Post, Comment} = require('../../models');

router.get("/",(req,res)=>{
    Post.findAll().then(postData=>{
     res.json(postData)
    }).catch(err=>{
     console.log(err);
     res.status(500).json({msg:"not found",err})
    })
 })

 router.post('/', async (req,res)=>{

    try {
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      console.log(err);
      res.status(400).json({msg:"Post could not be created. Make sure the title is unique and content is not empty."});
      
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: "not found" });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;