const path = require('path');
const { deleteFileIfExists } = require('../utils/fs');
const courseModel = require('../models/courseModel');

// 🔹 fungsi bantu (samakan dengan instruktur)
function asPublicPath(fullPath) {
  if (!fullPath) return null;
  const idx = fullPath.lastIndexOf('uploads');
  return idx >= 0 ? '/' + fullPath.substring(idx).replace(/\\/g, '/') : null;
}

// 🔹 CREATE
exports.createCourse = async (req, res) => {
  try {
    const {
      id_instruktur, title, slug, description,
      duration, video_length, skill_level, price, rating
    } = req.body;

    if (!title || !description || !duration) {
      return res.status(400).json({ message: 'Title, description, and duration are required' });
    }

    const thumbnailAbs = req.file?.path || null;
    const generatedSlug = slug || title.toLowerCase().replace(/\s+/g, '-');

    const existing = await courseModel.getCourseBySlug(generatedSlug);
    if (existing) {
      return res.status(400).json({ message: 'Course with this slug already exists' });
    }

    const payload = {
      id_instruktur,
      title,
      slug: generatedSlug,
      thumbnail: asPublicPath(thumbnailAbs),
      description,
      duration,
      video_length,
      skill_level,
      price,
      rating
    };

    const result = await courseModel.createCourse(payload);

    res.status(201).json({
      message: 'Course created successfully',
      data: { id_course: result.insertId, slug: generatedSlug }
    });
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 🔹 UPDATE
exports.updateCourse = async (req, res) => {
  try {
    const { slug } = req.params;
    const {
      id_instruktur, title, description,
      duration, video_length, skill_level, price, rating
    } = req.body;

    // Ambil data lama
    const oldData = await courseModel.getCourseBySlug(slug);
    if (!oldData) return res.status(404).json({ message: 'Course not found' });

    let thumbnail = oldData.thumbnail;

    // Kalau ada file baru, hapus lama
    if (req.file) {
      if (oldData.thumbnail) {
        const oldPath = path.join(process.cwd(), oldData.thumbnail.replace(/^\//, ""));
        deleteFileIfExists(oldPath);
      }
      thumbnail = asPublicPath(req.file.path);
    }

    const payload = {
      id_instruktur,
      title,
      description,
      duration,
      video_length,
      skill_level,
      price,
      rating,
      thumbnail
    };

    await courseModel.updateCourse(slug, payload);

    res.json({ message: 'Course updated successfully' });
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 🔹 READ (semua)
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.getAllCourses();
    res.json({ status: 'success', data: courses });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 🔹 READ (by slug)
exports.getCourseBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const course = await courseModel.getCourseBySlug(slug);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ status: 'success', data: course });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 🔹 DELETE
exports.deleteCourse = async (req, res) => {
  try {
    const { slug } = req.params;
    const existing = await courseModel.getCourseBySlug(slug);
    if (!existing) return res.status(404).json({ message: 'Course not found' });

    // hapus thumbnail file juga
    if (existing.thumbnail) {
      const oldPath = path.join(process.cwd(), existing.thumbnail.replace(/^\//, ""));
      deleteFileIfExists(oldPath);
    }

    await courseModel.deleteCourse(slug);
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    console.error('Error deleting course:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
