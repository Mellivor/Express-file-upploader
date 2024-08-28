const express = require('express');
const router = express.Router();
const resendFetch = require('../controllers/postControllers');

router.post("/url", resendFetch);

module.exports = router;
