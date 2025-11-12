// src/components/HeaderOne.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavMenu from "./NavMenu";
import MobileMenu from "./MobileMenu";

/** Tipe user minimal — tambahkan properti kalau backend-mu mengembalikan nama, username, dsb. */
interface User {
  id?: number;
  fullname?: string;
  username?: string;
  email?: string;
  // tambahkan fields lain kalau perlu
}

export default function HeaderOne() {
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState(false);
  const [opneMenu, setOpneMenu] = useState(false);

  // gunakan tipe User, bukan any
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAuth = () => {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");

      if (userStr) {
        try {
          const parsed = JSON.parse(userStr) as User;
          setUser(parsed);
          return;
        } catch (err) {
          // log error supaya lint tidak complain 'unused variable'
          console.warn("Failed to parse stored user:", err);
        }
      }

      if (token && userStr) {
        try {
          const parsed = JSON.parse(userStr);
          setUser(parsed);
        } catch {
          localStorage.removeItem("user");
          setUser(null);
        }
      } else {
        setUser(null);
      }

    };

    loadAuth();

    // dengarkan perubahan localStorage (mis. logout di tab lain)
    const onStorage = (e: StorageEvent) => {
      if (e.key === "token" || e.key === "user") {
        loadAuth();
      }
    };
    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // 🔔 Supaya semua komponen tahu user berubah
    window.dispatchEvent(new Event("storage"));

    setUser(null);
    navigate("/");
  };


  return (
    <>
      <header id="navigation">
        <div className="container-fluid">
          <div className="row">
            <div className="col-30 left-col align-self-center rk_style">
              <div className="site-logo">
                <Link to="/"><img src="assets/img/logo.svg" alt="Edumon" /></Link>
              </div>
            </div>

            <div className="col-40 justify-content-center d-flex align-self-center">
              <nav id="main-menu">
                <NavMenu />
              </nav>
            </div>

            <div className="col-30 right-col align-self-center text-end">
              <div className="searchcart">
                <a style={{ cursor: "pointer" }} onClick={() => setOpen(!open)} className="sicon search-btn">
                  {/* svg omitted for brevity, paste yours */}
                  <svg fill="none" viewBox="0 0 20 20">...</svg>
                </a>
                <div className="cart-icon">
                  {/* perbaikan: toggle harus menggunakan cat, bukan open */}
                  <a style={{ cursor: "pointer" }} onClick={() => setCat(!cat)} className="mcart_open" data-menu="#mini_cart">
                    <svg fill="none" viewBox="0 0 17 19">...</svg>
                  </a>
                  <span>3</span>
                </div>
              </div>

              {/* Rendering berdasarkan auth */}
              {user ? (
                <>
                  <span style={{ marginRight: 10, color: "#fff" }}>
                    {user.fullname || user.username ? `Hi, ${user.fullname || user.username}` : ""}
                  </span>
                  <button onClick={handleLogout} className="white-btn bt">Logout</button>
                </>
              ) : (
                <Link to="/login" className="white-btn bt">Login / Register</Link>
              )}
            </div>

          </div>
        </div>

        {/* isi mini_cart, search_box, mobile menu sama seperti sebelumnya */}
        <div id="mini_cart" className={`cart_drawer ${cat ? 'min_cart_active' : ''}`}>
          {/* ... isi mini cart ... */}
        </div>

        <div className={`search_box ${open ? "active" : ""}`}>
          <div className="close-btn" onClick={() => setOpen(false)} style={{ display: open ? "block" : "none" }}>
            <i className="ti-close"></i>
          </div>
          <div className="search-data" style={{ display: open ? "block" : "none" }}>
            <form onSubmit={e => e.preventDefault()}>
              <input type="text" required />
              <div className={`line ${open ? "active" : ""}`}></div>
              <label style={{ display: open ? "block" : "none" }}>Type to search..</label>
              <button type="submit">
                <span className="ti-search" style={{ display: open ? "block" : "none" }}></span>
              </button>
            </form>
          </div>
        </div>

        <div id="sm_menu_ham" className={`${opneMenu ? "open" : ""}`} onClick={() => setOpneMenu(!opneMenu)}><span></span><span></span><span></span><span></span></div>
        <MobileMenu opneMenu={opneMenu} />

      </header>
    </>
  );
}
