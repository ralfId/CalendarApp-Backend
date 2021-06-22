/**
 *------ user routes / auth -----
 *      host+/api/auth
 * 
 */
const { Router } = require('express');
const router = Router();

const { registerUser, loginUser, revalidateToken } = require('../controllers/auth');


//  register user
router.post('/register', registerUser)
//  login user
router.post('/', loginUser)
//  renew token
router.get('/renew', revalidateToken)











module.exports = router;