'use client'
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  FaTachometerAlt,
  FaHotel,
  FaUsers,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaStar,
  FaBullhorn,
  FaChartLine,
  FaBell,
  FaFileAlt,
  FaCog,
  FaShieldAlt,
  FaUserShield,
  FaSignOutAlt,
  FaGlobe,
  FaTags,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaClipboardList,
  FaUserTie,
  FaHistory,
} from "react-icons/fa";




export default function Home() {
  return (
    <>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">

        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="index3.html" className="nav-link">Home</a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link">Contact</a>
          </li>
        </ul>


        <ul className="navbar-nav ml-auto">

          <li className="nav-item">
            <a className="nav-link" data-widget="navbar-search" href="#" role="button">
              <i className="fas fa-search"></i>
            </a>
            <div className="navbar-search-block">
              <form className="form-inline">
                <div className="input-group input-group-sm">
                  <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                  <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                      <i className="fas fa-search"></i>
                    </button>
                    <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-comments"></i>
              <span className="badge badge-danger navbar-badge">3</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <a href="#" className="dropdown-item">

                <div className="media">
                  <img src="dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Brad Diesel
                      <span className="float-right text-sm text-danger"><i className="fas fa-star"></i></span>
                    </h3>
                    <p className="text-sm">Call me whenever you can...</p>
                    <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                  </div>
                </div>

              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">

                <div className="media">
                  <img src="dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      John Pierce
                      <span className="float-right text-sm text-muted"><i className="fas fa-star"></i></span>
                    </h3>
                    <p className="text-sm">I got your message bro</p>
                    <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                  </div>
                </div>

              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">

                <div className="media">
                  <img src="dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Nora Silvester
                      <span className="float-right text-sm text-warning"><i className="fas fa-star"></i></span>
                    </h3>
                    <p className="text-sm">The subject goes here</p>
                    <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                  </div>
                </div>

              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
            </div>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-bell"></i>
              <span className="badge badge-warning navbar-badge">15</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-item dropdown-header">15 Notifications</span>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                <i className="fas fa-envelope mr-2"></i> 4 new messages
                <span className="float-right text-muted text-sm">3 mins</span>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                <i className="fas fa-users mr-2"></i> 8 friend requests
                <span className="float-right text-muted text-sm">12 hours</span>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                <i className="fas fa-file mr-2"></i> 3 new reports
                <span className="float-right text-muted text-sm">2 days</span>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-widget="fullscreen" href="#" role="button">
              <i className="fas fa-expand-arrows-alt"></i>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
              <i className="fas fa-th-large"></i>
            </a>
          </li>
        </ul>
      </nav>


      <aside className="main-sidebar sidebar-dark-primary elevation-4">

        <a href="index3.html" className="brand-link">
          <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: .8 }} />
          <span className="brand-text font-weight-light">AdminLTE 3</span>
        </a>


        <div className="sidebar">

          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <a href="#" className="d-block">Alexander Pierce</a>
            </div>
          </div>


          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw"></i>
                </button>
              </div>
            </div>
          </div>


          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >

              {/* ================= DASHBOARD ================= */}

              <li className="nav-item">
                <Link
                  href="/superadmin/dashboard"
                  className="nav-link "
                >
                  <i className="nav-icon fas fa-tachometer-alt"></i>

                  <p>
                    Dashboard
                  </p>
                </Link>
              </li>


              {/* ================= HOTEL MANAGEMENT ================= */}

              <li className="nav-item">

                <a href="#" className="nav-link">

                  <i className="nav-icon fas fa-hotel"></i>

                  <p>
                    Hotel Management
                    <i className="fas fa-angle-left right"></i>
                  </p>

                </a>

                <ul className="nav nav-treeview">

                  <li className="nav-item">
                    <Link
                      href="/superadmin/hotels/allhotels"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>All Hotels</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/hotels/pending"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Pending Approvals</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/hotels/categories"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Hotel Categories</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/hotels/amenities"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Amenities</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/hotels/locations"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Locations</p>
                    </a>
                  </li>

                </ul>

              </li>


              {/* ================= USERS ================= */}

              <li className="nav-item">

                <a href="#" className="nav-link">

                  <i className="nav-icon fas fa-users"></i>

                  <p>
                    Users
                    <i className="fas fa-angle-left right"></i>
                  </p>

                </a>

                <ul className="nav nav-treeview">

                  <li className="nav-item">
                    <a
                      href="/superadmin/users/guests"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Guests</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/users/hotel-owners"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Hotel Owners</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/users/staff"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Staff</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/users/roles-permissions"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Roles & Permissions</p>
                    </a>
                  </li>

                </ul>

              </li>


              {/* ================= BOOKINGS ================= */}

              <li className="nav-item">

                <a href="#" className="nav-link">

                  <i className="nav-icon fas fa-calendar-alt"></i>

                  <p>
                    Bookings
                    <i className="fas fa-angle-left right"></i>
                  </p>

                </a>

                <ul className="nav nav-treeview">

                  <li className="nav-item">
                    <a
                      href="/superadmin/bookings"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>All Bookings</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/bookings/active"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Active Bookings</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/bookings/completed"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Completed</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/bookings/cancelled"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Cancelled</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/bookings/refunds"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Refund Requests</p>
                    </a>
                  </li>

                </ul>

              </li>


              {/* ================= PAYMENTS ================= */}

              <li className="nav-item">

                <a href="#" className="nav-link">

                  <i className="nav-icon fas fa-credit-card"></i>

                  <p>
                    Payments
                    <i className="fas fa-angle-left right"></i>
                  </p>

                </a>

                <ul className="nav nav-treeview">

                  <li className="nav-item">
                    <a
                      href="/superadmin/payments/transactions"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Transactions</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/payments/payouts"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Payouts</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/payments/commissions"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Commissions</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/payments/refunds"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Refunds</p>
                    </a>
                  </li>

                </ul>

              </li>


              {/* ================= REVIEWS ================= */}

              <li className="nav-item">

                <a href="#" className="nav-link">

                  <i className="nav-icon fas fa-star"></i>

                  <p>
                    Reviews
                    <i className="fas fa-angle-left right"></i>
                  </p>

                </a>

                <ul className="nav nav-treeview">

                  <li className="nav-item">
                    <a
                      href="/superadmin/reviews"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Hotel Reviews</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/reviews/reported"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Reported Reviews</p>
                    </a>
                  </li>

                </ul>

              </li>


              {/* ================= PROMOTIONS ================= */}

              <li className="nav-item">

                <a href="#" className="nav-link">

                  <i className="nav-icon fas fa-bullhorn"></i>

                  <p>
                    Promotions
                    <i className="fas fa-angle-left right"></i>
                  </p>

                </a>

                <ul className="nav nav-treeview">

                  <li className="nav-item">
                    <a
                      href="/superadmin/promotions"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Coupons</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/promotions/featured"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Featured Hotels</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/promotions/advertisements"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Advertisements</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/promotions/banner"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Banners</p>
                    </a>
                  </li>

                </ul>

              </li>


              {/* ================= REPORTS & ANALYTICS ================= */}

              <li className="nav-item">

                <a href="#" className="nav-link">

                  <i className="nav-icon fas fa-chart-line"></i>

                  <p>
                    Reports & Analytics
                    <i className="fas fa-angle-left right"></i>
                  </p>

                </a>

                <ul className="nav nav-treeview">

                  <li className="nav-item">
                    <a
                      href="/superadmin/reportsanalytics/revenue"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Revenue</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/reportsanalytics/bookings"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Bookings</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/reportsanalytics/users"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>User Statistics</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/reportsanalytics/hotels"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Hotel Performance</p>
                    </a>
                  </li>

                </ul>

              </li>


              {/* ================= NOTIFICATIONS ================= */}

              <li className="nav-item">

                <a href="#" className="nav-link">

                  <i className="nav-icon far fa-bell"></i>

                  <p>
                    Notifications
                    <i className="fas fa-angle-left right"></i>
                  </p>

                </a>

                <ul className="nav nav-treeview">

                  <li className="nav-item">
                    <a
                      href="/superadmin/notifications/send"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Send Notification</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/notifications/emailbroadcasts"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Email Broadcast</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/notifications/pushnotifications"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Push Notifications</p>
                    </a>
                  </li>

                </ul>

              </li>


              {/* ================= CMS ================= */}

              <li className="nav-item">

                <a href="#" className="nav-link">

                  <i className="nav-icon fas fa-edit"></i>

                  <p>
                    CMS
                    <i className="fas fa-angle-left right"></i>
                  </p>

                </a>

                <ul className="nav nav-treeview">

                  <li className="nav-item">
                    <a
                      href="/superadmin/cms/homepage"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Homepage</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/cms/aboutus"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>About Us</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/cms/contact"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Contact</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/cms/faq"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>FAQ</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/cms/blog"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Blog</p>
                    </a>
                  </li>

                </ul>

              </li>


              {/* ================= SYSTEM SETTINGS ================= */}

              <li className="nav-item">

                <a href="#" className="nav-link">

                  <i className="nav-icon fas fa-cogs"></i>

                  <p>
                    System Settings
                    <i className="fas fa-angle-left right"></i>
                  </p>

                </a>

                <ul className="nav nav-treeview">

                  <li className="nav-item">
                    <a
                      href="/superadmin/settings/general"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>General Settings</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/settings/payment-gateways"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Payment Gateways</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/settings/email"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Email Settings</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/settings/sms"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>SMS Settings</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/settings/taxes"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Taxes</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/settings/currency"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Currency</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/settings/api-keys"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>API Keys</p>
                    </a>
                  </li>

                </ul>

              </li>


              {/* ================= SECURITY ================= */}

              <li className="nav-item">

                <a href="#" className="nav-link">

                  <i className="nav-icon fas fa-shield-alt"></i>

                  <p>
                    Security
                    <i className="fas fa-angle-left right"></i>
                  </p>

                </a>

                <ul className="nav nav-treeview">

                  <li className="nav-item">
                    <a
                      href="/superadmin/security/login-logs"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Login Logs</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/security/activity-logs"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Activity Logs</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/security/blocked-users"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Blocked Users</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/security/backup"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Backup & Restore</p>
                    </a>
                  </li>

                </ul>

              </li>


              {/* ================= ADMIN MANAGEMENT ================= */}

              <li className="nav-item">

                <a href="#" className="nav-link">

                  <i className="nav-icon fas fa-user-shield"></i>

                  <p>
                    Admin Management
                    <i className="fas fa-angle-left right"></i>
                  </p>

                </a>

                <ul className="nav nav-treeview">

                  <li className="nav-item">
                    <a
                      href="/superadmin/admin-management/admins"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Super Admins</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/admin-management/roles"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Admin Roles</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/superadmin/admin-management/permissions"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon"></i>
                      <p>Permissions</p>
                    </a>
                  </li>

                </ul>

              </li>


              {/* ================= LOGOUT ================= */}

              <li className="nav-item">

                <a
                  href="/superadmin/logout"
                  className="nav-link"
                >

                  <i className="nav-icon fas fa-sign-out-alt"></i>

                  <p>
                    Logout
                  </p>

                </a>

              </li>

            </ul>
          </nav>

        </div>

      </aside>
    </>
  );
}
