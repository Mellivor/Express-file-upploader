const express = require('express');
const router = express.Router();

const { resend,
    response
} = require('../controllers/postsControllers');

router.get("/url", response);

router.post("/url", resend);

// router.delete("/posts", deletePost);

// router.delete("/comment/", deleteComent);

// router.patch("/posts/", updatePost);

// router.post("/comment/", createComment);


module.exports = router;
