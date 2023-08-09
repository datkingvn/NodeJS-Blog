const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

// GET Home
router.get('', async (req, res) => {
    const locals = {
        title: "NodeJS Blog",
        description: "This is Blog make by NodeJS - Tran Manh Dat"
    }

    let perPage = 3;
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
            nextPage: hasNextPage ? nextPage : null
        });
    } catch (e) {
        console.log(e)
    }
});


// router.get('', async (req, res) => {
//     const locals = {
//         title: "NodeJS Blog",
//         description: "This is Blog make by NodeJS - Tran Manh Dat"
//     }
//
//     try {
//         const data = await Post.find(); // Truy vấn CSDL và lấy all bài viết từ model "Post"
//         res.render('index', {locals, data});
//     } catch (e) {
//         console.log(e)
//     }
// });


// function insertPostData() {
//     Post.insertMany([
//         {
//             title: "Getting Started with Node.js Blogging",
//             body: "In this guide, we delve into the process of building a blog using Node.js. From setting up the environment to creating routes and integrating a database, we'll cover all the essential steps."
//         },
//         {
//             title: "Node.js and Express for Powerful Blog Development",
//             body: "Discover how Node.js and Express can revolutionize your blog development journey. Learn to create dynamic routes, handle user authentication, and unleash the full potential of a Node.js-powered blog."
//         },
//         {
//             title: "Crafting Interactive Blogs with Node.js and EJS",
//             body: "EJS (Embedded JavaScript) makes crafting interactive blogs with Node.js a breeze. Dive into the world of templating engines, dynamic content rendering, and learn to build visually appealing blogs that engage your audience."
//         },
//         {
//             title: "Node.js Blog Backend: From RESTful APIs to Real-time Updates",
//             body: "Explore the backend magic behind successful blogs using Node.js. Learn to create RESTful APIs, implement CRUD operations, and take it a step further by adding real-time updates using technologies like WebSockets."
//         },
//     ])
// }
// insertPostData();


router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;

