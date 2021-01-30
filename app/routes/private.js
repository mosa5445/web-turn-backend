const router = require("express").Router();

/**
 * controllers
 */
// ------------------------------------ //
const sendNotifToUser = require("../controllers/notif.controler");
const getUsersList = require("../controllers/users.controler");
// ------------------------------------ //

/**
  middlewares
 */
// ------------------------------------ //
/*            No MiddleWare            */
// ------------------------------------ //

router.post("/notif", sendNotifToUser.handle);
router.get("/users", getUsersList.handle);

module.exports = router;
