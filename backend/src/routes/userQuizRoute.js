const express = require("express");
const router = express.Router();
const userQuizController = require("../controllers/userQuizController");
const upload = require("../middleware/uploadfile"); // pastikan sudah ada

// POST /submit (upload file + insert/update)
router.post(
    "/submit",
    upload.single("jawaban_quiz"),
    userQuizController.submitQuiz
);

// GET hasil quiz user
router.get("/:id_user/:id_quiz", userQuizController.getUserQuiz);

// LIST all user quiz
router.get("/", userQuizController.list);

// ADMIN: Update score user
router.put(
    "/score/:id_user/:id_quiz",
    userQuizController.updateScore
);
router.get("/by-user/:id_user", userQuizController.getByUser);



module.exports = router;
