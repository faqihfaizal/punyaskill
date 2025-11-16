import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'reactstrap';
import { useLocation } from 'react-router-dom'; // 👈 Import useLocation
// import Sidebar from './Sidebar'; // Import Class Component Sidebar lama
// import { Navmenudropdown } from 'components';
// import { Navmenugroup } from 'components';

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';
//import useravatar from "assets/img/profile.jpg";
import logofull from "assets/img/logo-full.png";
import logomini from "assets/img/logo-mini.png";
import logofulldark from "assets/img/logo-full-dark.png";
import logominidark from "assets/img/logo-mini-dark.png";

function SidebarWrapper(props) {
    const location = useLocation(); // 👈 Dapatkan objek location dari hook RRD v6
    // Kirim location sebagai prop ke Class Component
    return <Sidebar {...props} location={location} />;
}

var ps;
var currentmenu = "notset";

var IMGDIR = import.meta.env.VITE_IMGDIR; // ✅ Solusi untuk Vite

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        // Tambahkan Ref di sini:
        this.sidebarRef = React.createRef(); // 👈 Tambah ini
        this.activeRoute.bind(this);
        this.state = {
            opendd: '',
            openmenu: 'none',
            profilename: 'Eric Nelson',
            profileimg: IMGDIR + '/images/profile/profile.jpg',
            profileposition: 'Web Developer',
        };
        this.handleOpendd = this.handleOpendd.bind(this);
        this.handlecurrent = this.handlecurrent.bind(this);

    }

    handlecurrent(currentmenu) {
        //console.log("handlecurrent"+currentmenu);
        if (this.state.opendd !== "") {
            currentmenu = "";
        }
    }

    handleOpendd(open) {
        currentmenu = "";
        if (this.state.opendd === open) {
            this.setState({
                opendd: ''
            });
        } else {
            this.setState({
                opendd: open
            });
        }
        //currentmenu = "";
        //console.log(open + this.state.opendd);
    }


    // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? ' active' : '';
    }
    componentDidMount() {

        if (this.props.admintype === 'general') {
            this.setState({
                profileposition: 'Web Developer',
                profileimg: '/images/profile/profile-general.jpg',
                profilename: 'Nancy Spencer'
            });
        } else if (this.props.admintype === 'university') {
            this.setState({
                profileposition: 'Professor',
                profilename: 'Henry Gibson',
                profileimg: '/images/profile/profile-university.jpg'
            });
        } else {
            this.setState({
                profileposition: 'Web Developer',
                profilename: 'Nancy Spencer',
                profileimg: '/images/profile/profile-general.jpg'
            });
        }

        if (navigator.platform.indexOf('Win') > -1) {
            ps = new PerfectScrollbar(this.sidebarRef.current, { suppressScrollX: true, suppressScrollY: false });
        }

        //console.log(this.props.location.pathname);


    }
    componentWillUnmount() {
        if (navigator.platform.indexOf('Win') > -1 && ps) {
            ps.destroy();
        }
    }
    render() {

        const children = (child, parent) => {
            var links = [];
            if (child) {
                for (var i = 0; i < child.length; i++) {
                    links.push(
                        <li key={i}>
                            <NavLink
                                to={child[i].path}
                                className={({ isActive }) =>
                                    isActive ? 'nav-link active' : 'nav-link'
                                }
                            >
                                <span>{child[i].name}</span>
                            </NavLink>
                        </li>
                    );
                    //console.log(child[i].parent + this.props.location.pathname + child[i].path);
                    if (this.props.location.pathname === child[i].path) {
                        //console.log("match found " + child[i].parent);
                        if (currentmenu === "notset" && this.state.opendd === "") {
                            currentmenu = parent; //child[i].parent;
                        }
                    }
                    if (this.props.location.pathname === "/") {
                        currentmenu = "dashboards";
                    }
                }

                //console.log(currentmenu);
                //console.log(this.props.location.pathname);
                //console.log(parent);
                return <Nav>{links}</Nav>
            }
        }



        return (
            <div className="sidebar menubar " >

                <div className="logo">
                    <a href="/" className="logo-mini">
                        <div className="logo-img">
                            <img src={logomini} alt="react-logo" className="light-logo" />
                            <img src={logominidark} alt="react-logo" className="dark-logo" />
                        </div>
                    </a>
                    <a href="/" className="logo-full">
                        <img src={logofull} alt="react-logo" className="light-logo" />
                        <img src={logofulldark} alt="react-logo" className="dark-logo" />
                    </a>
                </div>

                <div className="sidebar-wrapper" ref={this.sidebarRef}>


                    <Nav className="navigation">
                        {
                            this.props.routes.map((prop, key) => {
                                if (prop.redirect)
                                    return null;
                                if (prop.type === "child")
                                    return null;
                                if (prop.type === "navgroup")
                                    return (
                                        <Navmenugroup name={prop.name} key={key}>
                                        </Navmenugroup>
                                    );
                                if (prop.type === "dropdown")
                                    return (

                                        <li className={(prop.parentid) + " " + ((((prop.parentid === currentmenu) && (prop.parentid !== "") && (prop.parentid !== "multipurpose")) || (this.state.opendd === prop.name)) ? 'active' : '') + ' nav-parent '} data-toggle="collapse" key={key}>
                                            <a to={prop.path} className="nav-link" onClick={() => this.handleOpendd(prop.name)} href="#!">
                                                <i className={"i-" + prop.icon}></i>
                                                <p>{prop.name}</p>
                                                <span className="badge">{prop.badge}</span>
                                                <span className={"arrow i-arrow-left"}></span>
                                            </a>
                                            {children(prop.child, prop.parentid)}
                                        </li>

                                    );

                                if (prop.type === "dropdown-backup")
                                    return (
                                        <Navmenudropdown name={prop.name} icon={prop.icon} path={prop.path} badge={prop.badge} child={prop.child} key={key} openclass={this.state.opendd === prop.name ? 'activethis' : ''} onClick={() => this.handleOpendd(prop.name)}>
                                        </Navmenudropdown>
                                    );
                                return (
                                    <li className={this.activeRoute(prop.path) + ' nav-parent '} key={key} onClick={() => this.handleOpendd(prop.name)}>
                                        <NavLink
                                            to={prop.path}
                                            className={({ isActive }) =>
                                                isActive ? 'nav-link active' : 'nav-link'
                                            }
                                        >
                                            <i className={"i-" + prop.icon}></i>
                                            <p>{prop.name}</p>
                                            <span className="badge">{prop.badge}</span>
                                        </NavLink>
                                    </li>
                                );
                            })

                        }

                    </Nav>
                </div>



            </div>
        );
    }
}

// UBAH BARIS INI: Ekspor SidebarWrapper, BUKAN Sidebar
export default SidebarWrapper; // ✅ SOLUSI: Export komponen yang menggunakan useLocation!
