import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function CoursesArea() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/api/course"); // endpoint backend kamu
        // kalau backend return { data: [...] }
        setCourses(res.data.data || res.data || []);
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
            <div
              key={course.id_course}
              className="col-xl-4 col-md-6 col-12 wow fadeIn"
            >
              <div className="single-course">
                <div className="course-img">
                  <img
                    src={
                      course.thumbnail
                        ? `http://localhost:5000${course.thumbnail.startsWith('/') ? '' : '/'}${course.thumbnail}`
                        : "assets/img/courses/default.jpg"
                    }
                    alt={course.title}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                  <span className="cprice">
                    {course.price ? `Rp ${course.price}` : "Free"}
                  </span>
                </div>

                <div className="course_content">
                  <div className="crating">
                    <a href="#">
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <span>({course.rating || "5"})</span>
                    </a>
                  </div>
<h2> <Link to={`/course-details/${course.slug}`}> {course.title} </Link> </h2>
                 

                  <div className="cmeta">
                    <div className="smeta">
                      <i className="bx bx-user"></i>
                      {course.students || 0} Students
                    </div>
                    <div className="smeta">
                      <i className="bx bx-file"></i>
                      {course.lessons || 0} Lessons
                    </div>
                    <div className="smeta">
                      <i className="bx bx-time-five"></i>
                      {course.duration || "-"}
                    </div>
                  </div>

                  {/* Bagian Instruktur */}
                  <div className="course_btm">
                    <div className="cauthor">
                      <a href="#">
                        <img
                          src={
                            course.foto_instruktur
                              ? `http://localhost:5000${course.foto_instruktur.startsWith('/') ? '' : '/'}${course.foto_instruktur}`
                              : "assets/img/review/default.jpg"
                          }
                          alt={course.nama_instruktur || "Instructor"}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginRight: "8px",
                          }}
                        />
                        <span>{course.nama_instruktur || "Unknown"}</span>
                      </a>
                    </div>

                    <div className="ccategory">
                      <a href="#">{course.category || "General"}</a>
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
