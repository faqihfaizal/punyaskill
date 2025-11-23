const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel.js");
const { get } = require("../routes/courseRoute.js");

const JWT_SECRET = "supersecret123";

// 🟢 REGISTER
const register = async (req, res) => {
  const { username, fullname, email, password, role } = req.body;

  try {
    const userExist = await UserModel.findByEmail(email);
    if (userExist)
      return res.status(400).json({ message: "Email already used" });

    const hashed = await bcrypt.hash(password, 10);

    // default role = student kalau tidak dikirim
    const newUser = {
      username,
      fullname,
      email,
      password: hashed,
      role: role || "student",
    };

    await UserModel.create(newUser);

    res.json({ message: "User registered successfully", user: newUser });
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

    // Masukkan role ke JWT payload
    const token = jwt.sign(
      { id_user: user.id_user, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login success",
      token,
      user: {
        id_user: user.id_user,
        fullname: user.fullname,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟡 EDIT USER
const edit = async (req, res) => {
  const { id } = req.params;
  const { username, fullname, email, password, role } = req.body;

  try {
    const user = await UserModel.findById(id_user);
    if (!user) return res.status(404).json({ message: "User not found" });

    let hashed = user.password;
    if (password) {
      hashed = await bcrypt.hash(password, 10);
    }

    await UserModel.update(id, {
      username,
      fullname,
      email,
      password: hashed,
      role: role || user.role,
    });

    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getList = async (req, res) => {
    try {
        const data = await UserModel.list();
        res.json(data);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// 🔴 LOGOUT
const logout = async (req, res) => {
  try {
    res.json({
      message:
        "Logout success. Please clear your token and role on client side.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔴 DELETE USER
const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await UserModel.remove(id);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = { register, login, edit, logout, getList, remove };
