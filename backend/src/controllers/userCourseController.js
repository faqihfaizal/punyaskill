const userCourse = require('../models/userCourseModel');

exports.getList = async (req, res) => {
    try {
        const [rows] = await userCourse.list();
        res.json(rows);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

exports.getByUser = async (req, res) => {
    try {
        const { id_user } = req.params;
        const [rows] = await userCourse.listByUser(id_user);

        res.json(rows);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { id_user, id_course } = req.body;

        const payload = {
            id_user,
            id_course,
            progress: 0
        };

        const [info] = await userCourse.insert(payload);

        res.status(201).json({
            message: "Berhasil mendaftar course",
            id: info.insertId
        });

    } catch (e) {
        if (e.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'User sudah terdaftar di course ini' });
        }
        res.status(500).json({ message: e.message });
    }
};

exports.updateProgress = async (req, res) => {
    try {
        const { id } = req.params;
        const { progress } = req.body;

        await userCourse.updateProgress(id, progress);

        res.json({ message: 'Progress berhasil diperbarui' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const { id } = req.params;

        await userCourse.remove(id);

        res.json({ message: 'Enroll berhasil dihapus' });

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
