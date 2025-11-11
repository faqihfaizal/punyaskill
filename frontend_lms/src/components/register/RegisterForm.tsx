import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AxiosError } from "axios";
import api from "../../services/api";

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 🟡 Update state tiap input berubah
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🟢 Kirim data ke backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/register", form); // cukup kirim objek form langsung
      setMessage(res.data.message || "Registration successful!");
      setForm({ username: "", fullname: "", email: "", password: "" });

      // redirect ke halaman login setelah sukses daftar
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const msg = error.response?.data?.message || "Registration failed";
      setMessage(msg);
    }
  };

  return (
    <section className="login_register section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-xs-12 wow fadeIn">
            <div className="register">
              <h4 className="login_register_title">Create a new account:</h4>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    placeholder="Enter Username"
                    id="username"
                    className="form-control"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fullname">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    id="fullname"
                    className="form-control"
                    name="fullname"
                    value={form.fullname}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email-address">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter Email Address"
                    id="email-address"
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    className="form-control"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group col-lg-12">
                  <button className="bg_btn bt" type="submit">
                    Signup now
                  </button>
                </div>
              </form>

              {message && (
                <p
                  style={{
                    color: message.includes("success") ? "green" : "red",
                    marginTop: "10px",
                  }}
                >
                  {message}
                </p>
              )}

              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
