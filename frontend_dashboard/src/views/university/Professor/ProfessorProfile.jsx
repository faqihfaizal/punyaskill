import { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import api from "../../../services/api"; // axios baseURL kamu

export default function ProfessorProfile() {
    const { id_instruktur } = useParams(); // pastikan route: /instruktur/:id
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await api.get(`/api/instruktur/${id_instruktur}`);
                setData(res.data);
            } catch (err) {
                console.error("Gagal mengambil data instruktur:", err);
                setMessage("Gagal memuat data instruktur.");
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [id_instruktur]);

    if (loading) return <p className="content">Loading...</p>;
    if (!data) return <p className="content">Data tidak ditemukan</p>;

    return (
        <div className="content">
            <Row>
                <Col xs={12} md={12}>
                    <div className="page-title">
                        <div className="float-left">
                            <h1 className="title">Instruktur Profile</h1>
                        </div>
                    </div>

                    <div className="col-xl-12">
                        <section className="box profile-page">
                            <div className="content-body">

                                <div className="col-12">
                                    <div className="row uprofile">

                                        <div className="uprofile-image col-xl-2 col-lg-3 col-md-3 col-sm-4 col-12">
                                            <img
                                                alt="foto instruktur"
                                                src={
                                                    data.foto_instruktur
                                                        ? `http://localhost:5000${data.foto_instruktur}`
                                                        : "https://via.placeholder.com/300x200?text=No+Image"
                                                }
                                                className="img-fluid"
                                            />
                                        </div>

                                        <div className="uprofile-name col-xl-10 col-lg-9 col-md-9 col-sm-8 col-12">
                                            <h3 className="uprofile-owner">
                                                <a href="#!">{data.nama_instruktur}</a>
                                            </h3>

                                            <button className="btn btn-primary btn-sm profile-btn">Send message</button>
                                            <button className="btn btn-primary btn-sm profile-btn">Add as friend</button>

                                            <div className="clearfix"></div>

                                            <p className="uprofile-title">{data.bidang_instruktur}</p>

                                            <div className="clearfix"></div>

                                            <p>{data.deskripsi_instruktur}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <hr />
                                    <h4>Biography:</h4>
                                    <p>{data.deskripsi_instruktur}</p>

                                    <hr />
                                    <h4>Bidang Keahlian:</h4>
                                    <ul>
                                        <li>{data.bidang_instruktur}</li>
                                    </ul>

                                </div>
                                

                            </div>
                        </section>
                    </div>

                </Col>
            </Row>
        </div>
    );
}
