const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            verify(token, process.env.SECURITY_KEY, (err, decoded) => {
                if(!err) {
                    next();
                } else {
                    res.json({
                        success: 0,
                        message: "Invalid Token"
                    });
                }
            });
        } else {
            res.json({
                success: 0,
                message: "Access denied! Unauthorized user"
            });
        }
    },
};