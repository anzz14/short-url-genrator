const express = require('express');
const router = express.Router();
const URL = require("../models/url");

 router.get('/', async (req, res) => {
    if (!req.user) return res.redirect("/login");
    const allurls = await URL.find({createdBy: req.user._id }); // ✅ always fetch all URLs
    const id = req.query.id || null; // ✅ get id if available (optional)
    return res.render('home', {
        urls: allurls,  // ✅ array passed
        id              // ✅ optional
     });
});

router.get('/signup', async(req, res)=>{
     return res.render('signup');
})

router.get('/login', async(req, res)=>{
     return res.render('login');
})


module.exports = router;
