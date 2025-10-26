const express = require("express");
const controller = require("../controllers/user.controller");

const router = express.Router();

router.get("/", controller.findAll);
router.get("/:id", controller.findById);
router.post("/", controller.addUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;