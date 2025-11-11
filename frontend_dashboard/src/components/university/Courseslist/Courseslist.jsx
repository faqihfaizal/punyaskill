import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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
                setCourses(response.data.data || []);
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
                                            {course.title}
                                        </NavLink>
                                    </h5>
                                    <small className="text-muted">
                                        {course.skill_level || "Beginner"} /{" "}
                                        {course.duration || "-"}
                                    </small>
                                    <p className="mt-2 mb-0 small text-secondary">
                                        {course.description
                                            ? `${course.description.slice(0, 80)}...`
                                            : "Tidak ada deskripsi"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
