const path = require("path");
const userQuiz = require("../models/userQuizModel");
const { deleteFileIfExists } = require("../utils/fs");

function asPublicPath(fullPath) {
    if (!fullPath) return null;
    const pos = fullPath.lastIndexOf("uploads");
    return pos >= 0 ? "/" + fullPath.substring(pos).replace(/\\/g, "/") : null;
}

// =================== SUBMIT QUIZ ===================
exports.submitQuiz = async (req, res) => {
    try {
        const { id_user, id_quiz } = req.body;
        const fileAbsPath = req.file?.path || null;

        const existing = await userQuiz.getByUserQuiz(id_user, id_quiz);

        // Jika pernah submit → update
        if (existing) {

            // Hapus file lama jika ada
            if (existing.jawaban_quiz) {
                const oldFile = path.join(process.cwd(), existing.jawaban_quiz.replace(/^\//, ""));
                deleteFileIfExists(oldFile);
            }

            const payload = {
                jawaban_quiz: fileAbsPath || existing.jawaban_quiz
                // score tidak diubah disini
            };

            const resUpdate = await userQuiz.update(id_user, id_quiz, payload);

            return res.json({
                message: "Jawaban quiz berhasil diperbarui",
                data: resUpdate,
            });
        }

        // Jika belum pernah submit → create
        const payload = {
            id_user,
            id_quiz,
            jawaban_quiz: fileAbsPath
        };

        const inserted = await userQuiz.create(payload);

        res.status(201).json({
            message: "Berhasil submit quiz",
            data: inserted,
        });

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};


// =================== GET HASIL QUIZ ===================
exports.getUserQuiz = async (req, res) => {
    try {
        const { id_user, id_quiz } = req.params;

        const row = await userQuiz.getByUserQuiz(id_user, id_quiz);
        if (!row) return res.status(404).json({ message: "Data quiz tidak ditemukan" });

        row.jawaban_quiz = asPublicPath(row.jawaban_quiz);

        res.json(row);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// =================== LIST ===================
exports.list = async (req, res) => {
    try {
        const data = await userQuiz.list();

        const mapped = data.map((i) => ({
            ...i,
            jawaban_quiz: asPublicPath(i.jawaban_quiz),
        }));

        res.json(mapped);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// =================== ADMIN UPDATE SCORE ===================
exports.updateScore = async (req, res) => {
    try {
        const { id_user, id_quiz } = req.params;
        const { score } = req.body;

        // Validasi angka
        if (score === undefined || score === null) {
            return res.status(400).json({ message: "Score wajib diisi" });
        }

        const exist = await userQuiz.getByUserQuiz(id_user, id_quiz);
        if (!exist) {
            return res.status(404).json({ message: "Data quiz tidak ditemukan" });
        }

        const updated = await userQuiz.updateScore(id_user, id_quiz, score);

        res.json({
            message: "Score berhasil diperbarui oleh admin",
            data: updated,
        });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
// Ambil jawaban quiz user
exports.getByUser = async (req, res) => {
    const { id_user } = req.params;

    try {
        const [rows] = await db.query(
            "SELECT id_quiz, jawaban_quiz FROM user_quiz WHERE id_user = ?",
            [id_user]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

