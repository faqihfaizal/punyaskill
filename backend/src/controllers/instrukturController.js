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
    const { nama_instruktur, deskripsi_instruktur, bidang_instruktur } = req.body;

    // Ambil data lama dari model
    const oldData = await instruktur.detail(id_instruktur);
    if (!oldData) {
      return res.status(404).json({ message: "Instruktur tidak ditemukan" });
    }

    // Default: pakai foto lama
    let fotoInstruktur = oldData.foto_instruktur;

    // Kalau ada file baru, hapus lama dan update
    if (req.file) {
      // hapus file lama (kalau ada)
      if (oldData.foto_instruktur) {
        const oldPath = path.join(process.cwd(), oldData.foto_instruktur.replace(/^\//, ""));
        deleteFileIfExists(oldPath);
      }
      fotoInstruktur = asPublicPath(req.file.path);
    }

    // Buat payload baru
    const payload = {
      nama_instruktur,
      deskripsi_instruktur,
      bidang_instruktur,
      foto_instruktur: fotoInstruktur
    };

    // Update ke DB
    const result = await instruktur.update(id_instruktur, payload);

    res.json({
      message: "Instruktur berhasil diperbarui",
      data: result
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal memperbarui instruktur" });
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


