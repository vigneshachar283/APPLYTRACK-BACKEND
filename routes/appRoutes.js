const express = require("express");
const router = express.Router();

const { createApplication } =
    require("../controllers/createApplication");

const {authMiddleware} =
    require("../middleware/authMiddleware");
const {getApplications} =require("./../controllers/createApplication")
    

router.post("/apply", authMiddleware, createApplication);
router.post("/myapply", authMiddleware, getApplications);

module.exports = router;