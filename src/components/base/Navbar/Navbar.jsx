import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import logo from '../../../assets/images/logo.png';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state={
      profileImage: null,
    };
  }

  componentDidMount() {
    const { SessionStore } = this.context.store;
    const currentUser = SessionStore.currentUser;

    if (currentUser?.userId) {
      // Load profile image from localStorage for this user
      const savedImage = localStorage.getItem(`profileImage_${currentUser.userId}`);
      if (savedImage) {
        this.setState({ profileImage: savedImage });
      }
    }
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
    let isAdminUser = currentUser.roleKey===2;
    const { profileImage } = this.state;

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
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                  />
                ) : (
                  <span>{currentUser.initialsInNav}</span>
                )}
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
                          await fetch("http://localhost:8080/auth/login/logout", {
                            method: "POST",
                            credentials: "include"
                          });

                          // Clear frontend session
                          SessionStore.setUser(null);

                          // Redirect to login page
                          window.location.href = "/";
                        } catch (err) {
                          console.error("Logout failed", err);
                        }
                      }}
                    >
                      <i class="bi bi-door-open-fill"></i>Sign Out
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

            <div className="offcanvas-body d-flex flex-column">
              <div className="flex-grow-1">
                <div className='is_menu'>
                  <span>
                    Menu
                  </span>
                </div>
                
                {isAdminUser ? (
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

                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="bi bi-megaphone-fill"></i>Announcement Management
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <Link className="dropdown-item" to="/announcementAdd" onClick={this.closeOffcanvas}>
                            <i class="bi bi-caret-right-fill"></i>Add New Announcement
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/announcementSearch" onClick={this.closeOffcanvas}>
                            <i class="bi bi-caret-right-fill"></i>Search Announcement
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/notificationLogs" onClick={this.closeOffcanvas}>
                        <i class="bi bi-stickies-fill"></i>Notification Logs
                      </Link>
                    </li>
                    
                    <li className="nav-item">
                      <Link className="nav-link" to="/systemSettings" onClick={this.closeOffcanvas}>
                        <i class="bi bi-gear-fill"></i>System Configuration
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item">
                      <Link className="nav-link" to="/dashboard" onClick={this.closeOffcanvas}>
                        <i class="bi bi-house-door-fill"></i>Dashboard
                      </Link>
                    </li>

                    {/* <li className="nav-item">
                      <Link className="nav-link" to="/systemSettings" onClick={this.closeOffcanvas}>
                        <i class="bi bi-person-circle"></i>My Profile
                      </Link>
                    </li> */}

                    <li className="nav-item">
                      <Link className="nav-link" to="/myaccount/announcementLogs" onClick={this.closeOffcanvas}>
                        <i class="bi bi-megaphone-fill"></i>Announcement History
                      </Link>
                    </li>

                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="bi bi-file-earmark-post"></i>Request Document/s
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <Link className="dropdown-item" to="/myaccount/documentRequest" onClick={this.closeOffcanvas}>
                            <i class="bi bi-caret-right-fill"></i>Request Now
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/myaccount/documentHistory" onClick={this.closeOffcanvas}>
                            <i class="bi bi-caret-right-fill"></i>Request History
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/aboutPaliparan" onClick={this.closeOffcanvas}>
                        <i class="bi bi-houses-fill"></i>About Paliparan III
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
              <div className="offcanvas-footer border-top pt-3 mt-3 text-center small">
                <div className='copyright'>©{new Date().getFullYear()} eBarangayConnect</div>
                <div className="text-muted">Your Community, Your Voice.</div>
              </div>
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
