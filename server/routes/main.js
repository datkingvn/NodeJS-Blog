const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

// GET Home
router.get('', async (req, res) => {
    const locals = {
        title: "NodeJS Blog",
        description: "This is Blog make by NodeJS - Tran Manh Dat"
    }

    let perPage = 5;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{$sort: {createdAt: -1}}])
        .skip(perPage * page - perPage).limit(perPage).exec();

    const count = await Post.count();
    const nextPage = parseInt(page) + 1;
    //  Xác định có trang tiếp theo hay không = cách so sánh nextPage với số trang tối đa có thể có
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    try {
        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null, // hasNextPage => true => nextPage / false => null
        });
    } catch (e) {
        console.log(e)
    }
});


// Get /post:id
router.get('/post/:id', async (req, res) => {
    try {
        let slug = req.params.id

        const data = await Post.findById({_id: slug});

        const locals = {
            title: data.title,
            description: "This is Blog make by NodeJS - Tran Manh Dat",
        }

        res.render('post', {locals, data});
    } catch (e) {
        console.log(e)
    }
});

// POST /searchTerm
router.post('/search', async (req, res) => {
    try {
        const locals = {
            title: "Search",
            description: "This is Blog make by NodeJS - Tran Manh Dat"
        }

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

        const data = await Post.find({
            $or: [
  // Use $regex operator để tìm các bài viết có trường "title/body" khớp với biểu thức chính quy
                {title: {$regex: new RegExp(searchNoSpecialChar, 'i')}},
                {body: {$regex: new RegExp(searchNoSpecialChar, 'i')}},
            ]
        });

        res.render('search', {
            data,
            locals
        });
    } catch (e) {
        console.log(e)
    }
});

router.get('/about', (req, res) => {
    res.render('about');
});
router.get('/contact', (req, res) => {
    res.render('contact');
    });
module.exports = router;

