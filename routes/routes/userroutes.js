import express from "express";
var router = express.Router();

import * as userRoute from "../controller/usercontroller";
import verify from "../controller/verifytoken";

router.post("/create/snkae", userRoute.createUser);
router.post("/snake", verify, userRoute.getUsers);
router.post("/login/snake", userRoute.login);


export default router;
