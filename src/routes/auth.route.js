const {Router} = require("express");

const { loginController, registerController } = require("../controllers/auth.controller");

const router = Router();

const route = "/auth";

router.post(`${route}/login`, loginController);
router.post(`${route}/register`, registerController);

module.exports = router;