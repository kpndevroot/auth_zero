var express = require("express");
var router = express.Router();
// importing routes
import indexRoute from "./routes/indexroute";
import userRoute from "./routes/userroutes";
router.use("/", indexRoute);
router.use("/user", userRoute);

export default router;
