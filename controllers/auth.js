const express = require('express');


const loginUser = (req, res = express.response) => {

    const { name, email, password } = req.body;

    if (name.length < 5) {

        return res.status(400).json(
            {
                ok: false,
                msg: 'fiel name shoul be more than 5 characters'
            }
        )
    }

    return res.json({
        ok: true,
        msg: 'POST login user',
        name,
        email,
        password
    })
}

const registerUser = (req, res = express.response) => {

    res.json({
        ok: true,
        msg: 'POST register user'
    })
}


const revalidateToken = (req, res = express.response) => {

    res.json({
        ok: true,
        msg: 'GET renew token'
    })
}








module.exports = {
    registerUser,
    loginUser,
    revalidateToken,

}