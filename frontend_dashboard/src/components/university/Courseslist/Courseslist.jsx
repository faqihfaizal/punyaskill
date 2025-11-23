import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom"; // ⬅️ Link ditambah
import api from "../../../services/api";

const BASEDIR = import.meta.env.VITE_REACT_APP_BASEDIR;


export default function Courseslist() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // 1. Logika fetch disamakan dengan Professorlist
                const response = await api.get("/api/course");
                // 2. State diset dengan response.data (bukan response.data.data)
                setCourses(response.data || []);
            } catch (error) {
                console.error("Error fetching courses:", error);
                setError("Gagal memuat data course.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []); // Dijalankan sekali saat komponen dimuat

    if (loading) return <p>Loading courses...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (courses.length === 0) return <p>Tidak ada course tersedia.</p>;

    return (
        <div className="row">
            {courses.map((course) => {
                const thumbnailUrl = course.thumbnail
                    ? `http://localhost:5000${course.thumbnail.startsWith('/') ? '' : '/'}${course.thumbnail}`
                    : "/default-course.jpg";

                return (
                    <div
                        className="col-md-6 col-lg-6 col-sm-12 mb-4"
                        key={course.id_course}
                    >
                        <div className="team-member aside-style p-2 border rounded shadow-sm">
                            <div className="row margin-0">
                                {/* Thumbnail */}
                                <div className="team-img col-4">
                                    <img
                                        className="img-fluid rounded"
                                        src={thumbnailUrl}
                                        alt={course.title}
                                        style={{
                                            objectFit: "cover",
                                            height: "100px",
                                            width: "100%",
                                        }}
                                        onError={(e) => (e.target.src = "/default-course.jpg")}
                                    />
                                </div>

                                {/* Info */}
                                <div className="team-info col-8">
                                    <h5 className="mb-1">
                                        <NavLink
                                            to={`${BASEDIR}/university/course-view/${course.slug}`}
                                            className="text-decoration-none text-dark"
                                        >
                                            {course.judul_course}
                                        </NavLink>
                                    </h5>
                                    <small className="text-muted">
                                        {course.skill_level || "Beginner"} /{" "}
                                        {course.durasi_course || "-"}
                                    </small>
                                    <p className="mt-2 mb-0 small text-secondary">
                                        {course.deskripsi_course
                                            ? `${course.deskripsi_course.slice(0, 300)}...`
                                            : "Tidak ada deskripsi"}
                                    </p>
                                    <div className="mt-2">
                                        <Link
                                            to={`${BASEDIR}/university/edit-course/${course.slug}`}
                                            className="btn btn-sm btn-primary"
                                        >
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
