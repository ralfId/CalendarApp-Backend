const express = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const users = require('../models/users');
const { createJWT } = require('../helpers/jwt')

const loginUser = async (req, res = express.response) => {


    try {

        const { email, password } = req.body;

        const user = await users.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'email do not exist'
            })
        }

        //compare if passwor are similar
        let verifyPassword = bcrypt.compareSync(password, user.password)
        if (!verifyPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'password is not valid'
            })
        }

        //generate token
        const token = await createJWT(user.id, user.name);

        return res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Internal server error, contact with admin'
        })
    }
}

const registerUser = async (req, res = express.response) => {
    //CREATE A NEW USE
    try {

        const { email, password } = req.body;

        let newUser = await users.findOne({ email });

        if (newUser) {
            return res.status(400).json({
                ok: false,
                msg: 'email already exist'
            })
        }

        newUser = new users(req.body);

        //encrypt password using one line hash
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password, salt);

        await newUser.save();

        //generate token
        const token = await createJWT(newUser.id, newUser.name);


        res.status(201).json({
            ok: true,
            uid: newUser.id,
            name: newUser.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Internal server error, contact with admin'
        })
    }
}


const revalidateToken = async(req, res = express.response) => {

    const { uid, name } = req;
    const token = await createJWT(uid, name);
    
    res.json({
        ok: true,
        uid,
        name,
        token
    })
}







module.exports = {
    registerUser,
    loginUser,
    revalidateToken,

}