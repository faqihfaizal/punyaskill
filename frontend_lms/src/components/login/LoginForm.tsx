import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services//api";
import { AxiosError } from "axios";

export default function LoginForm() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await api.post("/api/auth/login", form);

            // Pastikan response valid
            if (!res.data || !res.data.token || !res.data.user) {
                setMessage("Invalid response from server");
                return;
            }

            const { token, user, message } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user)); // simpan user juga

            // 🔔 Trigger HeaderOne untuk refresh state
            window.dispatchEvent(new Event("storage"));

            setMessage(message || "Login success");


            // Redirect berdasarkan role
            if (user.role === "admin") {
                window.location.href = "http://localhost:3000"; // dashboard server lain
            } else if (user.role === "student") {
                navigate("/courses");
            } else {
                setMessage("Role tidak dikenali. Hubungi administrator.");
            }
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const msg = error.response?.data?.message || "Login failed";
            setMessage(msg);

            // 🔴 Pastikan token dihapus kalau login gagal
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        }

    };

    return (
        <section className="login_register section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 col-xs-12 wow fadeIn">
                        <div className="login">
                            <h4 className="login_register_title">
                                Already a member? Sign in:
                            </h4>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter Email"
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
                                        id="password"
                                        placeholder="Enter Password"
                                        className="form-control"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group col-lg-12">
                                    <button className="bg_btn bt" type="submit">
                                        Login
                                    </button>
                                </div>
                            </form>

                            {message && (
                                <p
                                    style={{
                                        color:
                                            message.toLowerCase().includes("success") ||
                                                message.toLowerCase().includes("berhasil")
                                                ? "green"
                                                : "red",
                                        marginTop: "10px",
                                    }}
                                >
                                    {message}
                                </p>
                            )}

                            <p>
                                Don’t have an account?{" "}
                                <Link to="/register">Register Now</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
