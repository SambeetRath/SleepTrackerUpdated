const pool = require("../../config/database");

module.exports = {
    createSleep: (data, callback) => {
        pool.query(
            "INSERT INTO sleep(userId, sleepDate, sleepTime, wakeTime) VALUES(?,?,?,?)",
            [
                data.id,
                data.sleepDate,
                data.sleepTime,
                data.wakeTime
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, results);
                }
            }
        );
    },
    getSleep: (id, callback) => {

        pool.query(
            "SELECT id, userId, sleepDate, sleepTime, wakeTime, TIMESTAMPDIFF(SECOND, sleepTime, wakeTime) AS sleepDuration from sleep where userId=?",
            [id],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, results);
                }
            }
        );
    },
    updateSleep: (data, callback) => {
        pool.query(
            `UPDATE sleep SET sleepDate=?, sleepTime=?, wakeTime=? WHERE id=?`,
            [
                data.sleepDate,
                data.sleepTime,
                data.wakeTime,
                data.id
            ],
            (err, results, fields) => {
                if (err) {
                    callback(err);
                } else {
                    return callback(null, results);
                }
            }
        );
    },
    deleteSleep: (id, callback) => {
        pool.query(
            "DELETE FROM sleep WHERE id=?",
            [id],
            (err, results, fields) => {
                if (results.affectedRows === 0) {
                    let er = new Error();
                    return callback(er, null);
                } else {
                    return callback(null, results);
                }
            }
        );
    },
};