const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt'); // Thư viện được sử dụng để mã hóa và so sánh Password
const jwt = require('jsonwebtoken') // Thư viện để tạo và xác minh JSON Web Tokens (JWT)

const adminLayout = '../views/layouts/admin';
const jwtSecret = process.env.JWT_SECRET;


// Admin - Check Login
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({message: 'Unauthorized'})
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) // Xác minh tinhs hợp lệ của JWT và giải mã nó
        req.userId = decoded.userId; // Trích xuất thông tin người dùng từ JWT đã giải mã và lưu nó vào thuộc tính userId của đối tượng yêu cầu (req)
        next();
    } catch (e) {
        return res.status(401).json({message: 'Unauthorized'})
    }
}


// GET Admin - Login Page
router.get('/admin', async (req, res) => {
    const locals = {
        title: "Admin", description: "This is Blog make by NodeJS - Tran Manh Dat"
    }

    try {
        res.render('admin/index', {locals, layout: adminLayout})
    } catch (e) {
        console.log(e)
    }
});

// POST Admin - Check Login
router.post('/admin', async (req, res) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({username});

        if (!user) {
            return res.status(401).json({message: 'Invalid Credentials'})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({message: 'Invalid Credentials'})
        }

        const token = jwt.sign({userId: user._id}, jwtSecret)
        res.cookie('token', token, {httpOnly: true})

        res.redirect('/dashboard')

    } catch (e) {
        console.log(e)
    }
});

// GET Admin Dashboard
router.get('/dashboard', authMiddleware, async (req, res) => {

    try {
        const locals = {
            title: "Dashboard Admin", description: "This is Blog make by NodeJS - Tran Manh Dat"
        }

        const data = await Post.find();
        res.render('admin/dashboard', {locals, data});
    } catch (e) {
        console.log(e)
    }
});

// GET Admin - Create New Post
router.get('/add-post', authMiddleware, async (req, res) => {

    try {
        const locals = {
            title: "Add Post - Dashboard Admin", description: "This is Blog make by NodeJS - Tran Manh Dat"
        }

        const data = await Post.find();
        res.render('admin/add-post', {locals, layout: adminLayout});
    } catch (e) {
        console.log(e)
    }
});

// POST Admin - Create New Post
router.post('/add-post', authMiddleware, async (req, res) => {

    try {
        console.log(req.body)

        try {
            const newPost = new Post({
                title: req.body.title, body: req.body.body
            });
            await Post.create(newPost);
            res.redirect('/dashboard')
        } catch (e) {
            console.log(e);
        }

    } catch (e) {
        console.log(e)
    }
});

// POST Admin - Register
router.post('/register', async (req, res) => {
    try {
        const {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({
                username, password: hashedPassword
            })
            res.status(201).json({message: 'User Created', user})
        } catch (e) {
            if (e.code === 11000) {
                res.status(409).json({message: 'User already in use'})
            }
            res.status(500).json({message: 'Internal Server Error'})
        }

    } catch (e) {
        console.log(e)
    }
});


module.exports = router;