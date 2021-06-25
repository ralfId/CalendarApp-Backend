const express = require('express');
const { validationResult } = require('express-validator');
const users = require('../models/users');

const loginUser = (req, res = express.response) => {


    return res.status(200).json({
        ok: true,
        msg: 'POST login user'
    })
}

const registerUser = async(req, res = express.response) => {
        //CREATE A NEW USE
   try {
       
     // const { name, email, password } = req.body;
     const newUser = new users(req.body);
     await newUser.save();


     res.status(201).json({
         ok: true,
         msg: 'POST registered user'
     })

   } catch (error) {
       console.log(error)
       res.status(500).json({
           ok: false,
           msg: 'Internal server error, contact with admin'
       })
   }
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