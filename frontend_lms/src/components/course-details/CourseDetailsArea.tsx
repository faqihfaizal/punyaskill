import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import VideoPopup from "../../modals/VideoPopup";


export default function CourseDetailsArea() {

  type CourseType = {
    id_course: number;
    title: string;
    thumbnail: string;
    foto_instruktur?: string;
    nama_instruktur?: string;
    skill_level?: string;
    last_update?: string;
    deskripsi_course?: string;
    durasi_course?: string;
    lessons?: number;
    students?: number;
    bidang_instruktur?: string;
    deskripsi_instruktur?: string;
  };


  // const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const { slug } = useParams(); // ambil id_course dari URL
  const [course, setCourse] = useState<CourseType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [materi, setMateri] = useState([]);
  const [quiz, setQuiz] = useState({});
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [uploads, setUploads] = useState({});
  const [submitted, setSubmitted] = useState<{ [key: number]: string }>({});
  const checkSubmitted = async (id_quiz: number) => {
    try {
      const res = await api.get(`/api/user-quiz/${user.id_user}/${id_quiz}`);
      setSubmitted(prev => ({
        ...prev,
        [id_quiz]: res.data.jawaban_quiz
      }));
    } catch (err) {
      // kalau 404 berarti belum submit, biarkan kosong
    }
  };




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


  useEffect(() => {
    const checkEnroll = async () => {
      if (!user || !course?.id_course) return;

      try {
        const res = await api.get(`/api/user-course/user/${user.id_user}`);
        const exists = res.data.find(c => c.id_course === course.id_course);

        setIsEnrolled(!!exists);
      } catch (err) {
        console.error("Gagal cek enrollment:", err);
      }
    };

    checkEnroll();
  }, [course]);

  useEffect(() => {
    Object.values(quiz).forEach((quizList: any) => {
      quizList.forEach((q: any) => {
        checkSubmitted(q.id_quiz);
      });
    });
  }, [quiz]);






  const handleEnroll = async () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    try {
      await api.post("/api/user-course/", {
        id_user: user.id_user,
        id_course: course.id_course,
      });

      alert("Berhasil daftar!");
      setIsEnrolled(true);
    } catch (err) {
      if (err.response?.data?.message === "User sudah terdaftar di course ini") {
        setIsEnrolled(true);
      } else {
        console.error(err);
      }
    }
  };

  // TARUH DI SINI, DI LUAR useEffect mana pun
  const handleFileChange = (e: any, id_quiz: number) => {
    setUploads((prev) => ({
      ...prev,
      [id_quiz]: e.target.files[0],
    }));
  };

  const handleSubmitQuiz = async (id_quiz: number) => {
    if (!uploads[id_quiz]) {
      alert("Pilih file terlebih dahulu");
      return;
    }

    const formData = new FormData();
    formData.append("jawaban_quiz", uploads[id_quiz]);
    formData.append("id_user", user.id_user);
    formData.append("id_quiz", String(id_quiz));

    try {
      const res = await api.post("/api/user-quiz/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Berhasil upload!");

      // 🔥 TAMBAHKAN DI SINI
      // res.data.jawaban_quiz biasanya sudah berupa path file yg sudah disimpan
      setSubmitted(prev => ({
        ...prev,
        [id_quiz]: res.data.data.jawaban_quiz   // pakai data dari backend, bukan dari nama file local
      }));

    } catch (err) {
      console.log(err);
    }
  };





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
                              <div key={q.id_quiz} className="mt-3">
                                <h5>{q.title}</h5>

                                {!isEnrolled ? (
                                  <p className="text-danger">Daftar course untuk mengerjakan quiz ini.</p>
                                ) : submitted[q.id_quiz] ? (
                                  <>
                                    <p><strong>Jawaban kamu:</strong></p>
                                    <a
                                      href={`http://localhost:5000${submitted[q.id_quiz]}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-success"
                                    >
                                      Lihat Jawaban
                                    </a>
                                  </>
                                ) : (
                                  <>
                                    <input
                                      type="file"
                                      accept="application/pdf"
                                      onChange={(e) => handleFileChange(e, q.id_quiz)}
                                    />
                                    <button
                                      className="btn btn-primary btn-sm mt-2"
                                      onClick={() => handleSubmitQuiz(q.id_quiz)}
                                    >
                                      Upload Jawaban
                                    </button>
                                  </>
                                )}
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
                  {isEnrolled ? (
                    <a
                      href={`/learn/${course.slug}`}
                      className="bg_btn bt"
                      style={{ backgroundColor: "#4CAF50" }}
                    >
                      Mulai Belajar
                    </a>
                  ) : (
                    <button className="bg_btn bt" onClick={handleEnroll}>
                      Daftar Course
                    </button>
                  )}
                </div>


              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
