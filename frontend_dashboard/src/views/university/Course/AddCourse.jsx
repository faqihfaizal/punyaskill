import React, { useEffect, useState } from "react";
import { Row, Col, Label, Input } from "reactstrap";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

export default function AddCourse() {
  const navigate = useNavigate();

  const [instrukturs, setInstrukturs] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    id_instruktur: "",
    judul_course: "",
    slug: "",
    deskripsi_course: "",
    durasi_course: "",
    skill_level: "",
    last_update: "",
    thumbnail: null,
  });

  // Ambil instruktur dengan bidangnya
  useEffect(() => {
    api
      .get("/api/instruktur/")
      .then((res) => setInstrukturs(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Handle input text
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setForm({
      ...form,
      thumbnail: e.target.files[0],
    });
  };

  // Submit ke backend sesuai controller
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("id_instruktur", form.id_instruktur);
    data.append("judul_course", form.judul_course);
    data.append("slug", form.slug);
    data.append("deskripsi_course", form.deskripsi_course);
    data.append("durasi_course", form.durasi_course);
    data.append("skill_level", form.skill_level);
    data.append("last_update", form.last_update);

    if (form.thumbnail) data.append("thumbnail", form.thumbnail);

    try {
      const res = await api.post("/api/course", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message || "Course berhasil dibuat!");

      navigate("/admin/university/courses");
      setForm({
        id_instruktur: "",
        judul_course: "",
        slug: "",
        deskripsi_course: "",
        durasi_course: "",
        skill_level: "",
        last_update: "",
        thumbnail: null,
      });
    } catch (err) {
      console.log("FULL ERROR:", err);
      setMessage(err.response?.data?.message || "Gagal menambah course.");
    }
  };

  return (
    <div className="content">
      <Row>
        <Col xs={12} md={12}>
          <div className="page-title">
            <div className="float-left">
              <h1 className="title">Tambah Course</h1>
            </div>
          </div>

          <section className="box">
            <header className="panel_header">
              <h2 className="title float-left">Data Course</h2>
            </header>

            <div className="content-body">
              <form onSubmit={handleSubmit}>

                {/* PILIH INSTRUKTUR */}
                <div className="form-group">
                  <Label>Instruktur</Label>
                  <Input
                    type="select"
                    name="id_instruktur"
                    value={form.id_instruktur}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Pilih Instruktur --</option>
                    {instrukturs.map((i) => (
                      <option key={i.id_instruktur} value={i.id_instruktur}>
                        {i.nama_instruktur} — {i.bidang_instruktur}
                      </option>
                    ))}
                  </Input>
                </div>

                <div className="form-group">
                  <Label>Judul Course</Label>
                  <Input
                    type="text"
                    name="judul_course"
                    value={form.judul_course}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* SLUG */}
                <div className="form-group">
                  <Label>Slug</Label>
                  <Input
                    type="text"
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* DESKRIPSI */}
                <div className="form-group">
                  <Label>Deskripsi Course</Label>
                  <Input
                    type="textarea"
                    name="deskripsi_course"
                    value={form.deskripsi_course}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* DURASI */}
                <div className="form-group">
                  <Label>Durasi Course (mis: 3h 20m)</Label>
                  <Input
                    type="text"
                    name="durasi_course"
                    value={form.durasi_course}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* SKILL LEVEL (ENUM) */}
                <div className="form-group">
                  <Label>Skill Level</Label>
                  <Input
                    type="select"
                    name="skill_level"
                    value={form.skill_level}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Pilih Skill Level --</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </Input>
                </div>

                {/* THUMBNAIL */}
                <div className="form-group">
                  <Label>Thumbnail</Label>
                  <Input
                    type="file"
                    name="thumbnail"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                  Simpan Course
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
