import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/ui/PageHero";
import "../styles/LegalPage.css";

function Accessibility() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Legal"
          title="Accessibility"
          description="Our commitment to making EcoConnect usable for every volunteer, organiser, and community member."
        />
        <section className="section legal-page">
          <div className="container legal-page-content">
            <h2>Our commitment</h2>
            <p>
              EcoConnect is built with semantic HTML, visible keyboard focus states, descriptive alt text, and
              accessible colour contrast across both light and dark themes. Every interactive element can be reached
              and operated using a keyboard alone.
            </p>

            <h2>Event accessibility</h2>
            <p>
              Our registration form includes a dedicated field for accessibility or support requirements so
              organisers can prepare accordingly. If an event listing is missing information you need, contact the
              organiser directly using the details on the event page.
            </p>

            <h2>Feedback</h2>
            <p>
              If you encounter an accessibility barrier anywhere on EcoConnect, please let us know at
              hello@ecoconnect.org so we can address it.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Accessibility;
