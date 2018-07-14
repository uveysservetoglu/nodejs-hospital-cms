const express  = require('express');
const mongoose = require('mongoose');
const router   = express.Router();
const Blog = require("../models/Blog");

/* GET blog listing. */
router.get('/', (req, res, next) => {
//  const promise = Blog.find({ });

    const promise = Blog.aggregate([
        {
            $lookup : {
                from : "blogposts",
                localField : "_id",
                foreignField: "blog_id",
                as : "post"
            }
        },
        {
            $unwind : {
                path : "$post",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group : {
                _id: {
                    _id: "$_id",
                    content: "$content",
                    sortOrder: "$sortOrder"
                },
                post : {
                  $push : "$post"
                }
            }
        },
        {
            $project : {
                _id : "$_id._id",
                content: "$_id.key",
                post: "$post"
            }
        }
    ]);
  promise.then((data)=>{
    res.json(data);
  })
  .catch((err)=>{
      res.json(err);
    });
});

router.get('/:blog_id', (req, res, next) => {
    //  const promise = Blog.find({ });

    const promise = Blog.aggregate([
        {
            $match:{
                '_id':mongoose.Types.ObjectId(req.params.blog_id)
            }
        },
        {
            $lookup : {
                from : "blogposts",
                localField : "_id",
                foreignField: "blog_id",
                as : "post"
            }
        },
        {
            $unwind : {
                path : "$post",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group : {
                _id: {
                    _id: "$_id",
                    content: "$content",
                    sortOrder: "$sortOrder"
                },
                post : {
                    $push : "$post"
                }
            }
        },
        {
            $project : {
                _id : "$_id._id",
                content: "$_id.key",
                post: "$post"
            }
        }
    ]);
    promise.then((data)=>{
        res.json(data);
    })
        .catch((err)=>{
            res.json(err);
        });
});

router.post('/', (req, res, next)=>{

  const {settings, key, parent, post, items, department} = req.body;
  const blog = new Blog({
      settings : settings,
      key      : key,
      parent   : parent,
      post     : post,
      items    : items,
      department: department
  });
  const promise = blog.save();

  promise.then((data)=>{
    res.json(data);
  })
  .catch((err)=>{
    res.json(err);
  })
});



module.exports = router;
