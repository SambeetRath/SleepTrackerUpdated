const { signUp, getUsers, getUserById, login } = require("./user_controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", signUp);
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserById);
router.post("/login", login);

module.exports = router;