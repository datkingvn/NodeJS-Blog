const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');


const adminLayout = '../views/layouts/admin'
// GET Admin - Login Page
router.get('/admin', async (req, res) => {
    const locals = {
        title: "Admin",
        description: "This is Blog make by NodeJS - Tran Manh Dat"
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

        if (req.body.username === 'admin' && req.body.password === 'password') {
            res.send('You are logged in')
        } else {
            res.send('Wrong Username or Password')
        }



    } catch (e) {
        console.log(e)
    }
});



module.exports = router;