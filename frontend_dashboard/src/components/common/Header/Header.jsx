import React from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from "reactstrap";

import dashboardRoutes from "routes/university.jsx"; // route lama tetap dipakai

const IMGDIR = import.meta.env.VITE_IMGDIR || "";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.sidebarToggle = React.createRef();
    this.chatToggle = React.createRef();

    this.state = {
      isOpen: false,
      userddOpen: false,
      color: "primary",
      profilename: "User",
      profileimg: "/images/profile/profile-university.jpg",
    };

    this.toggle = this.toggle.bind(this);
    this.userddToggle = this.userddToggle.bind(this);
    this.logout = this.logout.bind(this);
  }

  // toggle navbar
  toggle() {
    this.setState((prev) => ({
      isOpen: !prev.isOpen,
      color: prev.isOpen ? "primary" : "white",
    }));
  }

  userddToggle() {
    this.setState((prev) => ({ userddOpen: !prev.userddOpen }));
  }

  // fungsi logout
  logout() {
    localStorage.removeItem("user");
    window.location.href = "http://localhost:5173/login"; // arahkan ke halaman login
  }

  // match route name untuk brand title
  _matchPath(routePath = "", pathname = "") {
    if (!routePath) return false;
    try {
      const rp = String(routePath);
      const pn = String(pathname);
      if (pn === rp) return true;

      const parts = rp.split("/").filter(Boolean);
      if (parts.length === 0) return false;

      const last = parts.slice(-2).join("/");
      if (last && pn.endsWith("/" + last)) return true;

      const last1 = parts.slice(-1)[0];
      if (last1 && (pn.endsWith("/" + last1) || pn === "/" + last1)) return true;

      if (rp && pn.indexOf(last) !== -1) return true;
    } catch {
      return false;
    }
    return false;
  }

  getBrand() {
    const pathname =
      (this.props.location && this.props.location.pathname) ||
      window.location.pathname ||
      "";
    let name = null;

    const checkList = (list) => {
      for (const prop of list) {
        if (prop.child && Array.isArray(prop.child)) {
          for (const c of prop.child) {
            if (this._matchPath(c.path, pathname)) {
              name = c.name;
              return true;
            }
          }
        } else if (prop.views && Array.isArray(prop.views)) {
          for (const v of prop.views) {
            if (this._matchPath(v.path, pathname)) {
              name = v.name;
              return true;
            }
          }
        } else {
          if (this._matchPath(prop.path, pathname)) {
            name = prop.name;
            return true;
          }
        }
      }
      return false;
    };

    checkList(dashboardRoutes);

    if (!name) {
      const parts = pathname.split("/").filter(Boolean);
      if (parts.length) {
        const last = parts.slice(-1)[0];
        name = last ? last.charAt(0).toUpperCase() + last.slice(1) : null;
      }
    }

    return name || "Dashboard";
  }

  openSidebar() {
    document.documentElement.classList.toggle("nav-toggle");
    if (this.sidebarToggle.current)
      this.sidebarToggle.current.classList.toggle("toggled");
    if (window.innerWidth < 993) {
      document.documentElement.classList.remove("nav-toggle-chat");
    }
  }

  toggle_grid() {
    document.documentElement.classList.toggle("toggle-grid");
  }

  updateColor() {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({ color: "primary" });
    } else {
      this.setState({ color: "primary" });
    }
  }

  componentDidMount() {
    // ambil data user dari localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      this.setState({
        profilename: user.fullname || "User",
        profileimg: user.photo
          ? user.photo
          : "/images/profile/profile-university.jpg",
      });
    }

    if (this.props.navtype === "mini") {
      document.documentElement.classList.add("nav-toggle");
      if (this.sidebarToggle.current)
        this.sidebarToggle.current.classList.add("toggled");
    } else {
      document.documentElement.classList.remove("nav-toggle");
      if (this.sidebarToggle.current)
        this.sidebarToggle.current.classList.remove("toggled");
    }

    window.addEventListener("resize", this.updateColor.bind(this));
  }

  render() {
    return (
      <Navbar
        expand="lg"
        className={
          this.props.location &&
          this.props.location.pathname &&
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute fixed-top"
            : "navbar-absolute fixed-top"
        }
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref={this.sidebarToggle}
                className="navbar-toggler"
                onClick={() => this.openSidebar()}
              >
                <i className="i-menu"></i>
              </button>
            </div>

            <NavbarBrand href="/">{this.getBrand()}</NavbarBrand>
          </div>

          <Collapse isOpen={this.state.isOpen} navbar className="navbar-right">
            <Nav navbar>
              <Dropdown
                nav
                isOpen={this.state.userddOpen}
                toggle={this.userddToggle}
                className="userdd"
              >
                <DropdownToggle caret nav>
                  <img
                    src={this.state.profileimg}
                    alt="profile"
                    className="avatar-image"
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      marginRight: "8px",
                      objectFit: "cover",
                    }}
                  />
                  <span>{this.state.profilename}</span>
                </DropdownToggle>

                <DropdownMenu end>
                  <DropdownItem tag="a">
                    <i className="i-user"></i> Profile
                  </DropdownItem>
                  <DropdownItem tag="a">
                    <i className="i-wrench"></i> Settings
                  </DropdownItem>
                  <DropdownItem tag="a">
                    <i className="i-info"></i> Help
                  </DropdownItem>
                  <DropdownItem tag="a" href="#!" onClick={this.logout}>
                    <i className="i-lock"></i> Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>

            <div className="screensize" onClick={() => this.toggle_grid()}></div>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
