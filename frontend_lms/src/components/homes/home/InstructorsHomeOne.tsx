import { useEffect, useState } from "react"
import api from "../../../services/api"

type Props = {
  style_2?: boolean,
  style_3?: boolean,
}

export default function InstructorsHomeOne({ style_2, style_3 }: Props) {
  const [instructors, setInstructors] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/api/instruktur")
        setInstructors(res.data || [])
      } catch (err) {
        console.error("Gagal load instruktur:", err)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <section className={`instructors ${style_3 ? "instyle-2 pb120" : "section-padding"} ${style_2 ? "instyle-2" : ""}`}>
        <div className="container">
          <div className="row">

            <div className="col-xl-8 col-md-8 wow fadeInUp">
              <div className="section-title">
                <span>Talented Instructors</span>
                <h2>Our Expert Instructors</h2>
              </div>
            </div>

            <div className="col-xl-4 col-md-4 align-self-center text-end title_btn wow fadeIn">
              <a href="#" className="bg_btn bt">View All</a>
            </div>

            {/* ===================== LOOP DATA DINAMIS ===================== */}
            {instructors.map((ins: any) => (
              <div key={ins.id_instruktur} className="col-xl-3 col-md-6 col-12 wow fadeIn">
                <div className="single-instructor">

                  <div className="inimage">
                    <img
                      src={
                        ins.foto_instruktur
                          ? `http://localhost:5000${ins.foto_instruktur}`
                          : "assets/img/instructor/1.png"
                      }
                      alt=""
                      style={{
                        objectFit: "cover",
                        height: "350px",
                        width: "100%",
                      }}
                    />
                    <span className="sicon"><a href="#"><i className='bx bx-plus'></i></a></span>

                    <div className="social-link">
                      <ul>
                        <li><a href="#" className="fb_bg"><i className="bx bxl-facebook"></i></a></li>
                        <li><a href="#" className="tw_bg"><i className="bx bxl-twitter"></i></a></li>
                        <li><a href="#" className="li_bg"><i className="bx bxl-linkedin"></i></a></li>
                      </ul>
                    </div>
                  </div>

                  <div className="inbottom">
                    <h3><a href="#">{ins.nama_instruktur}</a></h3>
                    <span className="designation">{ins.bidang_instruktur}</span>

                    {!style_2 && (
                      <div className="inmeta">
                        <span className="float-start">
                          <i className='bx bx-user'></i>
                          <p>{ins.total_students || 0}+ Students</p>
                        </span>

                        <span className="float-end">
                          <i className='bx bx-file-blank'></i>
                          <p>{ins.total_courses || 0} Courses</p>
                        </span>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
    </>
  )
}
