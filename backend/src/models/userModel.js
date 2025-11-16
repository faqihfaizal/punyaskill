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
  async findById(id_user) {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE id_user = ?",
      [id_user]
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
  async list() {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE role = 'student' ORDER BY id_user DESC"
    );
    return rows;
  },


  async remove(id_user) {
    const [result] = await db.query("DELETE FROM users WHERE id_user = ?", [
      id_user,
    ]);
    return result;
  }

};


module.exports = { UserModel };
