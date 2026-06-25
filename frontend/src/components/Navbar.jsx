function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">🌱 EcoConnect</h2>

      <ul className="nav-links">
        <li>Home</li>
        <li>Events</li>
        <li>Community</li>
        <li>About</li>
      </ul>

      <button className="join-btn">
        Join Event
      </button>
    </nav>
  );
}

export default Navbar;