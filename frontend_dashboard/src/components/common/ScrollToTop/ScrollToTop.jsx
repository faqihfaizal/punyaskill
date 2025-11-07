import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop(props) {
  const location = useLocation();

  useEffect(() => {
    // Mengakses elemen yang sama dengan this.mainPanel.current
    // Asumsi: Anda meneruskan ref sebagai prop, atau elemen main-panel memiliki ID unik.
    // Jika tidak, kita hanya menggunakan scroll global:
    window.scrollTo(0, 0); 
    
    // Jika Anda ingin elemen spesifik yang di-scroll:
    if (props.mainPanelRef && props.mainPanelRef.current) {
        props.mainPanelRef.current.scrollTop = 0;
    }
  }, [location.pathname, props.mainPanelRef]); // Pemicu pada perubahan path

  return null; // Komponen ini tidak me-render apa pun
}

export default ScrollToTop;