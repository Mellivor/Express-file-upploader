const express = require('express');
const router = express.Router();
const { resendFetch, requestTester } = require('../controllers/postControllers');

router.post("/url", resendFetch);
router.post("/req", requestTester);

module.exports = router;
