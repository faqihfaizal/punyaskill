const path = require("path");
const { deleteFileIfExists } = require("../utils/fs");
const Course = require("../models/courseModel");

function asPublicPath(fullPath) {
  if (!fullPath) return null;
  const idx = fullPath.lastIndexOf("uploads");
  return idx >= 0 ? "/" + fullPath.substring(idx).replace(/\\/g, "/") : null;
}

// ==========================
// GET ALL COURSES
// ==========================
exports.getList = async (req, res) => {
  try {
    const courses = await Course.list();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==========================
// GET DETAIL BY SLUG
// ==========================
exports.getDetail = async (req, res) => {
  try {
    const slug = req.params.slug;
    const data = await Course.detail(slug);

    if (!data)
      return res.status(404).json({ message: "Course tidak ditemukan" });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==========================
// CREATE COURSE
// ==========================
exports.create = async (req, res) => {
  try {
    const body = req.body;
    const thumbnailAbs = req.file?.path || null;

    const payload = {
      id_instruktur: body.id_instruktur,
      judul_course: body.judul_course,
      slug: body.slug,
      thumbnail: asPublicPath(thumbnailAbs),
      deskripsi_course: body.deskripsi_course,
      durasi_course: body.durasi_course,
      skill_level: body.skill_level,
      last_update: body.last_update,
    };

    const info = await Course.insert(payload);

    res.status(201).json({
      message: "Course berhasil dibuat",
      ...info,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==========================
// UPDATE COURSE BY SLUG
// ==========================
exports.update = async (req, res) => {
  try {
    const slug = req.params.slug;
    const body = req.body;

    // Ambil data lama
    const oldData = await Course.detail(slug);
    if (!oldData)
      return res.status(404).json({ message: "Course tidak ditemukan" });

    // Default pakai thumbnail lama
    let thumbnail = oldData.thumbnail;

    // Jika upload file baru
    if (req.file) {
      if (oldData.thumbnail) {
        const oldPath = path.join(
          process.cwd(),
          oldData.thumbnail.replace(/^\//, "")
        );
        deleteFileIfExists(oldPath);
      }

      thumbnail = asPublicPath(req.file.path);
    }

    // Payload update
    const payload = {
      id_instruktur: body.id_instruktur,
      judul_course: body.judul_course,
      slug: body.slug_new || body.slug,
      thumbnail,
      deskripsi_course: body.deskripsi_course,
      durasi_course: body.durasi_course,
      skill_level: body.skill_level,
      last_update: body.last_update,
    };

    const info = await Course.update(slug, payload);

    res.json({
      message: "Course berhasil diperbarui",
      ...info,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal memperbarui course" });
  }
};

// ==========================
// HAPUS COURSE
// ==========================
exports.remove = async (req, res) => {
  try {
    const slug = req.params.slug;

    const info = await Course.remove(slug);

    if (!info) {
      return res
        .status(404)
        .json({ message: "Course tidak ditemukan atau gagal dihapus" });
    }

    // Hapus file thumbnail jika ada
    if (info.thumbnail) {
      const abs = path.join(process.cwd(), info.thumbnail.replace(/^\//, ""));
      deleteFileIfExists(abs);
    }

    res.json({ message: "Course berhasil dihapus", ...info });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
