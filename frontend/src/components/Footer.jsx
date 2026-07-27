import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, Loader2, Mail, MapPin, Send } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon } from "./ui/SocialIcons";
import { subscribeNewsletter } from "../services/api";
import "../styles/Footer.css";

function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    const result = await subscribeNewsletter(email.trim());
    if (result) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
  }

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <Leaf size={22} aria-hidden="true" />
            EcoConnect
          </Link>
          <p>
            EcoConnect helps volunteers, organisers, and environmental groups discover and run local sustainability
            events across Berlin and beyond.
          </p>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="EcoConnect on Facebook">
              <FacebookIcon size={16} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="EcoConnect on Instagram">
              <InstagramIcon size={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="EcoConnect on X">
              <XIcon size={16} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="EcoConnect on LinkedIn">
              <LinkedinIcon size={16} />
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Events</h3>
          <ul>
            <li><Link to="/events">Browse all events</Link></li>
            <li><Link to="/events?category=Cleanup">Clean-up drives</Link></li>
            <li><Link to="/events?category=Planting">Tree planting</Link></li>
            <li><Link to="/events?category=Education">Workshops</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Community</h3>
          <ul>
            <li><Link to="/community">Community groups</Link></li>
            <li><Link to="/community">Volunteer stories</Link></li>
            <li><Link to="/community">Photo gallery</Link></li>
            <li><Link to="/about">Meet the team</Link></li>
          </ul>
        </div>

        <div className="footer-column footer-newsletter">
          <h3>Stay in the loop</h3>
          <ul className="footer-contact">
            <li>
              <Mail size={16} aria-hidden="true" /> hello@ecoconnect.org
            </li>
            <li>
              <MapPin size={16} aria-hidden="true" /> Berlin, Germany
            </li>
          </ul>
          <form className="footer-newsletter-form" onSubmit={handleSubmit}>
            <label htmlFor="footer-newsletter-email" className="visually-hidden">
              Email address
            </label>
            <input
              id="footer-newsletter-email"
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button type="submit" aria-label="Subscribe to newsletter" disabled={status === "loading"}>
              {status === "loading" ? <Loader2 size={17} className="footer-spin" /> : <Send size={17} />}
            </button>
          </form>
          {status === "success" && <p className="footer-newsletter-status is-success">You&apos;re subscribed!</p>}
          {status === "error" && <p className="footer-newsletter-status is-error">Something went wrong. Try again.</p>}
        </div>
      </div>

      <div className="footer-bottom container">
        <p>© 2026 EcoConnect. Built to support local environmental action.</p>
        <ul>
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/terms">Terms of Service</Link></li>
          <li><Link to="/accessibility">Accessibility</Link></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
