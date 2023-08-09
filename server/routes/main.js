const express = require('express');
const router = express.Router();

router.get('', (req, res) => {
    const locals = {
        title: "NodeJS Blog",
        description: "This is Blog make by NodeJS - Tran Manh Dat"
    }



    res.render('index', {locals});
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;

