const express = require('express');
const router = express.Router();
const URL = require("../models/url");
const { restrictTo } = require('../middleware/auth');

 router.get('/', restrictTo(['NORMAL', "ADMIN"]), async (req, res) => {
    const allurls = await URL.find({createdBy: req.user._id }); // ✅ always fetch all URLs
    const id = req.query.id || null; // ✅ get id if available (optional)
    return res.render('home', {
        urls: allurls,  // ✅ array passed
        id              // ✅ optional
     });
});

router.get('/admin/urls',restrictTo(['ADMIN']),async (req, res) => {
    const allurls = await URL.find({}); // ✅ always fetch all URLs
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
