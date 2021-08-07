const { createSleep, getSleep, updateSleep, deleteSleep } = require("./sleep_controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createSleep);
router.get("/", checkToken, getSleep);
router.patch("/", checkToken, updateSleep);
router.delete("/", checkToken, deleteSleep);

module.exports = router;