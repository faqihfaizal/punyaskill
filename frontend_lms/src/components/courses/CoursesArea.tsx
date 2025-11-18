import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function CoursesArea() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/api/course");
        setCourses(res.data || []);
      } catch (err) {
        console.error("Gagal ambil data course:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <section className="courses section-padding text-center">
        <div className="container">
          <h4>Loading courses...</h4>
        </div>
      </section>
    );
  }

  return (
    <section className="courses section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <p className="ccount_result">
              Showing {courses.length} <span>Courses</span>
            </p>
          </div>

          {courses.map((course) => (
            <div key={course.id_course} className="col-xl-4 col-md-6 col-12 wow fadeIn">
              <div className="single-course">

                {/* Thumbnail */}
                <div className="course-img">
                  <img
                    src={
                      course.thumbnail
                        ? `http://localhost:5000${course.thumbnail.startsWith("/") ? "" : "/"}${course.thumbnail}`
                        : "assets/img/courses/default.jpg"
                    }
                    alt={course.judul_course}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="course_content">
                  
                  {/* Judul */}
                  <h2>
                    <Link to={`/course-details/${course.slug}`}>
                      {course.judul_course}
                    </Link>
                  </h2>

                  {/* Deskripsi */}
                  <p className="mt-2 text-muted">
                    {course.deskripsi_course
                      ? `${course.deskripsi_course.slice(0, 100)}...`
                      : "Tidak ada deskripsi"}
                  </p>

                  {/* Meta info */}
                  <div className="cmeta">
                    <div className="smeta">
                      <i className="bx bx-time-five"></i>
                      {course.durasi_course || "-"}
                    </div>
                    <div className="smeta">
                      <i className="bx bx-bar-chart-alt"></i>
                      {course.skill_level}
                    </div>
                  </div>

                  {/* Instruktur */}
                  <div className="course_btm">
                    <div className="cauthor">
                      <div className="d-flex align-items-center">
                        <img
                          src={
                            course.foto_instruktur
                              ? `http://localhost:5000${course.foto_instruktur.startsWith('/') ? '' : '/'}${course.foto_instruktur}`
                              : "assets/img/review/default.jpg"
                          }
                          alt={course.nama_instruktur}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginRight: "8px",
                          }}
                        />
                        <span>{course.nama_instruktur || "Unknown"}</span>
                      </div>
                    </div>

                    <div className="ccategory">
                      <span>{course.skill_level}</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}

          {courses.length === 0 && (
            <div className="col-12 text-center">
              <p>No courses found.</p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
