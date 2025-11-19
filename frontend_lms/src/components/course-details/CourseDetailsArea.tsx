import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import VideoPopup from "../../modals/VideoPopup";


export default function CourseDetailsArea() {
  const { slug } = useParams(); // ambil id_course dari URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [materi, setMateri] = useState([]);
  const [quiz, setQuiz] = useState({});



  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/api/course/${slug}`);
        setCourse(res.data.data || res.data);
      } catch (err) {
        console.error("Gagal ambil data course:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/js/dist/tab");
    }
  }, []);

  useEffect(() => {
    if (!course?.id_course) return;

    const fetchMateri = async () => {
      try {
        const res = await api.get(`/api/materi/${course.id_course}`);
        setMateri(res.data);
      } catch (err) {
        console.error("Gagal ambil materi:", err);
      }
    };

    fetchMateri();
  }, [course]);


  useEffect(() => {
    const loadQuiz = async () => {
      const temp = {};

      for (const m of materi) {
        const res = await api.get(`/api/quiz/${m.id_materi}`);
        temp[m.id_materi] = res.data;
      }

      setQuiz(temp);
    };

    if (materi.length) loadQuiz();
  }, [materi]);


  if (loading) {
    return (
      <section className="courses-details section-padding text-center">
        <div className="container">
          <h4>Loading course details...</h4>
        </div>
      </section>
    );
  }

  if (!course) {
    return (
      <section className="courses-details section-padding text-center">
        <div className="container">
          <h4>Course not found.</h4>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Video Popup */}
      <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"GQ6DKK7rrmU"}
      />

      <section className="courses-details section-padding">
        <div className="container">
          <div className="row">
            {/* BAGIAN KIRI */}
            <div className="col-xl-8 wow fadeIn">
              <div className="scourse_image">
                <img
                  src={
                    course.thumbnail
                      ? `http://localhost:5000${course.thumbnail.startsWith("/") ? "" : "/"
                      }${course.thumbnail}`
                      : "/assets/img/courses/default.jpg"

                  }
                  alt={course.title}
                  style={{
                    objectFit: "cover",
                    height: "500px",
                    width: "100%",
                  }}
                />
                {(
                  <a
                    onClick={() => setIsVideoOpen(true)}
                    style={{ cursor: "pointer" }}
                    className="scbtn vbtn"
                  >
                    ▶
                  </a>
                )}
              </div>

              {/* META */}
              <div className="scourse_meta">
                <div className="smeta">
                  <img
                    src={
                      course.foto_instruktur
                        ? `http://localhost:5000${course.foto_instruktur.startsWith("/") ? "" : "/"
                        }${course.foto_instruktur}`
                        : "/assets/img/review/default.jpg"
                    }
                    alt="instructor"
                    style={{
                      objectFit: "cover",
                      height: "75px",
                      width: "75px",      // harus sama agar bulet
                      // borderRadius: "50%", // bikin jadi lingkaran
                    }}

                  />
                  <div className="smeta_text">
                    <span>Instructor:</span>
                    <p>{course.nama_instruktur || "Unknown"}</p>
                  </div>
                </div>

                <div className="smeta">
                  <span>Skill Level:</span>
                  <p>{course.skill_level || "General"}</p>
                </div>

                <div className="smeta">
                  <span>Last Update:</span>
                  <p>
                    {new Date(course.last_update || Date.now()).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <h2 className="scourse-title">{course.title}</h2>

              {/* TABS */}
              <nav className="cd_tab">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                    className="nav-link active"
                    id="nav-overview-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-overview"
                    type="button"
                    role="tab"
                  >
                    Overview
                  </button>
                  <button
                    className="nav-link"
                    id="nav-curriculum-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-curriculum"
                    type="button"
                    role="tab"
                  >
                    Curriculum
                  </button>
                  <button
                    className="nav-link"
                    id="nav-instructor-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-instructor"
                    type="button"
                    role="tab"
                  >
                    Instructor
                  </button>
                </div>
              </nav>

              <div className="tab-content" id="nav-tabContent">
                {/* OVERVIEW */}
                <div
                  className="tab-pane fade show active"
                  id="nav-overview"
                  role="tabpanel"
                >
                  <p>{course.deskripsi_course || "No description provided."}</p>
                </div>

                {/* CURRICULUM (statis dulu) */}
                <div
                  className="tab-pane fade"
                  id="nav-curriculum"
                  role="tabpanel"
                >
                  <div className="cd_curriculum">
                    <h3>Course Curriculum</h3>
                    <ul>
                      {materi.length > 0 ? (
                        materi.map((m) => (
                          <li key={m.id_materi}>
                            <span>
                              <i className="bx bx-folder"></i> {m.judul_materi}
                            </span>

                            {/* --- BAGIAN YANG DIPERBAIKI --- */}
                            <span className="cd_cur_right">
                              {m.file_materi ? (
                                <a
                                  href={`http://localhost:5000${m.file_materi.startsWith("/") ? "" : "/"
                                    }${m.file_materi}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ textDecoration: 'underline' }} // Opsional: agar terlihat seperti link
                                >
                                  PDF
                                </a>
                              ) : (
                                "Content"
                              )}
                            </span>
                            {/* --- AKHIR BAGIAN --- */}

                            {quiz[m.id_materi] && quiz[m.id_materi].map((q) => (
                              <div className="ms-4" key={q.id_quiz}>
                                <i className="bx bx-play-circle"></i> Quiz: {q.title}

                                {/* --- TAMBAHAN UNTUK LINK SOAL --- */}
                                {q.soal_quiz && (
                                  <a
                                    href={`http://localhost:5000${q.soal_quiz.startsWith("/") ? "" : "/"
                                      }${q.soal_quiz}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ms-3" // Beri sedikit jarak
                                    style={{ textDecoration: 'underline' }}
                                  >
                                    (Lihat Soal PDF)
                                  </a>
                                )}
                                {/* --- AKHIR TAMBAHAN --- */}

                              </div>
                            ))}
                          </li>
                        ))
                      ) : (
                        <li>Belum ada materi</li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* INSTRUCTOR */}
                <div
                  className="tab-pane fade"
                  id="nav-instructor"
                  role="tabpanel"
                >
                  <div className="cd_instructor">
                    <div className="cdin_image">
                      <img
                        src={
                          course.foto_instruktur
                            ? `http://localhost:5000${course.foto_instruktur.startsWith("/") ? "" : "/"
                            }${course.foto_instruktur}`
                            : "/assets/img/review/default.jpg"
                        }
                        alt={course.nama_instruktur}
                      />
                    </div>

                    <div className="cdin_content">
                      <h4>{course.nama_instruktur}</h4>
                      <span>{course.bidang_instruktur || "Instructor"}</span>
                      <p>{course.deskripsi_instruktur || "No biography available."}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BAGIAN KANAN */}
            <div className="col-xl-4 wow fadeIn">
              <div className="course-sidebar">
                <h3>Course Features</h3>
                <ul className="scourse_list">
                  <li>
                    <span className="cside-label">
                      <i className="fa-regular fa-clock"></i> Duration
                    </span>
                    <span className="cside-value">
                      {course.durasi_course || "N/A"}
                    </span>
                  </li>

                  <li>
                    <span className="cside-label">
                      <i className="fa-regular fa-file"></i> Lessons
                    </span>
                    <span className="cside-value">
                      {course.lessons || "N/A"}
                    </span>
                  </li>

                  <li>
                    <span className="cside-label">
                      <i className="fa-solid fa-graduation-cap"></i> Students
                    </span>
                    <span className="cside-value">
                      {course.students || 0}
                    </span>
                  </li>
                </ul>

                <div className="text-center">
                  <a href="#" className="bg_btn bt">
                    Daftar Course
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
