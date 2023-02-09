const express = require('express');
const router = require('express').Router();

const userRoutes = require('./userRoutes');
router.use('/users', userRoutes);


const postRoutes = require('./postRoutes');
router.use('/post', postRoutes);

const commentRoutes = require('./commentRoutes');
router.use('/comment', commentRoutes);



module.exports = router;