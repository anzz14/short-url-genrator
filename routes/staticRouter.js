const express = require('express');
const router = express.Router();
const URL = require("../models/url");

router.get('/', async (req, res) => {
    const allurls = await URL.find({}); // ✅ always fetch all URLs
    const id = req.query.id || null; // ✅ get id if available (optional)
    return res.render('home', {
        urls: allurls,  // ✅ array passed
        id              // ✅ optional
    });
});

module.exports = router;
