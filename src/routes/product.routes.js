const express = require("express");
const controller = require("../controllers/product.controller");

const router = express.Router();

router.get("/", controller.findAll);
router.get("/:id", controller.findById);
router.post("/", controller.addProduct);
router.put("/:id", controller.updateProduct);
router.delete("/:id", controller.deleteProduct);

module.exports = router;
