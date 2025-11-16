const pool = require("../config/db");

// List semua hasil quiz user (optional)
const list = async () => {
    const [rows] = await pool.query(`
        SELECT uq.*, u.username, q.title
        FROM user_quiz uq
        LEFT JOIN users u ON uq.id_user = u.id_user
        LEFT JOIN quiz q ON uq.id_quiz = q.id_quiz
        ORDER BY uq.taken_at DESC
    `);
    return rows;
};

// Ambil berdasarkan id_user & id_quiz
const getByUserQuiz = async (id_user, id_quiz) => {
    const [rows] = await pool.query(
        `SELECT * FROM user_quiz WHERE id_user = ? AND id_quiz = ? LIMIT 1`,
        [id_user, id_quiz]
    );
    return rows[0];
};

// Insert hasil quiz
const create = async (data) => {
    const [res] = await pool.query(
        `INSERT INTO user_quiz (id_user, id_quiz, jawaban_quiz)
         VALUES (?, ?, ?)`,
        [data.id_user, data.id_quiz, data.jawaban_quiz]
    );
    return { id: res.insertId };
};

// Update hasil quiz (jika user mau submit ulang → karena UNIQUE constraint)
const update = async (id_user, id_quiz, data) => {
    const [res] = await pool.query(
        `UPDATE user_quiz SET 
            jawaban_quiz = ?, 
            score = ?
         WHERE id_user = ? AND id_quiz = ?`,
        [data.jawaban_quiz, data.score, id_user, id_quiz]
    );

    return { affected: res.affectedRows };
};
// Update hanya score
const updateScore = async (id_user, id_quiz, score) => {
    const [res] = await pool.query(
        `UPDATE user_quiz SET score = ? 
         WHERE id_user = ? AND id_quiz = ?`,
        [score, id_user, id_quiz]
    );

    return { affected: res.affectedRows };
};

module.exports = {
    list,
    getByUserQuiz,
    create,
    update,
    updateScore,   // <--- tambahkan
};
