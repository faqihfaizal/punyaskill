import React, { useState } from "react";
import { Row, Col, Label, Input } from "reactstrap";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";




export default function AddProfessor() {
  const [form, setForm] = useState({
    nama_instruktur: "",
    deskripsi_instruktur: "",
    bidang_instruktur: "",
    foto_instruktur: null,
  });

  const [message, setMessage] = useState("");

  // Handle input text
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setForm({
      ...form,
      foto_instruktur: e.target.files[0],
    });
  };

  // Submit ke backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nama_instruktur", form.nama_instruktur);
    data.append("deskripsi_instruktur", form.deskripsi_instruktur);
    data.append("bidang_instruktur", form.bidang_instruktur);
    if (form.foto_instruktur) {
      data.append("foto_instruktur", form.foto_instruktur);
    }

    try {
      const res = await api.post("/api/instruktur/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(res.data.message || "Berhasil menambahkan instruktur!");
      navigate("/admin/university/professors");
      setForm({
        nama_instruktur: "",
        deskripsi_instruktur: "",
        bidang_instruktur: "",
        foto_instruktur: null,
      });
    } catch (err) {
      console.log("FULL ERROR:", err);
      console.log("RESPONSE:", err.response);
      setMessage(err.response?.data?.message || "Terjadi kesalahan.");
    }
  };
  const navigate = useNavigate(); // <<< TAMBAHKAN

  return (
    <div className="content">
      <Row>
        <Col xs={12} md={12}>
          <div className="page-title">
            <div className="float-left">
              <h1 className="title">Tambah Instruktur</h1>
            </div>
          </div>

          <section className="box">
            <header className="panel_header">
              <h2 className="title float-left">Data Instruktur</h2>
            </header>

            <div className="content-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <Label>Nama Instruktur</Label>
                  <Input
                    type="text"
                    name="nama_instruktur"
                    value={form.nama_instruktur}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <Label>Deskripsi Instruktur</Label>
                  <Input
                    type="textarea"
                    name="deskripsi_instruktur"
                    value={form.deskripsi_instruktur}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <Label>Bidang Instruktur</Label>
                  <Input
                    type="text"
                    name="bidang_instruktur"
                    value={form.bidang_instruktur}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <Label>Foto Instruktur</Label>
                  <Input
                    type="file"
                    name="foto_instruktur"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                  Simpan
                </button>
              </form>

              {message && <p className="mt-3 text-success">{message}</p>}
            </div>
          </section>
        </Col>
      </Row>
    </div>
  );
}
