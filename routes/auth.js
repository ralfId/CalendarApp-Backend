/**
 *------ user routes / auth -----
 *      host+/api/auth
 * 
 */
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { registerUser, loginUser, revalidateToken } = require('../controllers/auth');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { validateJWT} = require('../middlewares/jwtValidator')


//  register user
router.post('/register',
    [
        //middleware
        check('name', 'name is required').not().isEmpty().bail(),
        check('email', 'email is required').isEmail(),
        check('password', 'password should be have less than 6 characters').isLength({ min: 6 }),
        fieldsValidator
    ]
    , registerUser)
//  login user
router.post('/',
    [
        //midlewares
        check('password', 'password should be have less than 6 characters').isLength({ min: 6 }),
        check('email', 'email is required').not().isEmpty(),
        fieldsValidator
    ], loginUser)


//  renew token
router.get('/renew', validateJWT, revalidateToken)











module.exports = router;