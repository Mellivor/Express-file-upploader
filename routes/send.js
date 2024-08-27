const express = require('express');
const router = express.Router();

const {
    resend,
    response,
    resendFetch
} = require('../controllers/postControllers');

router.get("/url", response);

router.post("/urlf", resendFetch);

router.post("/url", resend);

module.exports = router;
