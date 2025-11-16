import React from "react";

class University extends React.Component {
  render() {
    const user = JSON.parse(localStorage.getItem("user")); // ambil dari localStorage
    const nama = user?.fullname || "Pengguna"; // fallback kalau user null

    return (
      <div className="content">
        <div className="page-title">
          <div className="float-left">
            <h1 className="title">Dashboard Admin</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div
              style={{
                padding: "40px",
                textAlign: "center",
                background: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <h2>Selamat Datang, {nama}</h2>
              <p>Anda berhasil masuk ke dashboard.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default University;
