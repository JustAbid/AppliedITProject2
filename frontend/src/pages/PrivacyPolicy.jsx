import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/ui/PageHero";
import "../styles/LegalPage.css";

function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Legal"
          title="Privacy Policy"
          description="How EcoConnect collects, stores, and uses the information you share when you register for an event."
        />
        <section className="section legal-page">
          <div className="container legal-page-content">
            <h2>What we collect</h2>
            <p>
              When you register for an event we store the details you provide in the registration form — your name,
              email address, phone number, organisation, age, gender, emergency contact details, accessibility
              needs, and your volunteer-preference responses — directly in our Postgres database.
            </p>

            <h2>How we use it</h2>
            <p>
              Your information is used to confirm your place at an event, send optional reminder emails, keep
              organisers informed of attendee numbers, and help us match volunteers with events that suit their
              preferences. We do not sell your data or share it with third parties for marketing purposes.
            </p>

            <h2>Your choices</h2>
            <p>
              Reminder emails are opt-in and can be turned off at any point during registration. If you would like
              your registration data removed, contact us at hello@ecoconnect.org.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;
