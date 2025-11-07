const path = require('path');
const { deleteFiles, deleteFileIfExists} = require('../utils/fs');
const instruktur = require('../models/instrukturModel');

function asPublicPath(fullPath) {
    if (!fullPath) return null;
    const idx = fullPath.lastIndexOf('uploads');
    return idx >= 0 ? '/' + fullPath.substring(idx).replace(/\\/g, '/') : null;
}

exports.getList = async (req, res) => {
    try {
        const data = await instruktur.list();
        res.json(data);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

exports.getDetail = async (req, res) => {
    try {
        const row = await instruktur.detail(req.params.id_instruktur);
        if (!row) return res.status(404).json({ message: 'Data tidak ditemukan' });
        res.json(row);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

exports.create = async (req, res) => {
    try {
        const body = req.body;
        const fotoAbs = req.file?.path || null;

        const payload = {
            nama_instruktur: body.nama_instruktur,
            deskripsi_instruktur: body.deskripsi_instruktur,
            bidang_instruktur: body.bidang_instruktur,
            foto_instruktur: asPublicPath(fotoAbs)
        };

        const info = await instruktur.insert(payload);
        res.status(201).json({ message: 'Berhasil menambahkan', ...info });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id_instruktur } = req.params;
        const before = await instruktur.detail(id_instruktur);
        if (!before) return res.status(404).json({ message: 'Data tidak ditemukan' });

        const body = req.body;
        const fotoAbs = req.file?.path || null;
        const newPublic = asPublicPath(fotoAbs);

        const payload = {
            nama_instruktur: body.nama_instruktur,
            deskripsi_instruktur: body.deskripsi_instruktur || null,
            bidang_instruktur: body.bidang_instruktur || null,
            foto_instruktur: newPublic || ''
        };

        const info = await instruktur.update(id_instruktur, payload);

        // Jika ada foto baru, hapus foto lama dari penyimpanan
        if (newPublic && before.foto) {
            const oldAbs = path.join(process.cwd(), before.foto.replace(/\\/g, '/'));
            deleteFileIfExists(oldAbs);
        }

        res.json({ message: 'Berhasil memperbarui', ...info });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const { id_instruktur } = req.params;
        const info = await instruktur.remove(id_instruktur);

        if (info && info.foto) {
            const abs = path.join(process.cwd(), 'uploads', info.foto.replace(/\\/g, '/'));
            // hapus file jika perlu, misal: fs.unlinkSync(abs);
        }

        res.json({ message: 'Berhasil menghapus', ...info });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};


