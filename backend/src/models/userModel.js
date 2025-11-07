const db = require('../config/db');

const UserModel = {
  // Cari user berdasarkan email
  async findByEmail(email) {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0];
  },

  // Cari user berdasarkan ID
  async findById(id) {
    const [rows] = await db.query(
      "SELECT id, username, fullname, email FROM users WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  // Tambah user baru
  async create({ username, fullname, email, password }) {
    await db.query(
      "INSERT INTO users (username, fullname, email, password) VALUES (?, ?, ?, ?)",
      [username, fullname, email, password]
    );
  },

  // Update data user
  async update(id, { username, fullname, email, password }) {
    const fields = [];
    const params = [];

    if (username) { fields.push("username = ?"); params.push(username); }
    if (fullname) { fields.push("fullname = ?"); params.push(fullname); }
    if (email) { fields.push("email = ?"); params.push(email); }
    if (password) { fields.push("password = ?"); params.push(password); }

    if (fields.length === 0) return { affectedRows: 0 };

    const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    params.push(id);

    const [result] = await db.query(sql, params);
    return result;
  },
};

module.exports = { UserModel };
