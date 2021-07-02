/**
 *        Event Routes
 *        api/events
 */

const express = require('express');

const getEvents = (req, res = express.response) => {
    return res.json({
        ok: true,
        msg: 'get all events'
    })
}

const createEvent = (req, res = express.response) => {

    console.log(req.body)
    
    return res.json({
        ok: true,
        msg: 'create an event'
    })
}

const updateEvent = (req, res = express.response) => {
    return res.json({
        ok: true,
        msg: 'update an event'
    })
}

const deleteEvent = (req, res = express.response) => {
    return res.json({
        ok: true,
        msg: 'delete an event'
    })
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}
