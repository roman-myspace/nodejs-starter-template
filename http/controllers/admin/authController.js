const express = require("express");
      md5 = require('md5');
      jwt = require("jsonwebtoken");

const Models = require("../../../database/models");


async function registerAdmin(req, res) {
    try {        
        let { full_name, username, email, password, role  } = req.body;
        let newAdminData = {
            full_name, 
            username, 
            email, 
            role,
            password: md5(password)            
        }
        let admin = await Models.User(newAdminData).save();
        if(admin && admin._id) {
            res.send({
                status: 200, 
                message: "New Admin Created Successfully"
            });
        } else {
            res.send({
                status: 300, 
                message: "Failed to Create new Admin"
            });
        }
    } catch (error) {
        res.send({
            status: 400, 
            message: "Unknown Error Occured", 
            error
        })
    }
}

async function signinAdmin(req, res) {
    try {        
        let { email, password } = req.body;
        if(!email && !password){
            res.send({ 
                status: 400, 
                message: "Incorrect Email OR Password"
            });
        }        
        let admin = await Models.User.findOne({
            email: email.toLowerCase().trim(),
            password: md5(password)
        });
        if(admin && admin._id) {
            // console.log("admin data==>> ", admin);
            let jwt_secret = process.env.JWT_SECRET;

            const jwt_token = jwt.sign(
              { user_id: admin._id, email: admin.email },
              jwt_secret,
              {
                expiresIn: '1m',  // values in numberic behave as miliseconds othervise use '1d', '1h' etc
              }
            );
            admin.token = jwt_token;
            await admin.save();
            
            res.send({
                status: 200, 
                message: "User Login Successfully", 
                user: admin 
            });
           
        } else {
            res.send({
                status: 300, 
                message: "failed to login, please try again with correct info"
            })
        }


    } catch (error) {
        // console.log(error)
        res.send({
            status: 400, 
            message: "Unknown Error Occured", 
            error
        })
    }
}


module.exports = {
    registerAdmin,
    signinAdmin
}