const express = require("express");
const jwt = require("jsonwebtoken");
const Models = require("../../database/models");

async function adminAuthMiddleware(req, res, next){
    try {
        let { authorization } = req.headers;
        if(authorization) {
            let jwt_secret = process.env.JWT_SECRET;
            jwt.verify(authorization, jwt_secret, async (error, decoded) => {
                // console.log(error);
                if(decoded) {
                    let { user_id, email, exp }  = decoded;                     
                    let user = await Models.User.findOne({ _id: user_id });
                    if(user && user._id) {
                        next();
                    } else {
                        res.send({
                            status: 498, 
                            message: "Invalid Token"
                        });
                    }  
                } else {
                    if(error.name=="TokenExpiredError") {
                        res.send({
                            status: 401, 
                            message: "Your Session has been Expired"
                        });
                    } else {
                        res.send({
                            status: 498, 
                            message: "Invalid Token"
                        });
                    }
                }

            });

        } else {
            res.send({
                status: 411, 
                message: "Auth token is missing"
            });
        }
    } catch (error) {
        console.log(error);
        res.send({
            status: 400, 
            message: "Unknown Error Occured", 
            error
        })
    }
}


module.exports = {
    adminAuthMiddleware
}