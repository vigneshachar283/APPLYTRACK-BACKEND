const express = require("express");
const router = express.Router();

const { createApplication } =
    require("../controllers/createApplication");

const { authMiddleware } =
    require("../middleware/authMiddleware");
const {getApplications} =require("./../controllers/createApplication")
const {getApplicationsbyid} =require("./../controllers/createApplication")
const {updateApplication} =require("./../controllers/createApplication")
const {deleteApplication} =require("./../controllers/createApplication")

    

router.post("/apply", authMiddleware, createApplication);
router.get("/myapply", authMiddleware, getApplications);
router.get("/:id", authMiddleware, getApplicationsbyid);
router.patch("/:id", authMiddleware, updateApplication);
router.delete("/:id", authMiddleware, deleteApplication);


module.exports = router;