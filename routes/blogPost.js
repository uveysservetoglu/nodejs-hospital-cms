const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

/* GET blogPost listing. */
router.get('/', function(req, res) {

    const promise = BlogPost.aggregate([
        {//joinlenecek
            $lookup:{
                from: 'blogs',
                localField: 'blog_id',
                foreignField: '_id',
                as: 'blog'
            }
        },
        {
            $unwind : {
                path: '$blog',
                preserveNullAndEmptyArrays : true
            }
        }
    ]);
    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
});

router.post('/', (req,res,next)=>{

  const {content, sortOrder, author, blog_id } = req.body;

  const blogPost = new BlogPost({
      content    : content,
      sortOrder  : parseInt(sortOrder),
      author     : author,
      blog_id    : blog_id,
  });

  const promise = blogPost.save();

  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });
});

module.exports = router;
