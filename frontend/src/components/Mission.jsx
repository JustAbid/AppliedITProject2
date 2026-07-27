import SectionHeader from "./ui/SectionHeader";
import Reveal from "./ui/Reveal";
import "../styles/Mission.css";

function Mission() {
  return (
    <section className="section mission">
      <div className="container">
        <Reveal>
          <SectionHeader
            eyebrow="Our Mission"
            title="Empowering local action for global impact"
            description="EcoConnect brings volunteers, environmental organisations, and local communities together. We make sustainable action easier to discover, organise, and measure."
          />
        </Reveal>
      </div>
    </section>
  );
}

export default Mission;
