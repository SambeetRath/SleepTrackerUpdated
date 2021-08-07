const { createSleep, getSleep, updateSleep, deleteSleep } = require("./sleep_service");
const { verify } = require("jsonwebtoken");

module.exports = {
    createSleep: (req, res) => {
        const token = req.get("authorization");
        const decoded = verify(token.slice(7), process.env.SECURITY_KEY);
        const data = req.body;
        data.id = decoded.result.id;
        createSleep(data, (err, results) => {
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
    getSleep: (req, res) => {
        const token = req.get("authorization");
        const decoded = verify(token.slice(7), process.env.SECURITY_KEY);
        getSleep(decoded.result.id, (err, results) => {
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
    updateSleep: (req, res) => {
        const data = req.body;
        updateSleep(data, (err, results) => {
            if (err) {
                console.log(err);
                return false;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update"
                });
            } else {
                return res.json({
                    success: 1,
                    message: "updated successfully"
                });
            }
        });
    },
    deleteSleep: (req, res) => {
        const data = req.body;
        deleteSleep(data.id, (err, results) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Failed to delete"
                });
            } else {
                return res.json({
                    success: 1,
                    message: "successfully deleted"
                });
            }
        });
    },
};