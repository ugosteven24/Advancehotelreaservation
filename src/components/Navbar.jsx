import "../css/navbar.css";
import Link from "next/link";
export default function Navbar() {
    return (
        <header className="header">

            <div className="topNav">

                <h2 className="logo">
                    Hotelreserve
                </h2>

                <div className="rightNav">

                    <span>NGN</span>

                    <img
                        src="https://flagcdn.com/w40/us.png"
                        alt=""
                        className="flag"
                    />

                    <span className="help">?</span>

                    <a href="#" className="list-property">List your property</a>
                <Link href="/register">
                    <button className="btnWhite btnRegister">
                        Register
                    </button>
                 </Link>   
                    <Link href="/login">
                        <button className="btnWhite">
                            Sign in
                        </button>
                    </Link>

                </div>

            </div>

            <div className="menu">

                <button className="active">
                    🏠 Home
                </button>

                <button>
                    🏨 Hotels
                </button>

                <button>
                    🔥 Deals
                </button>

                <button>
                    ℹ️ About
                </button>

                <button>
                    📞 Contact
                </button>

            </div>
        </header>
    )
}