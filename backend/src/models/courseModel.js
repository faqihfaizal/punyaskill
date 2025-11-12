const pool = require('../config/db');

// Ambil semua course
exports.getAllCourses = async () => {
    const [rows] = await pool.query("SELECT*, instruktur.nama_instruktur AS nama_instruktur, instruktur.foto_instruktur AS foto_instruktur FROM course  JOIN instruktur ON course.id_instruktur = instruktur.id_instruktur");
    return rows;
};

// Ambil course berdasarkan slug
exports.getCourseBySlug = async (slug) => {
    const [rows] = await pool.query('SELECT * FROM course WHERE slug = ?', [slug]);
    return rows[0];
};

// Buat course baru
exports.createCourse = async (data) => {
    const {
        id_instruktur, title, slug, thumbnail,
        description, duration, video_length,
        skill_level, price, rating
    } = data;

    const [result] = await pool.query(
        `INSERT INTO course (
            id_instruktur, title, slug, thumbnail,
            description, duration, student_count,
            video_length, skill_level, price, rating
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            id_instruktur,
            title,
            slug,
            thumbnail,
            description,
            duration,
            0, // student_count default
            video_length,
            skill_level,
            price,
            rating
        ]
    );
    return result;
};

// Update course
exports.updateCourse = async (slug, data) => {
    const [result] = await pool.query(
        `UPDATE course SET
            title = ?, description = ?, duration = ?, 
            video_length = ?, skill_level = ?, price = ?, rating = ?,
            thumbnail = ?, id_instruktur = ?
         WHERE slug = ?`,
        [
            data.title,
            data.description,
            data.duration,
            data.video_length,
            data.skill_level,
            data.price,
            data.rating,
            data.thumbnail,
            data.id_instruktur,
            slug
        ]
    );
    return result;
};

// Hapus course
exports.deleteCourse = async (slug) => {
    const [result] = await pool.query('DELETE FROM course WHERE slug = ?', [slug]);
    return result;
};
