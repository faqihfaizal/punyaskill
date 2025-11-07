import React, { useState, useEffect } from "react";
import { Row, Col, Label, Input, Button } from "reactstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/instruktur";

export default function EditProfessor() {
  const { id_instruktur } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama_instruktur: "",
    deskripsi_instruktur: "",
    bidang_instruktur: "",
    foto_instruktur: null,
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Ambil data instruktur berdasarkan ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id_instruktur}`);
        setForm({
          nama_instruktur: res.data.nama_instruktur || "",
          deskripsi_instruktur: res.data.deskripsi_instruktur || "",
          bidang_instruktur: res.data.bidang_instruktur || "",
          foto_instruktur: null, // reset, karena backend biasanya kirim path bukan file
        });
      } catch (err) {
        console.error("Gagal mengambil data instruktur:", err);
        setMessage("Gagal memuat data instruktur.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id_instruktur]);

  // Handle perubahan input teks
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle perubahan file
  const handleFileChange = (e) => {
    setForm({
      ...form,
      foto_instruktur: e.target.files[0],
    });
  };

  // Simpan perubahan (PUT)
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
      const res = await axios.put(`${API_URL}/${id_instruktur}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(res.data.message || "Data berhasil diperbarui!");
      navigate("/university/professors");
    } catch (err) {
      console.error("Gagal memperbarui data:", err);
      setMessage(err.response?.data?.message || "Terjadi kesalahan.");
    }
  };

  // Hapus data instruktur
  const handleDelete = async () => {
    if (window.confirm(`Yakin ingin menghapus ${form.nama_instruktur}?`)) {
      try {
        await axios.delete(`${API_URL}/${id_instruktur}`);
        alert("Data berhasil dihapus.");
        navigate("/university/professors");
      } catch (err) {
        console.error("Gagal menghapus data:", err);
        alert("Gagal menghapus data.");
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="content">
      <Row>
        <Col xs={12} md={12}>
          <div className="page-title">
            <div className="float-left">
              <h1 className="title">Edit Instruktur</h1>
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

                <div className="mt-3">
                  <Button type="submit" color="primary" className="me-2">
                    Simpan Perubahan
                  </Button>
                  <Button
                    type="button"
                    color="danger"
                    onClick={handleDelete}
                  >
                    Hapus Instruktur
                  </Button>
                </div>
              </form>

              {message && <p className="mt-3 text-success">{message}</p>}
            </div>
          </section>
        </Col>
      </Row>
    </div>
  );
}
