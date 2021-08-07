const pool = require("../../config/database");

module.exports = {
    create: (data, callback) => {
        pool.query(
            "INSERT INTO user(firstName, lastName, email, password) VALUES(?,?,?,?)",
            [
                data.firstName,
                data.lastName,
                data.email,
                data.password
            ],
            (err, results, fields) => {
                if(err) {
                    return callback(err);
                } else {
                    return callback(null, results);
                }
            }
        );
    },
    getUsers: (callback) => {
        pool.query(
            "SELECT * from user",
            [],
            (err, results, fields) => {
                if(err) {
                    return callback(err);
                } else {
                    return callback(null, results);
                }
            }
        );
    },
    getUserById: (id, callback) => {
        pool.query(
            `SELECT * from user WHERE id=?`,
            [id],
            (err, results, fields) => {
                if(err) {
                    return callback(err);
                } else {
                    return callback(null, results[0]);
                }
            }
        );
    },
    getUserByEmail: (email, callback) => {
        pool.query(
            `SELECT * from user WHERE email=?`,
            [email],
            (err, results, fields) => {
                if(err) {
                    callback(err);
                } else {
                    return callback(null, results[0]);
                }
            }
        );
    },
};