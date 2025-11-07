const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel.js");

const JWT_SECRET = "supersecret123";

// 🟢 REGISTER
const register = async (req, res) => {
  const { username, fullname, email, password } = req.body;

  try {
    const userExist = await UserModel.findByEmail(email);
    if (userExist)
      return res.status(400).json({ message: "Email already used" });

    const hashed = await bcrypt.hash(password, 10);
    await UserModel.create({ username, fullname, email, password: hashed });

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findByEmail(email);
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login success", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟡 EDIT USER
const edit = async (req, res) => {
  const { id } = req.params;
  const { username, fullname, email, password } = req.body;

  try {
    const user = await UserModel.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    let hashed = user.password;
    if (password) {
      hashed = await bcrypt.hash(password, 10);
    }

    await UserModel.update(id, { username, fullname, email, password: hashed });

    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔴 LOGOUT
const logout = async (req, res) => {
  try {
    // Jika pakai token JWT, logout cukup dengan "menghapus token" di sisi client.
    // Tapi kita bisa kasih respon untuk konfirmasi logout.
    res.json({ message: "Logout success. Please clear your token on client side." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login, edit, logout };
