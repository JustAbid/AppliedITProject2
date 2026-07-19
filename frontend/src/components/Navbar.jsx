import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">🌱 EcoConnect</Link>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><a href="#">Community</a></li>
        <li><a href="#">About</a></li>
      </ul>

      <Link to="/events" className="join-btn">
        Join Event
      </Link>
    </nav>
  );
}

export default Navbar;