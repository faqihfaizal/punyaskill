import React from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  Input, // InputGroupAddon diganti dengan InputGroupText
} from "reactstrap";

import { Messages, Notifications } from "components";

// gunakan routes khusus university (pastikan alias 'routes' ada di vite.config.js)
import dashboardRoutes from "routes/university.jsx";

// gunakan Vite env var (jika tidak di-set, fallback ke empty string)
const IMGDIR = import.meta.env.VITE_IMGDIR || "";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.sidebarToggle = React.createRef();
    this.chatToggle = React.createRef();
    this.state = {
      isOpen: false,
      userddOpen: false,
      searchOpen: false,
      messagesddOpen: false,
      notificationsddOpen: false,
      color: "primary",
      profilename: "Eric Nelson",
      profileimg: "/images/profile/profile.jpg",
    };
    this.toggle = this.toggle.bind(this);
    this.userddToggle = this.userddToggle.bind(this);

  }

  toggle() {
    this.setState((prev) => ({
      isOpen: !prev.isOpen,
      color: prev.isOpen ? "primary" : "white",
    }));
  }
  userddToggle() {
    this.setState((prev) => ({ userddOpen: !prev.userddOpen }));
  }
  searchToggle() {
    this.setState((prev) => ({ searchOpen: !this.state.searchOpen }));
  }
  messagesddToggle() {
    this.setState((prev) => ({ messagesddOpen: !prev.messagesddOpen }));
  }
  notificationsddToggle() {
    this.setState((prev) => ({
      notificationsddOpen: !prev.notificationsddOpen,
    }));
  }

  // helper: match route path to current pathname (flexible: exact or endsWith last 1-2 segments)
  _matchPath(routePath = "", pathname = "") {
    if (!routePath) return false;
    try {
      // normalize
      const rp = String(routePath);
      const pn = String(pathname);
      if (pn === rp) return true;
      // check last two segments (e.g. "university/professors")
      const parts = rp.split("/").filter(Boolean);
      if (parts.length === 0) return false;
      const last = parts.slice(-2).join("/");
      if (last && pn.endsWith("/" + last)) return true;
      const last1 = parts.slice(-1)[0];
      if (last1 && (pn.endsWith("/" + last1) || pn === "/" + last1))
        return true;
      // fallback: contains (less strict)
      if (rp && pn.indexOf(last) !== -1) return true;
    } catch (e) {
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
        // dropdown-style with child array
        if (prop.child && Array.isArray(prop.child)) {
          for (const c of prop.child) {
            if (this._matchPath(c.path, pathname)) {
              name = c.name;
              return true;
            }
          }
        }
        // old template structure with views
        else if (prop.views && Array.isArray(prop.views)) {
          for (const v of prop.views) {
            if (this._matchPath(v.path, pathname)) {
              name = v.name;
              return true;
            }
          }
        }
        // plain entry
        else {
          if (this._matchPath(prop.path, pathname)) {
            name = prop.name;
            return true;
          }
        }
      }
      return false;
    };

    // search top-level routes
    checkList(dashboardRoutes);

    // fallback: try to match part of path (e.g. '/university/students' -> 'Students')
    if (!name) {
      const parts = pathname.split("/").filter(Boolean);
      if (parts.length) {
        const last = parts.slice(-1)[0];
        name = last ? last.charAt(0).toUpperCase() + last.slice(1) : null;
      }
    }

    return name || "University";
  }

  openSidebar() {
    document.documentElement.classList.toggle("nav-toggle");
    // GANTI: if (this.refs.sidebarToggle) this.refs.sidebarToggle.classList.toggle('toggled');
    if (this.sidebarToggle.current)
      this.sidebarToggle.current.classList.toggle("toggled");
    if (window.innerWidth < 993) {
      document.documentElement.classList.remove("nav-toggle-chat");
    }
  }
  openChat() {
    document.documentElement.classList.toggle("nav-toggle-chat");
    if (window.innerWidth < 993) {
      document.documentElement.classList.remove("nav-toggle");
      // GANTI: if (this.refs.sidebarToggle) this.refs.sidebarToggle.classList.remove('toggled');
      if (this.sidebarToggle.current)
        this.sidebarToggle.current.classList.remove("toggled");
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
    if (this.props.navtype === "mini") {
      document.documentElement.classList.add("nav-toggle");
      // GANTI: if (this.refs.sidebarToggle) this.refs.sidebarToggle.classList.add('toggled');
      if (this.sidebarToggle.current)
        this.sidebarToggle.current.classList.add("toggled");
    } else {
      document.documentElement.classList.remove("nav-toggle");
      // GANTI: if (this.refs.sidebarToggle) this.refs.sidebarToggle.classList.remove('toggled');
      if (this.sidebarToggle.current)
        this.sidebarToggle.current.classList.remove("toggled");
    }
    window.addEventListener("resize", this.updateColor.bind(this));

    // admintype only changes displayed profile image & name — keep for university
    const admintype = this.props.admintype || "university";
    if (admintype === "general") {
      this.setState({
        profileimg: "/images/profile/profile-general.jpg",
        profilename: "Nancy Spencer",
      });
    } else if (admintype === "hospital") {
      this.setState({
        profileimg: "/images/profile/profile-hospital.jpg",
        profilename: "Dianna Austin",
      });
    } else if (admintype === "university") {
      this.setState({
        profilename: "Henry Gibson",
        profileimg: "/images/profile/profile-university.jpg",
      });
    } else if (admintype === "crm") {
      this.setState({
        profilename: "Rick Woods",
        profileimg: "/images/profile/profile-crm.jpg",
      });
    } else {
      // default fallback
      this.setState({
        profilename: "Nancy Spencer",
        profileimg: "/images/profile/profile-general.jpg",
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      window.innerWidth < 993 &&
      prevProps.history &&
      prevProps.history.location &&
      prevProps.history.location.pathname !== this.props.location.pathname &&
      document.documentElement.className.indexOf("nav-toggle") !== -1
    ) {
      document.documentElement.classList.toggle("nav-toggle");
      // GANTI: if (this.refs.sidebarToggle) this.refs.sidebarToggle.classList.toggle('toggled');
      if (this.sidebarToggle.current)
        this.sidebarToggle.current.classList.toggle("toggled");
    }
    if (
      window.innerWidth < 993 &&
      prevProps.history &&
      prevProps.history.location &&
      prevProps.history.location.pathname !== this.props.location.pathname &&
      document.documentElement.className.indexOf("nav-toggle-chat") !== -1
    ) {
      document.documentElement.classList.toggle("nav-toggle-chat");
    }
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
            : "navbar-absolute fixed-top "
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
                toggle={(e) => this.userddToggle(e)}
                className="userdd"
              >
                <DropdownToggle caret nav>
                  <img
                    src={this.state.profileimg}
                    alt="profile"
                    className="avatar-image"
                  />{" "}
                  <span>{this.state.profilename}</span>
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem tag="a">
                    <i className="i-wrench"></i> Settings
                  </DropdownItem>
                  <DropdownItem tag="a">
                    <i className="i-user"></i> Profile
                  </DropdownItem>
                  <DropdownItem tag="a">
                    <i className="i-info"></i> Help
                  </DropdownItem>
                  <DropdownItem tag="a" className="" href="#!">
                    <i className="i-lock"></i> Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
s
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
