// Di dalam file InstrukturList.jsx Anda

import React, { useEffect, useState } from "react";
import axios from "axios";
// Impor 'Link' BUKAN 'NavLink' untuk tombol aksi
import { NavLink, Link } from "react-router-dom"; 

// ... (const BASEDIR dan API_URL Anda) ...
const BASEDIR = import.meta.env.VITE_REACT_APP_BASEDIR || "";
const API_URL = "http://localhost:5000/api/instruktur";

export default function InstrukturList() {
  const [instrukturs, setInstrukturs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ... (fungsi fetchInstruktur Anda tetap sama) ...
  const fetchInstruktur = async () => {
    try {
      const res = await axios.get(API_URL);
      setInstrukturs(res.data);
    } catch (err) {
      console.error("Gagal memuat data instruktur:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstruktur();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="row">
      {instrukturs.length > 0 ? (
        instrukturs.map((ins) => (
          <div className="col-md-6 col-lg-4" key={ins.id_instruktur}>
            <div className="team-member">
              {/* ... (Bagian team-img dan team-info Anda) ... */}
              <div className="team-img">
                {/* ... (gambar) ... */}
                <img
                  className="img-fluid rounded "
                  src={
                    ins.foto_instruktur
                      ? `http://localhost:5000${ins.foto_instruktur}`
                      : "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={ins.nama_instruktur}
                />
              </div>
              <div className="team-info text-center mt-3">
                <h3 className="text-lg font-semibold">
                  <NavLink to={`${BASEDIR}/university/professor-profile/${ins.id_instruktur}`}>
                    {ins.nama_instruktur}
                  </NavLink>
                </h3>
                <span className="text-muted">{ins.bidang_instruktur}</span>
                <p className="mt-2 text-sm">{ins.deskripsi_instruktur}</p>
                {/* ... (info lainnya) ... */}

                {/**********************************************
                 * === BAGIAN TOMBOL EDIT === *
                 **********************************************/}
                <div className="team-actions mt-3">
                  {/**
              _    * Link "Edit"
                   * Mengarahkan ke rute: /university/professors/edit/[ID]
                   * Sesuaikan path ini agar sama dengan yang ada di App.jsx
                   */}
                  <Link 
                    to={`/admin/university/edit-professor/${ins.id_instruktur}`} 
                    className="btn btn-sm btn-primary" // Ganti class styling Anda
                  >
                    Edit    
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Tidak ada data instruktur.</p>
      )}
    </div>
  );
}