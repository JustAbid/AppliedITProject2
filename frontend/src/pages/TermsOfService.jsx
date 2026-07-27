import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/ui/PageHero";
import "../styles/LegalPage.css";

function TermsOfService() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Legal"
          title="Terms of Service"
          description="The basics of using EcoConnect to discover, register for, and organise environmental volunteering events."
        />
        <section className="section legal-page">
          <div className="container legal-page-content">
            <h2>Using EcoConnect</h2>
            <p>
              EcoConnect is a community platform for discovering and registering for local environmental volunteering
              events. There is no account or sign-up required — registering for an event simply records your details
              against that event in our database.
            </p>

            <h2>Event registrations</h2>
            <p>
              By registering for an event you agree to attend in good faith or to cancel with reasonable notice so
              organisers can offer your place to someone else. Event details, including available spots, are kept
              up to date by organisers and may change.
            </p>

            <h2>Acceptable use</h2>
            <p>
              Please use accurate information when registering and treat other volunteers, organisers, and community
              members with respect at every event and on every page of this platform.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default TermsOfService;
