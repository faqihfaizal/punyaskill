import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import api from "../../../services/api";

export default function CourseProfile() {
    const { slug } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCourse = async () => {
            try {
                const res = await api.get(`/api/course/${slug}`);
                console.log("DATA COURSE:", res.data);
                setCourse(res.data); // sesuai hasil API kamu
            } catch (err) {
                console.error("Gagal mengambil data:", err);
            }
            setLoading(false);
        };

        getCourse();
    }, [slug]);

    if (loading) return <p>Loading...</p>;
    if (!course) return <p>Course tidak ditemukan.</p>;

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
                                            <img
                                                alt=""
                                                src={`http://localhost:5000${course.thumbnail}`}
                                                className="img-fluid"
                                            />
                                        </div>

                                        <div className="uprofile-name col-xl-10 col-lg-9 col-md-9 col-sm-8 col-12">
                                            <h3 className="uprofile-owner">
                                                <a href="#!">{course.judul_course}</a>
                                            </h3>

                                            <button className="btn btn-primary btn-sm profile-btn">Message</button>
                                            <button className="btn btn-primary btn-sm profile-btn">Subscribe</button>

                                            <div className="clearfix"></div>

                                            <p className="uprofile-title">
                                                Instructor: {course.nama_instruktur}
                                            </p>

                                            <p className="uprofile-title">
                                                Skill Level: {course.skill_level}
                                            </p>

                                            <p className="uprofile-title">
                                                Durasi: {course.durasi_course}
                                            </p>

                                            <div className="clearfix"></div>

                                            <p>{course.deskripsi_course}</p>
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
                            </div>
                        </section>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
