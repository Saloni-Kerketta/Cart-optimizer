const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: "User route working"
    });
});

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;

// const express = require('express');
// const router = express.Router();

// const {
//   registerUser,
//   loginUser
// } = require('../controllers/userController');

// console.log("userRoutes loaded");

// router.get('/test', (req, res) => {
//   res.json({
//     success: true,
//     message: "User route working"
//   });
// });

// router.post('/register', registerUser);
// router.post('/login', loginUser);

// module.exports = router;