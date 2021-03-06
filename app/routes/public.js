const router = require("express").Router();

/**
 * controllers
 */
// ------------------------------------ //
const registerControler = require("../controllers/register.controler");
const loginControler = require("../controllers/login.controller");
// ------------------------------------ //

/**
  middlewares
 */
// ------------------------------------ //
/*            No MiddleWare            */
// ------------------------------------ //

router.post("/register", registerControler.handle);
router.post("/login", loginControler.handle);

module.exports = router;
