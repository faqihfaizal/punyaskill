import React from "react";
// javascript plugin used to create scrollbars on windows
// import PerfectScrollbar from 'perfect-scrollbar';
import {
  Route,
  Routes,
  Navigate,
  Outlet, // Mengganti Switch dengan Routes (RRD v6)
} from "react-router-dom";

import { Header, Footer, Sidebar, ChatSidebar, Stylebar } from "components";

import dashboardRoutes from "routes/university.jsx";
import {
  topbarStyle,
  menuStyle,
  menuType,
  topbarType,
  navWidth,
  chatWidth,
  chatType,
} from "variables/settings/university.jsx";
import ScrollToTop from "../components/common/ScrollToTop/ScrollToTop.jsx";
//var ps;

class UniversityLayout extends React.Component {
  constructor(props) {
    super(props);
    this.themeWrapper = React.createRef();
    this.mainPanel = React.createRef();
    this.state = {
      menuColor: menuStyle,
      topbarColor: topbarStyle,
      menuType: menuType,
      topbarType: topbarType,
    };
    this.menuSettings = this.menuSettings.bind(this);
    this.topbarSettings = this.topbarSettings.bind(this);
  }

  menuSettings(val1, val2) {
    this.setState({
      menuColor: val1,
      menuType: val2,
    });
  }
  topbarSettings(val1, val2) {
    this.setState({
      topbarColor: val1,
      topbarType: val2,
    });
  }

  componentDidMount() {
    /*if(navigator.platform.indexOf('Win') > -1){
            ps = new PerfectScrollbar(this.refs.mainPanel);
            document.body.classList.toggle("perfect-scrollbar-on");
        }*/
  }
  componentWillUnmount() {
    /*if(navigator.platform.indexOf('Win') > -1){
            ps.destroy();
            document.body.classList.toggle("perfect-scrollbar-on");
        }*/
  }
  // componentDidUpdate(e) {
  //   if(e.history.action === "PUSH"){
  //     this.mainPanel.current.scrollTop = 0; // GANTI DARI: this.refs.mainPanel.scrollTop = 0;
  //     document.scrollingElement.scrollTop = 0;
  //   }
  // }
  render() {
    return (
      <div
        className="wrapper"
        ref={this.themeWrapper}
        data-menu={this.state.menuColor}
        data-topbar={this.state.topbarColor}
        data-menutype={this.state.menuType}
        data-topbartype={this.state.topbarType}
      >
        <Header {...this.props} navtype={navWidth} admintype={"university"} />
        <Sidebar
          {...this.props}
          routes={dashboardRoutes}
          admintype={"university"}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <ScrollToTop mainPanelRef={this.mainPanel} />
          <Routes>
            {dashboardRoutes.map((prop, key) => {
              // Cek apakah prop.component ada sebelum membuat Route
              if (prop.component) {
                // 👈 TAMBAHKAN FILTER INI
                return (
                  <Route
                    path={prop.path}
                    // Pastikan prop.component adalah komponen yang valid
                    element={<prop.component {...this.props} />}
                    key={key}
                  />
                );
              }
              return null; // Abaikan rute yang tidak memiliki komponen (seperti 'dropdown' atau 'navgroup')
            })}
          </Routes>
          <Footer fluid />
        </div>
        <ChatSidebar
          {...this.props}
          routes={dashboardRoutes}
          chatwidth={chatWidth}
          chattype={chatType}
        />
        <Stylebar
          menuSettings={this.menuSettings}
          topbarSettings={this.topbarSettings}
        />
      </div>
    );
  }
}

export default UniversityLayout;
