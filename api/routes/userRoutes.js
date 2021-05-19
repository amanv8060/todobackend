const router = require("express").Router();
const { authJwt } = require("../middlewares");
const controller = require("../controllers/userController");

router.put("/auth/user/signup", controller.createUser);
router.post("/auth/user/signin", controller.userSignin);
router.get("/auth/user/exists", controller.checkLoginId);

module.exports = router;
