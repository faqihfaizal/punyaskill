import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Label, Input, Button } from "reactstrap";
import { useAuth } from "../../views/university/context/AuthContext";
import "../styles/login.css";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login, loading } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!form.email || !form.password) {
            setError("Email dan password harus diisi");
            return;
        }

        const result = await login(form.email, form.password);

        if (result.success) {
            setMessage("Login berhasil! Redirecting...");
            setTimeout(() => {
                navigate("/admin/university/dashboard");
            }, 1000);
        } else {
            setError(result.error || "Login gagal");
        }
    };

    return (
        
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Admin Dashboard Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Masukkan email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Masukkan password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && <p className="text-danger">{error}</p>}
                    {message && <p className="text-success">{message}</p>}

                    <Button
                        type="submit"
                        color="primary"
                        className="w-100"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </form>

                <p className="text-center mt-3 text-muted">
                    Untuk akses admin dashboard
                </p>
            </div>
        </div>
    );
}
