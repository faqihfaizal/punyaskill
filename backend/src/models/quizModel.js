const pool = require('../config/db');

// GET all quiz by materi
const getAllByMateri = async (id_materi) => {
    const sql = `
        SELECT 
            id_quiz,
            id_materi,
            title,
            soal_quiz,
            created_at
        FROM quiz
        WHERE id_materi = ?
        ORDER BY created_at DESC
    `;
    const [rows] = await pool.execute(sql, [id_materi]);
    return rows;
};

// GET detail quiz
const getById = async (id_quiz) => {
    const sql = `
        SELECT 
            id_quiz,
            id_materi,
            title,
            soal_quiz,
            created_at
        FROM quiz
        WHERE id_quiz = ?
    `;
    const [rows] = await pool.execute(sql, [id_quiz]);
    return rows[0];
};

// CREATE quiz
const create = async (data) => {
    const sql = `
        INSERT INTO quiz (id_materi, title, soal_quiz)
        VALUES (?, ?, ?)
    `;
    const [res] = await pool.execute(sql, [
        data.id_materi,
        data.title,
        data.soal_quiz
    ]);
    return res;
};

// UPDATE quiz
const update = async (id_quiz, data) => {
    const sql = `
        UPDATE quiz
        SET id_materi = ?, title = ?, soal_quiz = ?
        WHERE id_quiz = ?
    `;
    const [res] = await pool.execute(sql, [
        data.id_materi,
        data.title,
        data.soal_quiz,
        id_quiz
    ]);
    return res;
};

// DELETE quiz
const remove = async (id_quiz) => {
    const sql = `DELETE FROM quiz WHERE id_quiz = ?`;
    const [res] = await pool.execute(sql, [id_quiz]);
    return res;
};

module.exports = {
    getAllByMateri,
    getById,
    create,
    update,
    remove
};
