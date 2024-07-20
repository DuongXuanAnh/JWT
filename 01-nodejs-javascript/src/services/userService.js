require('dotenv').config();
const User = require("../models/user");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {

        // hash user password
        const hashPassword = await bcrypt.hash(password, saltRounds);
        // save user to database
        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: "user"
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const loginService = async (email, password) => {
    try {

        // fetch user by email
        const user = await User.findOne({ email: email });

        if(user){
            // compare password
            const match = await bcrypt.compare(password, user.password);
            if(match){
                // Create access token
                const payload = {
                    email: user.email,
                    name: user.name,
                }

                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: process.env.ACCESS_TOKEN_LIFE
                });

                return {
                    accessToken,
                    user: {
                        email: user.email,
                        name: user.name
                    }
                };
            }else{
                return {
                    EC: 2,
                    EM: "Email and password not match"
                }
            }

        }else{
            return{
                EC: 1,
                EM: "Email and password not match"
            } 
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}





module.exports = {
    createUserService, loginService
}