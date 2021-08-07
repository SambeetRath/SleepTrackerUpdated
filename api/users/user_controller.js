const { create, getUsers, getUserById, getUserByEmail } = require("./user_service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    signUp: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            } else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(500).json({
                    success: 0,
                    message: "Record not found"
                });
            } else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            } else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            } else {
                const result = compareSync(body.password, results.password);
                if (result) {
                    result.password = undefined;
                    const jsontoken = sign({ result: results }, process.env.SECURITY_KEY, {
                        expiresIn: "1h"
                    });
                    return res.json({
                        success: 1,
                        message: "login successfull",
                        token: jsontoken
                    });
                } else {
                    return res.json({
                        success: 0,
                        message: "Invalid email or password"
                    })
                }
            }
        });
    },
};