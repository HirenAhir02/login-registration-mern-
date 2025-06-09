const  express = require('express'); 
const router = express.Router();

const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const { signup , login} = require('../Controllers/Authcontroller');



router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);


module.exports= router;