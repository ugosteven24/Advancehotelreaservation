import Link from "next/link";

export default function HeaderStart() {
  return (
      <div className="header-top">
        <div className="container">
          <div className="header-left">
            <p className="welcome-msg">
              Welcome to Wolmart Store message or remove it!
            </p>
          </div>

          <div className="header-right">
            {/* Currency */}
            <div className="dropdown">
              <a href="#currency">USD</a>

              <div className="dropdown-box">
                <a href="#USD">USD</a>
                <a href="#EUR">EUR</a>
              </div>
            </div>

            {/* Language */}
            <div className="dropdown">
              <a href="#language">
                <img
                  src="/assets/images/flags/eng.png"
                  alt="ENG Flag"
                  width="14"
                  height="8"
                  className="dropdown-image"
                />
                {" "}ENG
              </a>

              <div className="dropdown-box">
                <a href="#ENG">
                  <img
                    src="/assets/images/flags/eng.png"
                    alt="ENG Flag"
                    width="14"
                    height="8"
                    className="dropdown-image"
                  />
                  {" "}ENG
                </a>

                <a href="#FRA">
                  <img
                    src="/assets/images/flags/fra.png"
                    alt="FRA Flag"
                    width="14"
                    height="8"
                    className="dropdown-image"
                  />
                  {" "}FRA
                </a>
              </div>
            </div>

            <span className="divider d-lg-show"></span>

            <Link href="/blog" className="d-lg-show">
              Blog
            </Link>

            <Link href="/contact-us" className="d-lg-show">
              Contact Us
            </Link>

            <Link href="/my-account" className="d-lg-show">
              My Account
            </Link>

            <Link
              href="/login"
              className="d-lg-show login sign-in"
            >
              <i className="w-icon-account"></i>
              Sign In
            </Link>

            <span className="delimiter d-lg-show">/</span>

            <Link
              href="/register"
              className="ml-0 d-lg-show login register"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
  );
}
