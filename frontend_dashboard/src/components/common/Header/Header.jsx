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
import dashboardRoutes from "routes/university.jsx";

/**
 * Header untuk Dashboard Admin
 * Mengambil data user dari localStorage (sinkron dengan LMS)
 * dan bisa logout ke server LMS (localhost:5173)
 */
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.sidebarToggle = React.createRef();

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
    this.loadUser = this.loadUser.bind(this);
  }

  // toggle navbar open/close
  toggle() {
    this.setState((prev) => ({
      isOpen: !prev.isOpen,
      color: prev.isOpen ? "primary" : "white",
    }));
  }

  userddToggle() {
    this.setState((prev) => ({ userddOpen: !prev.userddOpen }));
  }

  // ambil data user dari localStorage
  loadUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.setState({
          profilename: user.fullname || user.username || "User",
          profileimg: user.photo
            ? user.photo
            : "/images/profile/profile-university.jpg",
        });
      } catch (err) {
        console.warn("Invalid user data:", err);
      }
    } else {
      this.setState({
        profilename: "User",
        profileimg: "/images/profile/profile-university.jpg",
      });
    }
  }

  // logout: hapus session dan arahkan balik ke LMS
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // dispatch event agar tab lain ikut tahu
    window.dispatchEvent(new Event("storage"));
    // redirect ke LMS login page
    window.location.href = "http://localhost:3000/login";
  }

  // cari nama halaman aktif berdasarkan route
  _matchPath(routePath = "", pathname = "") {
    if (!routePath) return false;
    try {
      const rp = String(routePath);
      const pn = String(pathname);
      if (pn === rp) return true;
      const parts = rp.split("/").filter(Boolean);
      if (parts.length === 0) return false;
      const last = parts.slice(-1)[0];
      if (pn.endsWith("/" + last) || pn === "/" + last) return true;
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

    for (const route of dashboardRoutes) {
      if (this._matchPath(route.path, pathname)) {
        name = route.name;
        break;
      }
      if (route.child) {
        for (const c of route.child) {
          if (this._matchPath(c.path, pathname)) {
            name = c.name;
            break;
          }
        }
      }
      if (route.views) {
        for (const v of route.views) {
          if (this._matchPath(v.path, pathname)) {
            name = v.name;
            break;
          }
        }
      }
    }

    if (!name) {
      const parts = pathname.split("/").filter(Boolean);
      name = parts.length
        ? parts.slice(-1)[0].charAt(0).toUpperCase() + parts.slice(-1)[0].slice(1)
        : "Dashboard";
    }

    return name;
  }

  openSidebar() {
    document.documentElement.classList.toggle("nav-toggle");
    if (this.sidebarToggle.current)
      this.sidebarToggle.current.classList.toggle("toggled");
  }

  toggle_grid() {
    document.documentElement.classList.toggle("toggle-grid");
  }

  componentDidMount() {
    // load user saat awal
    this.loadUser();

    // pantau perubahan user di localStorage
    window.addEventListener("storage", this.loadUser);

    // handle layout mini nav
    if (this.props.navtype === "mini") {
      document.documentElement.classList.add("nav-toggle");
      if (this.sidebarToggle.current)
        this.sidebarToggle.current.classList.add("toggled");
    } else {
      document.documentElement.classList.remove("nav-toggle");
      if (this.sidebarToggle.current)
        this.sidebarToggle.current.classList.remove("toggled");
    }

    window.addEventListener("resize", this.updateColor?.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("storage", this.loadUser);
  }

  render() {
    return (
      <Navbar
        expand="lg"
        className="navbar-absolute fixed-top"
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

            <div
              className="screensize"
              onClick={() => this.toggle_grid()}
            ></div>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
