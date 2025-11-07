const path = require('path');
const pool = require('../config/db');

// Ambil semua instruktur
async function list() {
    const [rows] = await pool.query(
        'SELECT * FROM instruktur ORDER BY id_instruktur DESC'
    );
    return rows;
}

// Detail 1 instruktur berdasarkan ID
async function detail(id_instruktur) {
    const [rows] = await pool.query(
        'SELECT * FROM instruktur WHERE id_instruktur = ?',
        [id_instruktur]
    );
    return rows[0] || null;
}

// Tambah instruktur baru
async function insert(data) {
    const sql = `
        INSERT INTO instruktur (nama_instruktur, deskripsi_instruktur, bidang_instruktur, foto_instruktur)
        VALUES (?, ?, ?, ?)
    `;
    const params = [
        data.nama_instruktur,
        data.deskripsi_instruktur,
        data.bidang_instruktur,
        data.foto_instruktur
    ];

    const [result] = await pool.query(sql, params);

    // Ambil data baru yang berhasil disimpan
    const [rows] = await pool.query(
        'SELECT * FROM instruktur WHERE id_instruktur = ?',
        [result.insertId]
    );

    return rows[0];
}

// Update instruktur
async function update(id_instruktur, data) {
    const sql = `
        UPDATE instruktur
        SET nama_instruktur = ?, deskripsi_instruktur = ?, bidang_instruktur = ?, foto_instruktur = ?
        WHERE id_instruktur = ?
    `;
    const params = [
        data.nama_instruktur,
        data.deskripsi_instruktur,
        data.bidang_instruktur,
        data.foto_instruktur,
        id_instruktur
    ];

    const [result] = await pool.query(sql, params);
    return { affectedRows: result.affectedRows };
}

// Hapus instruktur
async function remove(id_instruktur) {
    // Ambil dulu foto biar bisa dihapus dari storage kalau perlu
    const [rows] = await pool.query(
        'SELECT foto_instruktur FROM instruktur WHERE id_instruktur = ?',
        [id_instruktur]
    );
    const foto = rows[0]?.foto_instruktur || null;

    const [result] = await pool.query(
        'DELETE FROM instruktur WHERE id_instruktur = ?',
        [id_instruktur]
    );

    return { affectedRows: result.affectedRows, foto };
}

module.exports = { list, detail, insert, update, remove };
