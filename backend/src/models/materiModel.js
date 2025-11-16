const pool = require('../config/db');

// get materi by course
const getAllByCourse = async (id_course) => {
    const query = `
        SELECT 
            id_materi,
            id_course,
            judul_materi,
            content,
            file_materi,
            created_at
        FROM materi 
        WHERE id_course = ?
        ORDER BY created_at DESC
    `;
    const [rows] = await pool.execute(query, [id_course]);
    return rows;
};

// get materi by id
const getById = async (id_materi) => {
    const query = `
        SELECT 
            id_materi,
            id_course,
            judul_materi,
            content,
            file_materi,
            created_at
        FROM materi 
        WHERE id_materi = ?
    `;
    const [rows] = await pool.execute(query, [id_materi]);
    return rows[0];
};

// insert materi
const create = async (data) => {
    const query = `
        INSERT INTO materi (id_course, judul_materi, content, file_materi)
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [
        data.id_course,
        data.judul_materi,
        data.content,
        data.file_materi
    ]);
    return result;
};

// update materi
const update = async (id_materi, data) => {
    const query = `
        UPDATE materi 
        SET id_course = ?, judul_materi = ?, content = ?, file_materi = ?
        WHERE id_materi = ?
    `;
    const [result] = await pool.execute(query, [
        data.id_course,
        data.judul_materi,
        data.content,
        data.file_materi,
        id_materi
    ]);
    return result;
};

// delete materi
const remove = async (id_materi) => {
    const query = `DELETE FROM materi WHERE id_materi = ?`;
    const [result] = await pool.execute(query, [id_materi]);
    return result;
};

module.exports = {
    getAllByCourse,
    getById,
    create,
    update,
    remove
};
