const pool = require("../config/db");

const Course = {
  // LIST
  async list() {
    const [rows] = await pool.query(
      `SELECT c.*, i.nama_instruktur , i.foto_instruktur
       FROM course c
       LEFT JOIN instruktur i ON c.id_instruktur = i.id_instruktur
       ORDER BY c.created_at DESC`
    );
    return rows;
  },

  // DETAIL BY SLUG
  async detail(slug) {
    const [rows] = await pool.query(
      `SELECT c.*, i.nama_instruktur, i.foto_instruktur, i.bidang_instruktur, i.deskripsi_instruktur
       FROM course c
       LEFT JOIN instruktur i ON c.id_instruktur = i.id_instruktur
       WHERE c.slug = ?
       LIMIT 1`,
      [slug]
    );
    return rows[0];
  },

  // INSERT
  async insert(data) {
    const [res] = await pool.query(
      `INSERT INTO course 
       (id_instruktur, judul_course, slug, thumbnail, deskripsi_course, durasi_course, skill_level) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        data.id_instruktur,
        data.judul_course,
        data.slug,
        data.thumbnail,
        data.deskripsi_course,
        data.durasi_course,
        data.skill_level
      ]
    );
    return { id_course: res.insertId };
  },

  // UPDATE
  async update(oldSlug, data) {
    const [res] = await pool.query(
      `UPDATE course SET
        id_instruktur = ?, judul_course = ?, slug = ?, thumbnail = ?, 
        deskripsi_course = ?, durasi_course = ?, skill_level = ?
       WHERE slug = ?`,
      [
        data.id_instruktur,
        data.judul_course,
        data.slug,
        data.thumbnail,
        data.deskripsi_course,
        data.durasi_course,
        data.skill_level,
        oldSlug,
      ]
    );

    return { affected: res.affectedRows };
  },

  // DELETE
  async remove(slug) {
    // ambil data dulu buat hapus file
    const old = await this.detail(slug);
    if (!old) return null;

    await pool.query(`DELETE FROM course WHERE slug = ?`, [slug]);
    return old;
  },
};

module.exports = Course;
