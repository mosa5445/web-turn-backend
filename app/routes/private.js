const router = require("express").Router();

/**
 * controllers
 */
// ------------------------------------ //
const sendNotifToUser = require("../controllers/notif.controler");
const getUsersList = require("../controllers/users.controler");
const updateStatistics = require("../controllers/updateStatistics");
// ------------------------------------ //

/**
  middlewares
 */
// ------------------------------------ //
/*            No MiddleWare            */
// ------------------------------------ //

router.post("/notif", sendNotifToUser.handle);
router.get("/users", getUsersList.handle);
router.get("/update", updateStatistics.handle);

module.exports = router;
