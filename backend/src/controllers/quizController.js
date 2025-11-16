const path = require("path");
const quiz = require("../models/quizModel");
const { deleteFileIfExists } = require("../utils/fs");

function asPublicPath(fullPath) {
    if (!fullPath) return null;
    const idx = fullPath.lastIndexOf("uploads");
    return idx >= 0 ? "/" + fullPath.substring(idx).replace(/\\/g, "/") : null;
}

// ======================== GET LIST QUIZ ========================
exports.getList = async (req, res) => {
    try {
        const { id_materi } = req.params;
        const rows = await quiz.getAllByMateri(id_materi);

        const mapped = rows.map(q => ({
            ...q,
            soal_quiz: asPublicPath(q.soal_quiz),
        }));

        res.json(mapped);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// ======================== GET DETAIL ========================
exports.getDetail = async (req, res) => {
    try {
        const row = await quiz.getById(req.params.id_quiz);
        if (!row) return res.status(404).json({ message: "Quiz tidak ditemukan" });

        row.soal_quiz = asPublicPath(row.soal_quiz);

        res.json(row);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// ======================== CREATE ========================
exports.create = async (req, res) => {
    try {
        const { id_materi, title } = req.body;
        const filePath = req.file?.path || null;

        const payload = {
            id_materi,
            title,
            soal_quiz: filePath,
        };

        const result = await quiz.create(payload);

        res.status(201).json({
            message: "Quiz berhasil ditambahkan",
            data: result,
        });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// ======================== UPDATE ========================
exports.update = async (req, res) => {
    try {
        const { id_quiz } = req.params;
        const { id_materi, title } = req.body;

        const old = await quiz.getById(id_quiz);
        if (!old) return res.status(404).json({ message: "Quiz tidak ditemukan" });

        let soalFile = old.soal_quiz;

        // jika ada upload file baru
        if (req.file) {
            const oldPath = path.join(process.cwd(), old.soal_quiz.replace(/^\//, ""));
            deleteFileIfExists(oldPath);
            soalFile = req.file.path;
        }

        const payload = {
            id_materi,
            title,
            soal_quiz: soalFile,
        };

        await quiz.update(id_quiz, payload);

        res.json({ message: "Quiz berhasil diperbarui" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// ======================== DELETE ========================
exports.remove = async (req, res) => {
    try {
        const { id_quiz } = req.params;

        const old = await quiz.getById(id_quiz);

        if (old?.soal_quiz) {
            const abs = path.join(process.cwd(), old.soal_quiz.replace(/^\//, ""));
            deleteFileIfExists(abs);
        }

        await quiz.remove(id_quiz);

        res.json({ message: "Quiz berhasil dihapus" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
