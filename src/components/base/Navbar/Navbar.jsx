import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import logo from '../../../assets/images/logo.png';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  closeOffcanvas = () => {
    const offcanvasEl = document.getElementById('offcanvasNavbar');
    if (offcanvasEl) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl) || new bootstrap.Offcanvas(offcanvasEl);
      bsOffcanvas.hide();
    }
  };

  defaultNavbar = () => {
    const { SessionStore } = this.context.store;
    let currentUser = SessionStore.currentUser;

    return (
      <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">

          <div className='navbar_items_ctr'>
            <div className='header_icon'>
              <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <i class="bi bi-list"></i>
              </button>

              <Link className="navbar-brand" to="/dashboard">
                <img src={logo} alt='eastLogoHere' />
                <div className='nav_hdr_logo'>
                  <span className='hdr_one'>
                    eBarangayConnect
                  </span>
                  <span className='hdr_two'>
                    Your Community, Your Voice.
                  </span>
                </div>
              </Link>
            </div>

            <div className='user_info'>
              <div className='user_icon'>
                <span>{currentUser.initialsInNav}</span>
              </div>
              <div className='user_nm_dt'>
                <span className='nm'>{currentUser.displayNmInNav}</span>
                <span className='dt'>{currentUser.lastLoginDtString}</span>
              </div>
              <div className='user_viewProfile'>
                <button class="btn" type="button" data-bs-toggle="dropdown">
                  <i class="bi bi-caret-down-fill"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/myProfile" onClick={this.closeOffcanvas}>
                      <i class="bi bi-person-circle"></i>My Profile
                    </Link>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={async (e) => {
                        e.preventDefault();
                        const { SessionStore } = this.context.store;

                        try {
                          // Call backend logout endpoint
                          await fetch("http://localhost:8080/auth/login/logout", {
                            method: "POST",
                            credentials: "include" // important to send session cookie
                          });

                          // Clear frontend session
                          SessionStore.setUser(null);

                          // Redirect to login page
                          window.location.href = "/"; // or use navigate from react-router
                        } catch (err) {
                          console.error("Logout failed", err);
                        }
                      }}
                    >
                      <i className="bi bi-box-arrow-right"></i> Logout
                    </a>
                  </li>
                </ul>

              </div>
            </div>
          </div>

          <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <img src={logo} alt='eastLogoHere' />
              <span>
                eBarangayConnect
              </span>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body">
              <div className='is_menu'>
                <span>
                  Menu
                </span>
              </div>
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard" onClick={this.closeOffcanvas}>
                    <i class="bi bi-house-door-fill"></i>Dashboard
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="bi bi-people-fill"/>Users Management
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/usersAdd" onClick={this.closeOffcanvas}>
                        <i class="bi bi-caret-right-fill"></i>Add New User
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/usersSearch" onClick={this.closeOffcanvas}>
                        <i class="bi bi-caret-right-fill"></i>Search User
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-video3"></i>Teacher Management
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/teacherAdd" onClick={this.closeOffcanvas}>
                        <i className="bi bi-caret-right-fill"></i>Add New Teacher
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/teacherSearch" onClick={this.closeOffcanvas}>
                        <i className="bi bi-caret-right-fill"></i>Search Teacher
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i className="bi bi-journal-text"></i>Subject Management
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/subjectAdd" onClick={this.closeOffcanvas}>
                        <i className="bi bi-caret-right-fill"></i>Add New Subject
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/subjectSearch" onClick={this.closeOffcanvas}>
                        <i className="bi bi-caret-right-fill"></i>Search Subjects
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i className="bi bi-stickies"></i>Section Management
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/sectionAdd" onClick={this.closeOffcanvas}>
                        <i className="bi bi-caret-right-fill"></i>Add New Section
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/sectionSearch" onClick={this.closeOffcanvas}>
                        <i className="bi bi-caret-right-fill"></i>Search Section
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="bi bi-diagram-3-fill"></i>Admin Management
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/adminAdd" onClick={this.closeOffcanvas}>
                        <i className="bi bi-caret-right-fill"></i>Add New System Admin
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/adminSearch" onClick={this.closeOffcanvas}>
                        <i className="bi bi-caret-right-fill"></i>Search System Admin
                      </Link>
                    </li>
                  </ul>
                </li> */}
                <li className="nav-item">
                  <Link className="nav-link" to="/systemSettings" onClick={this.closeOffcanvas}>
                    <i class="bi bi-gear-fill"></i>System Configuration
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  };

  render() {
    return this.defaultNavbar();
  }
};

Navbar.contextType = StoreContext;

export default observer(Navbar);
