/**
 *        Event Routes
 *        api/events
 */

const express = require('express');
const Event = require('../models/events')

const getEvents = async (req, res = express.response) => {

    try {
        const events = await Event.find().populate('user', 'name');
        return res.json({
            ok: true,
            events,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'something is wrong, contact with admin'
        })
    }
}

const createEvent = async (req, res = express.response) => {

    const event = new Event(req.body);
    try {

        event.user = req.uid;

        const eventSave = await event.save();

        return res.json({
            ok: true,
            evento: eventSave,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            of: false,
            msg: "contact with admin"
        })
    }
}

const updateEvent = async (req, res = express.response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventId);
        console.log(event)
        if (!event) {
            return res.status(404).json({
                ok: true,
                msg: 'do not exist an event with id'
            })
        }


        if (event.user._id.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'you do not have permission to edit this event'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findOneAndUpdate(eventId, newEvent, { new: true });

        return res.json({
            ok: true,
            event: updatedEvent
        })

    } catch (error) {

        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "contact with admin"
        })
    }

}

const deleteEvent = async (req, res = express.response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'do not exist an event with id'
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'you do not have permission to edit this event'
            })
        }


        const updatedEvent = await Event.findByIdAndDelete();

        res.json({
            ok: true,
            msg: 'the event is deleted'
        })

    } catch (error) {

        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "contact with admin"
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}
