import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import api from "../../../services/api";

export default function StudentList() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStudents = async () => {
        try {
            const res = await api.get("/api/auth/");
            setStudents(res.data);
        } catch (err) {
            console.error("Gagal memuat data student:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // ✅ handleDelete sekarang menerima student yang ingin dihapus
    const handleDelete = async (student) => {
        if (window.confirm(`Yakin ingin menghapus student: ${student.fullname}?`)) {
            try {
                await api.delete(`/api/auth/${student.id_user}`);
                alert("Student berhasil dihapus.");
                fetchStudents(); // refresh list
            } catch (err) {
                console.error("Gagal menghapus student:", err);
                alert("Gagal menghapus student.");
            }
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="row">
            {students.length > 0 ? (
                students.map((st) => (
                    <div className="col-md-6 col-lg-4" key={st.id_user}>
                        <div className="team-member">

                            <div className="team-img d-flex justify-content-center">
                                <img
                                    className="rounded"
                                    src={
                                        st.foto_user
                                            ? `http://localhost:5000${st.foto_user}`
                                            : "https://ui-avatars.com/api/?name=Student&size=300"
                                    }
                                    alt={st.fullname}
                                    style={{
                                        width: "350px",
                                        height: "350px",
                                        objectFit: "cover"
                                    }}
                                />
                            </div>

                            <div className="team-info text-center mt-3">
                                <h3 className="text-lg font-semibold">{st.fullname}</h3>
                                <span className="text-muted">{st.email}</span>
                            </div>

                            <div className="my-3 d-flex justify-content-center">
                                <Button
                                    type="button"
                                    color="danger"
                                    onClick={() => handleDelete(st)}   // ✅ kirim data student
                                >
                                    Hapus Siswa
                                </Button>
                            </div>

                        </div>
                    </div>
                ))
            ) : (
                <p>Tidak ada student.</p>
            )}
        </div>
    );
}
