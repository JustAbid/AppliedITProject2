import SectionHeader from "./ui/SectionHeader";
import Reveal from "./ui/Reveal";
import "../styles/HowItWorks.css";

const STEPS = [
  {
    number: "01",
    title: "Discover an event",
    description: "Browse clean-ups, workshops, and planting days filtered by category, location, and date.",
  },
  {
    number: "02",
    title: "Register in minutes",
    description: "Share a few details and your volunteer preferences through our short registration form.",
  },
  {
    number: "03",
    title: "Volunteer and track your impact",
    description: "Show up, make a difference, and watch the community's collective impact grow.",
  },
];

function HowItWorks() {
  return (
    <section className="section how-it-works">
      <div className="container">
        <SectionHeader eyebrow="How EcoConnect Works" title="From discovery to impact in three steps" />

        <div className="how-it-works-grid">
          {STEPS.map((step, index) => (
            <Reveal key={step.number} delay={index * 100} className="how-it-works-step">
              <span className="how-it-works-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
