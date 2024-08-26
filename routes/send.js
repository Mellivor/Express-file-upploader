const express = require('express');
const router = express.Router();

const {
    resend,
    response
} = require('../controllers/postControllers');

router.get("/url", response);

router.post("/url", resend);

module.exports = router;
