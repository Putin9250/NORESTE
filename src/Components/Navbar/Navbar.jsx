import "./Navbar.scss";
import { FaYoutube, FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa";
import Logo from '../../assets/Logo2.png'

function Navbar() {
  return (
    <header className="navbar">
      <div className="container">

        <div className="logo">
          <img src={Logo} alt="dsf" />
        </div>

        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Research</a>
          <a href="/">Reports</a>
          <a href="/">Contact</a>
        </nav>

        <div className="socials">
          <FaYoutube />
          <FaFacebookF />
          <FaTwitter />
          <FaGithub />
        </div>

      </div>
    </header>
  );
}

export default Navbar;