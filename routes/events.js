const { Router } = require('express');
const router = Router();
const { check} = require('express-validator')

const { isDate } = require('../helpers/isDate')
const { fieldsValidator } = require('../middlewares/fieldsValidator')
const { validateJWT } = require('../middlewares/jwtValidator')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events')

//all request should validate JWT
router.use(validateJWT);


router.get('/', getEvents);

router.post('/',
    [
        check('title', 'title is required').not().isEmpty(),
        check('start', 'start date is required').custom( isDate),
        fieldsValidator

    ], createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;