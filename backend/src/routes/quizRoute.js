const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const upload = require("../middleware/uploadfile"); // khusus FILE

// LIST per materi
router.get("/:id_materi", quizController.getList);

// DETAIL
router.get("/detail/:id_quiz", quizController.getDetail);

// CREATE (file upload)
router.post("/", upload.single("soal_quiz"), quizController.create);

// UPDATE
router.put("/:id_quiz", upload.single("soal_quiz"), quizController.update);

// DELETE
router.delete("/:id_quiz", quizController.remove);

module.exports = router;
