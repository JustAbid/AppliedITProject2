import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/About.css";

function About() {
  return (
    <>
      <Navbar />
      <main className="about-page">
        <section className="about-hero">
          <div className="about-hero-inner">
            <h1>About EcoConnect</h1>
            <p className="lead">
              EcoConnect is a community-driven platform that helps people discover,
              organize, and participate in local environmental volunteering events.
              The content below is placeholder text and can be replaced with real
              organization details.
            </p>
          </div>
        </section>

        <section className="about-content">
          <div className="container">
            <h2>Platform Overview</h2>
            <p>
              EcoConnect brings together local organizers, volunteers, and
              community groups to make it simple to find meaningful ways to care for
              our environment. From beach cleanups to tree planting and sustainability
              workshops, EcoConnect helps neighbors take action together.
            </p>

            <div className="grid-2">
              <div>
                <h3>Mission</h3>
                <p>
                  To empower communities to protect and restore local ecosystems by
                  making volunteering accessible, inclusive, and impactful.
                </p>
              </div>

              <div>
                <h3>Vision</h3>
                <p>
                  A world where every neighborhood has active stewards working
                  together to create resilient, healthy, and thriving local
                  environments.
                </p>
              </div>
            </div>

            <h3>Core Values</h3>
            <ul className="values">
              <li><strong>Community:</strong> We prioritize local voices and collaboration.</li>
              <li><strong>Inclusion:</strong> Everyone is welcome to take part.</li>
              <li><strong>Impact:</strong> We focus on measurable outcomes for nature.</li>
              <li><strong>Learning:</strong> We share knowledge and grow together.</li>
            </ul>

            <h3>Impact (Sample Data)</h3>
            <div className="stats">
              <div className="stat">
                <div className="stat-value">2,480</div>
                <div className="stat-label">Volunteers Engaged</div>
              </div>
              <div className="stat">
                <div className="stat-value">1,220</div>
                <div className="stat-label">Events Hosted</div>
              </div>
              <div className="stat">
                <div className="stat-value">18,400</div>
                <div className="stat-label">Kg of Waste Collected</div>
              </div>
              <div className="stat">
                <div className="stat-value">3,560</div>
                <div className="stat-label">Trees Planted</div>
              </div>
            </div>

            <h3>Meet the Team (Placeholder)</h3>
            <div className="team-grid">
              <div className="team-member">
                <img src="https://ui-avatars.com/api/?name=Alex+Green&background=2d7a4e&color=fff" alt="Alex Green" />
                <p className="name">Alex Green</p>
                <p className="role">Co-founder & Community Lead</p>
              </div>
              <div className="team-member">
                <img src="https://ui-avatars.com/api/?name=Priya+Khan&background=2d7a4e&color=fff" alt="Priya Khan" />
                <p className="name">Priya Khan</p>
                <p className="role">Programs & Partnerships</p>
              </div>
              <div className="team-member">
                <img src="https://ui-avatars.com/api/?name=Jordan+Lee&background=2d7a4e&color=fff" alt="Jordan Lee" />
                <p className="name">Jordan Lee</p>
                <p className="role">Product & Engineering</p>
              </div>
              <div className="team-member">
                <img src="https://ui-avatars.com/api/?name=Sofia+Martinez&background=2d7a4e&color=fff" alt="Sofia Martinez" />
                <p className="name">Sofia Martinez</p>
                <p className="role">Community Outreach</p>
              </div>
            </div>

            <div className="cta">
              <h3>Get Involved</h3>
              <p>
                Ready to make a difference in your neighborhood? Browse events,
                join a team, or create an event to invite your community.
              </p>
              <a href="/events" className="cta-btn">Find Events</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default About;
