const  express = require('express'); 
const ensureAuthenticated = require('../Middlewares/Auth');
const router = express.Router();

router.get('/',ensureAuthenticated, (req,res) => {
    console.log('-------logged in user details---',req.user);
    res.status(200)
        .json([
            {
             name:"Mobile",
             price: 35000
            },
             {
             name:"Tv",
             price: 85000
            },
        ])
});

module.exports = router;