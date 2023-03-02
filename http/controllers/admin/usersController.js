const express = require("express");
const Models = require("../../../database/models");

async function getAllUsers(req, res) {
    let user = await Models.User.find({}).select(["-password", "-token"])
    if (Object.keys(user).length) (
        res.send({
            status: 200,
            user
        })
    )
    else {
        res.send({
            status: 300,
            message: "No record found"
        })
    }
}

async function registerUser(req, res) {

    try {
        let { full_name, user_name, email, password, role } = req.body
        let document = {
            full_name,
            username: user_name,
            email,
            password, 
            role
        }
        let user = await Models.User(document).save();

        if (user && user._id) {
            res.send({
                status: 200,
                message: "User Created Successfully!",
                user
            });
        } else {
            res.send({
                status: 300,
                message: "Failed to create user, Please try again"
            });
        }
    } catch (error) {
        console.log(error);
        res.send({
            status: 400,
            message: "An Unknow error occured",
            error
        })
    }

}

async function getSpecificUser(req, res) {
    try {
        let { username } = req.params;
        let user = await Models.User.findOne({ username: username }).select("-password");
        if (user && user._id) {
            res.send({
                status: 200,
                user
            })
        } else {
            res.send({
                status: 300,
                message: "No User Found"
            });
        }

    } catch (error) {
        console.log(error);
        res.send({
            status: 400,
            message: "An Unknown Error Occured!",
            error
        })
    }
}

async function updateUser(req, res) {
    try {
        let { full_name, email, id, username, role } = req.body;
        let user = await Models.User.findOneAndUpdate({ _id: id }, { $set: { full_name: full_name, email: email, username: username, role: role } })
        if (user && user._id) {
            let userAfterUpdate = await Models.User.findOne({ _id: id })
            res.send({
                status: 200,
                message: "User Updated Successfully",
                userAfterUpdate
            })
        } else {
            res.send({
                status: 300,
                message: "User Not Found"
            });
        }
    } catch (error) {
        console.log(error);
        res.send({
            status: 400,
            message: "An Unknown Error Occured!",
            error
        })
    }
}
async function deleteUser(req, res) {
    try {

        let { id } = req.body;
        let user = await Models.User.deleteOne({ _id: id });
        if (user.deletedCount > 0) {
            res.send({
                status: 200,
                message: "User Deleted Successfully",
            })
        } else {
            res.send({
                status: 300,
                message: "User Not Found"
            });
        }


    } catch (error) {
        console.log(error);
        res.send({
            status: 400,
            message: "An Unknown Error Occured!",
            error
        })
    }
}


module.exports = {
    getAllUsers,
    registerUser,
    getSpecificUser,
    updateUser,
    deleteUser
}

