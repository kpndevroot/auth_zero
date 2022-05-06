import express from "express";
import { indexControll, testController } from "../controller/indexcontroller";
var router = express.Router();

router.get("/", indexControll);
router.get("/test", testController);

export default router;
