const pool = require('../config/db');

module.exports = {
    // Ambil semua enrollment
    list() {
        return pool.query(`
            SELECT uc.*, u.fullname, c.judul_course 
            FROM user_course uc
            JOIN users u ON u.id_user = uc.id_user
            JOIN course c ON c.id_course = uc.id_course
            ORDER BY uc.enrolled_at DESC
        `);
    },

    // Ambil course berdasarkan user login
    listByUser(id_user) {
        return pool.query(`
        SELECT uc.*, c.judul_course, c.slug, c.thumbnail
        FROM user_course uc
        JOIN course c ON c.id_course = uc.id_course
        WHERE uc.id_user = ?
        ORDER BY uc.enrolled_at DESC
    `, [id_user]);
    },


    // Enroll user ke course
    insert(data) {
        return pool.query(`
            INSERT INTO user_course (id_user, id_course, progress)
            VALUES (?, ?, ?)
        `, [data.id_user, data.id_course, data.progress || 0]);
    },

    // Update progress
    updateProgress(id, progress) {
        return pool.query(`
            UPDATE user_course 
            SET progress = ?
            WHERE id = ?
        `, [progress, id]);
    },

    // Hapus enrollment
    remove(id) {
        return pool.query(`
            DELETE FROM user_course WHERE id = ?
        `, [id]);
    }
};
