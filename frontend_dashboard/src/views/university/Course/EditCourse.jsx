import React, { useEffect, useState } from "react";
import { Row, Col, Label, Input, Button } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../services/api";

export default function EditCourse() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [instrukturs, setInstrukturs] = useState([]);
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
    const [message, setMessage] = useState("");

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            try {
                const [insRes, courseRes] = await Promise.all([
                    api.get("/api/instruktur"),
                    api.get(`/api/course/${slug}`),
                ]);

                if (!mounted) return;
                setInstrukturs(Array.isArray(insRes.data) ? insRes.data : []);

                const c = courseRes.data;
                setForm({
                    id_instruktur: c.id_instruktur || "",
                    judul_course: c.judul_course || "",
                    slug: c.slug || "",
                    deskripsi_course: c.deskripsi_course || "",
                    durasi_course: c.durasi_course || "",
                    skill_level: c.skill_level || "",
                    last_update: c.last_update || "",
                    thumbnail: c.thumbnail || null,
                });
            } catch (err) {
                console.error("Gagal load data course/inst:", err);
                setMessage("Gagal memuat data.");
            } finally {
                if (mounted) setLoading(false);
            }
        };
        fetchData();
        return () => (mounted = false);
    }, [slug]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleFileChange = (e) => {
        setForm((f) => ({ ...f, thumbnail: e.target.files[0] }));
    };

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
    if (form.thumbnail && typeof form.thumbnail !== "string") {
      data.append("thumbnail", form.thumbnail);
    }

    try {
      const res = await api.put(`/api/course/${slug}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message || "Course berhasil diperbarui.");
      navigate("/admin/university/courses");
    } catch (err) {
      console.error("Gagal update course:", err);
      setMessage(err.response?.data?.message || "Gagal memperbarui course.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Yakin ingin menghapus ${form.judul_course}?`)) {
      try {
        await api.delete(`/api/course/${slug}`);
        alert("Course berhasil dihapus.");
        navigate("/admin/university/courses");
      } catch (err) {
        console.error("Gagal menghapus course:", err);
        alert("Gagal menghapus course.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;

    return (
        <div className="content">
            <Row>
                <Col xs={12} md={12}>
                    <div className="page-title">
                        <div className="float-left">
                            <h1 className="title">Edit Course</h1>
                        </div>
                    </div>

                    <section className="box">
                        <header className="panel_header">
                            <h2 className="title float-left">Edit Course</h2>
                        </header>
                        <div className="content-body">
                            {form.thumbnail && typeof form.thumbnail === "string" && (
                                <div className="mt-2 mb-3">
                                    <Label>Thumbnail Saat Ini:</Label><br />
                                    <img
                                        src={`http://localhost:5000${form.thumbnail}`}
                                        alt="thumbnail course"
                                        width="150"
                                        className="rounded mt-2"
                                    />
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
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
                                    <Input type="text" name="judul_course" value={form.judul_course} onChange={handleChange} required />
                                </div>

                                <div className="form-group">
                                    <Label>Slug</Label>
                                    <Input type="text" name="slug" value={form.slug} onChange={handleChange} required />
                                </div>

                                <div className="form-group">
                                    <Label>Deskripsi Course</Label>
                                    <Input type="textarea" name="deskripsi_course" value={form.deskripsi_course} onChange={handleChange} required />
                                </div>

                                <div className="form-group">
                                    <Label>Durasi Course (mis: 3h 20m)</Label>
                                    <Input type="text" name="durasi_course" value={form.durasi_course} onChange={handleChange} required />
                                </div>

                                <div className="form-group">
                                    <Label>Skill Level</Label>
                                    <Input type="select" name="skill_level" value={form.skill_level} onChange={handleChange} required>
                                        <option value="">-- Pilih Skill Level --</option>
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </Input>
                                </div>

                                <div className="form-group">
                                    <Label>Thumbnail</Label>
                                    <Input type="file" name="thumbnail" accept="image/*" onChange={handleFileChange} />
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
                                        Hapus Course
                                    </Button>
                                </div>
                                {message && <p className="mt-3">{message}</p>}
                            </form>
                        </div>
                    </section>
                </Col>
            </Row>
        </div>
    );
}
 

