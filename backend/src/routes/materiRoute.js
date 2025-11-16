const express = require("express");
const router = express.Router();
const materiController = require("../controllers/materiController");
const upload = require("../middleware/uploadfile");

// GET
router.get("/:id_course", materiController.getList);
router.get("/detail/:id_materi", materiController.getDetail);

// CREATE
router.post("/", upload.single("file_materi"), materiController.create);

// UPDATE
router.put("/:id_materi", upload.single("file_materi"), materiController.update);

// DELETE
router.delete("/:id_materi", materiController.remove);

module.exports = router;
