const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const courseController = require("../controllers/courseController");

router.get("/", courseController.getList);
router.get("/:slug", courseController.getDetail);
router.post("/", upload.single("thumbnail"), courseController.create);
router.put("/:slug", upload.single("thumbnail"), courseController.update);
router.delete("/:slug", courseController.remove);

module.exports = router;
