const path = require("path");
const materi = require("../models/materiModel"); 
const { deleteFileIfExists } = require("../utils/fs");

function asPublicPath(fullPath) {
    if (!fullPath) return null;
    const idx = fullPath.lastIndexOf("uploads");
    return idx >= 0 ? "/" + fullPath.substring(idx).replace(/\\/g, "/") : null;
}

// =================== GET LIST ===================
exports.getList = async (req, res) => {
    try {
        const { id_course } = req.params;

        const data = await materi.getAllByCourse(id_course);

        const mapped = data.map((i) => ({
            ...i,
            file_materi: asPublicPath(i.file_materi),
        }));

        res.json(mapped);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// =================== GET DETAIL ===================
exports.getDetail = async (req, res) => {
    try {
        const row = await materi.getById(req.params.id_materi);
        if (!row) return res.status(404).json({ message: "Materi tidak ditemukan" });

        row.file_materi = asPublicPath(row.file_materi);

        res.json(row);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// =================== CREATE ===================
exports.create = async (req, res) => {
    try {
        const { id_course, judul_materi, content } = req.body;
        const fileAbsPath = req.file?.path || null;

        const payload = {
            id_course,
            judul_materi,
            content,
            file_materi: fileAbsPath,
        };

        const info = await materi.create(payload);

        res.status(201).json({
            message: "Materi berhasil ditambahkan",
            data: info
        });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// =================== UPDATE ===================
exports.update = async (req, res) => {
    try {
        const { id_materi } = req.params;
        const { id_course, judul_materi, content } = req.body;

        const old = await materi.getById(id_materi);
        if (!old) return res.status(404).json({ message: "Materi tidak ditemukan" });

        let fileMateri = old.file_materi;

        if (req.file) {
            const oldFilePath = path.join(process.cwd(), old.file_materi.replace(/^\//, ""));
            deleteFileIfExists(oldFilePath);

            fileMateri = req.file.path;
        }

        const payload = {
            id_course,
            judul_materi,
            content,
            file_materi: fileMateri,
        };

        const result = await materi.update(id_materi, payload);

        res.json({ message: "Materi berhasil diperbarui", data: result });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// =================== DELETE ===================
exports.remove = async (req, res) => {
    try {
        const { id_materi } = req.params;

        const old = await materi.getById(id_materi);

        if (old?.file_materi) {
            const abs = path.join(process.cwd(), old.file_materi.replace(/^\//, ""));
            deleteFileIfExists(abs);
        }

        await materi.remove(id_materi);

        res.json({ message: "Materi berhasil dihapus" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
