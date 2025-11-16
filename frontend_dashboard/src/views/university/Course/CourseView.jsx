// src/views/university/Course/CourseView.jsx (or CourseProfile.jsx)
import React, { useEffect, useState } from "react";
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useParams } from "react-router-dom";
import api from "../../../services/api";

export default function CourseProfile() {
    const { slug } = useParams();

    // --- Hooks (always top-level, fixed order) ---
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    // materials
    const [materials, setMaterials] = useState([]);
    const [materialLoading, setMaterialLoading] = useState(true);

    const [quizzes, setQuizzes] = useState({});
    const [loadingQuiz, setLoadingQuiz] = useState({});


    // modal for add/edit
    const [modalOpen, setModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    // form for material create/edit
    const [form, setForm] = useState({
        id_course: null,
        judul_materi: "",
        content: "",
        file_materi: null,
        id_materi: null, // used on edit
    });

    // --- Fetch course by slug ---
    useEffect(() => {
        let mounted = true;
        const fetchCourse = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/api/course/${slug}`);
                // backend returns the course object in res.data
                if (!mounted) return;
                setCourse(res.data);
                // prepare form.id_course for material create
                setForm((f) => ({ ...f, id_course: res.data.id_course }));
            } catch (err) {
                console.error("Gagal mengambil detail course:", err);
                setCourse(null);
            } finally {
                if (mounted) setLoading(false);
            }
        };
        fetchCourse();
        return () => (mounted = false);
    }, [slug]);

    // --- Fetch materials whenever course.id_course is available ---
    useEffect(() => {
        if (!course?.id_course) {
            setMaterials([]);
            setMaterialLoading(false);
            return;
        }

        let mounted = true;
        const fetchMaterials = async () => {
            setMaterialLoading(true);
            try {
                const res = await api.get(`/api/materi/${course.id_course}`);
                if (!mounted) return;
                // res.data is expected as array (controller mapped)
                setMaterials(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Gagal mengambil materi:", err);
                setMaterials([]);
            } finally {
                if (mounted) setMaterialLoading(false);
            }
        };
        fetchMaterials();
        return () => (mounted = false);
    }, [course?.id_course]);

    useEffect(() => {
        if (!course?.id_course) return;

        materials.forEach(m => fetchQuizzes(m.id_materi));
    }, [materials]);

    const fetchQuizzes = async (id_materi) => {
        setLoadingQuiz(prev => ({ ...prev, [id_materi]: true }));
        try {
            const res = await api.get(`/api/quiz/${id_materi}`);
            setQuizzes(prev => ({
                ...prev,
                [id_materi]: res.data
            }));
        } catch (err) {
            console.error("Gagal load quiz:", err);
        }
        setLoadingQuiz(prev => ({ ...prev, [id_materi]: false }));
    };


    // --- Modal openers ---
    const openAddModal = () => {
        setIsEdit(false);
        setForm({
            id_course: course?.id_course || null,
            judul_materi: "",
            content: "",
            file_materi: null,
            id_materi: null,
        });
        setModalOpen(true);
    };

    const openEditModal = (m) => {
        setIsEdit(true);
        setForm({
            id_course: m.id_course,
            judul_materi: m.judul_materi,
            content: m.content || "",
            file_materi: null, // keep null => means no file change
            id_materi: m.id_materi,
        });
        setModalOpen(true);
    };

    const [quizModal, setQuizModal] = useState(false);
    const [isQuizEdit, setIsQuizEdit] = useState(false);
    const [quizForm, setQuizForm] = useState({
        id_materi: null,
        id_quiz: null,
        title: "",
        soal_quiz: null
    });


    const openAddQuiz = (id_materi) => {
        setIsQuizEdit(false);
        setQuizForm({
            id_materi,
            id_quiz: null,
            title: "",
            soal_quiz: null
        });
        setQuizModal(true);
    };

    const openEditQuiz = (quiz) => {
        setIsQuizEdit(true);
        setQuizForm({
            id_materi: quiz.id_materi,
            id_quiz: quiz.id_quiz,
            title: quiz.title,
            soal_quiz: null
        });
        setQuizModal(true);
    };


    // --- Handlers ---
    const handleFormChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === "file") {
            setForm((f) => ({ ...f, [name]: files[0] || null }));
        } else {
            setForm((f) => ({ ...f, [name]: value }));
        }
    };

    const handleQuizChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === "file") {
            setQuizForm(f => ({ ...f, soal_quiz: files[0] }));
        } else {
            setQuizForm(f => ({ ...f, [name]: value }));
        }
    };


    const submitMaterial = async (e) => {
        e.preventDefault();
        if (!form.id_course) {
            alert("Course id missing");
            return;
        }

        const data = new FormData();
        data.append("id_course", form.id_course);
        data.append("judul_materi", form.judul_materi);
        data.append("content", form.content);
        if (form.file_materi) data.append("file_materi", form.file_materi);

        try {
            if (isEdit && form.id_materi) {
                await api.put(`/api/materi/${form.id_materi}`, data);
                alert("Materi berhasil diperbarui");
            } else {
                await api.post(`/api/materi`, data);
                alert("Materi berhasil ditambahkan");
            }
            setModalOpen(false);
            // reload materials
            const res = await api.get(`/api/materi/${form.id_course}`);
            setMaterials(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Gagal submit materi:", err);
            alert(err.response?.data?.message || "Gagal submit materi");
        }
    };

    const deleteMaterial = async (id_materi) => {
        if (!window.confirm("Hapus materi ini?")) return;
        try {
            await api.delete(`/api/materi/${id_materi}`);
            // refresh list
            setMaterials((prev) => prev.filter((m) => m.id_materi !== id_materi));
            alert("Materi dihapus");
        } catch (err) {
            console.error("Gagal menghapus materi:", err);
            alert("Gagal menghapus materi");
        }
    };

    const submitQuiz = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("id_materi", quizForm.id_materi);
        data.append("title", quizForm.title);
        if (quizForm.soal_quiz) data.append("soal_quiz", quizForm.soal_quiz);

        try {
            if (isQuizEdit) {
                await api.put(`/api/quiz/${quizForm.id_quiz}`, data);
                alert("Quiz berhasil diperbarui");
            } else {
                await api.post(`/api/quiz`, data);
                alert("Quiz berhasil dibuat");
            }

            setQuizModal(false);
            fetchQuizzes(quizForm.id_materi);
        } catch (err) {
            console.error(err);
            alert("Gagal submit quiz");
        }
    };

    const deleteQuiz = async (id_quiz, id_materi) => {
        if (!window.confirm("Hapus quiz ini?")) return;

        try {
            await api.delete(`/api/quiz/${id_quiz}`);
            fetchQuizzes(id_materi);
        } catch (err) {
            console.error(err);
            alert("Gagal menghapus quiz");
        }
    };


    // --- UI rendering ---
    if (loading) return <p>Loading course...</p>;
    if (!course) return <p>Course tidak ditemukan.</p>;

    const thumbnailUrl = course.thumbnail
        ? `http://localhost:5000${course.thumbnail.startsWith("/") ? "" : "/"}${course.thumbnail}`
        : "/default-course.jpg";

    return (
        <div className="content">
            <Row>
                <Col xs={12} md={12}>
                    <div className="page-title">
                        <div className="float-left">
                            <h1 className="title">View Course</h1>
                        </div>
                    </div>

                    <div className="col-xl-12">
                        <section className="box profile-page">
                            <div className="content-body">
                                {/* Header Course */}
                                <div className="col-12">
                                    <div className="row uprofile">
                                        <div className="uprofile-image col-xl-2 col-lg-3 col-md-3 col-sm-4 col-12">
                                            <img alt={course.judul_course} src={thumbnailUrl} className="img-fluid" />
                                        </div>

                                        <div className="uprofile-name col-xl-10 col-lg-9 col-md-9 col-sm-8 col-12">
                                            <h3 className="uprofile-owner">
                                                <a href="#!">{course.judul_course}</a>
                                            </h3>

                                            <button className="btn btn-primary btn-sm profile-btn">Message</button>{" "}
                                            <button className="btn btn-primary btn-sm profile-btn">Subscribe</button>
                                            <div className="clearfix"></div>

                                            <p className="uprofile-title">Instructor: {course.nama_instruktur}</p>
                                            <p className="uprofile-title">Skill Level: {course.skill_level}</p>
                                            <p className="uprofile-title">Durasi: {course.durasi_course}</p>


                                        </div>
                                    </div>
                                </div>

                                {/* Course Details */}
                                <div className="col-12">
                                    <hr />
                                    <h4>Course Details:</h4>
                                    <p>{course.deskripsi_course}</p>

                                    <div className="clearfix"></div>
                                    <hr />

                                    <h4>Subjects:</h4>
                                    <ul>
                                        <li>Skill Level: {course.skill_level}</li>
                                        <li>Durasi: {course.durasi_course}</li>
                                        <li>Instructor: {course.nama_instruktur}</li>
                                    </ul>

                                    <div className="clearfix"></div>
                                    <hr />
                                </div>

                                {/* MATERIALS SECTION */}
                                <div className="col-12">
                                    <h4>Materials</h4>
                                    <button className="btn btn-success btn-sm mb-3" onClick={openAddModal}>
                                        + Add Material
                                    </button>

                                    {materialLoading ? (
                                        <p>Loading materials...</p>
                                    ) : materials.length === 0 ? (
                                        <p>Belum ada materi.</p>
                                    ) : (
                                        <ul className="list-group">
                                            {materials.map((m, idx) => (
                                                <li key={m.id_materi} className="list-group-item">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <strong>{idx + 1}. {m.judul_materi}</strong>
                                                        <div>
                                                            <button className="btn btn-warning btn-sm me-2" onClick={() => openEditModal(m)}>Edit</button>
                                                            <button className="btn btn-danger btn-sm" onClick={() => deleteMaterial(m.id_materi)}>Delete</button>
                                                        </div>
                                                    </div>

                                                    <div className="mt-3 ms-4">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <h6>Quiz</h6>
                                                            <button
                                                                className="btn btn-primary btn-sm"
                                                                onClick={() => openAddQuiz(m.id_materi)}
                                                            >
                                                                + Add Quiz
                                                            </button>
                                                        </div>

                                                        {loadingQuiz[m.id_materi] ? (
                                                            <p>Loading quiz...</p>
                                                        ) : quizzes[m.id_materi]?.length === 0 ? (
                                                            <p className="text-muted">Belum ada quiz.</p>
                                                        ) : (
                                                            <ul className="list-group mt-2">
                                                                {(quizzes[m.id_materi] || []).map(q => (

                                                                    <li key={q.id_quiz} className="list-group-item">
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                            <div>
                                                                                <strong>{q.title}</strong>
                                                                                <br />
                                                                                {q.soal_quiz && (
                                                                                    <a
                                                                                        href={`http://localhost:5000${q.soal_quiz}`}
                                                                                        target="_blank"
                                                                                        rel="noreferrer"
                                                                                    >
                                                                                        Lihat File Quiz
                                                                                    </a>
                                                                                )}
                                                                            </div>

                                                                            <div>
                                                                                <button
                                                                                    className="btn btn-warning btn-sm me-2"
                                                                                    onClick={() => openEditQuiz(q)}
                                                                                >
                                                                                    Edit
                                                                                </button>
                                                                                <button
                                                                                    className="btn btn-danger btn-sm"
                                                                                    onClick={() => deleteQuiz(q.id_quiz, m.id_materi)}
                                                                                >
                                                                                    Delete
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>

                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                {/* Modal for add/edit material */}
                                <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)}>
                                    <ModalHeader toggle={() => setModalOpen(false)}>{isEdit ? "Edit Material" : "Add Material"}</ModalHeader>
                                    <form onSubmit={submitMaterial}>
                                        <ModalBody>
                                            <div className="form-group">
                                                <label>Judul Materi</label>
                                                <input
                                                    name="judul_materi"
                                                    type="text"
                                                    className="form-control"
                                                    value={form.judul_materi}
                                                    onChange={handleFormChange}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>Content</label>
                                                <textarea
                                                    name="content"
                                                    className="form-control"
                                                    rows="4"
                                                    value={form.content}
                                                    onChange={handleFormChange}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>File Materi (opsional)</label>
                                                <input name="file_materi" type="file" className="form-control" onChange={handleFormChange} />
                                            </div>
                                        </ModalBody>

                                        <ModalFooter>
                                            <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                                            <button type="submit" className="btn btn-primary">{isEdit ? "Update" : "Create"}</button>
                                        </ModalFooter>
                                    </form>
                                </Modal>

                                <Modal isOpen={quizModal} toggle={() => setQuizModal(false)}>
                                    <ModalHeader toggle={() => setQuizModal(false)}>
                                        {isQuizEdit ? "Edit Quiz" : "Add Quiz"}
                                    </ModalHeader>

                                    <form onSubmit={submitQuiz}>
                                        <ModalBody>
                                            <div className="form-group">
                                                <label>Judul Quiz</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="title"
                                                    value={quizForm.title}
                                                    onChange={handleQuizChange}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group mt-3">
                                                <label>File Soal Quiz</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    name="soal_quiz"
                                                    onChange={handleQuizChange}
                                                />
                                                {isQuizEdit && (
                                                    <small className="text-muted">
                                                        Biarkan kosong jika tidak mengganti file
                                                    </small>
                                                )}
                                            </div>
                                        </ModalBody>

                                        <ModalFooter>
                                            <button className="btn btn-secondary" type="button" onClick={() => setQuizModal(false)}>
                                                Cancel
                                            </button>
                                            <button className="btn btn-primary" type="submit">
                                                {isQuizEdit ? "Update" : "Create"}
                                            </button>
                                        </ModalFooter>
                                    </form>
                                </Modal>


                            </div>
                        </section>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
