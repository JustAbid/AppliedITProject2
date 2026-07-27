import { Bell, Compass, TrendingUp, Users } from "lucide-react";
import FeatureCard from "./FeatureCard";
import SectionHeader from "./ui/SectionHeader";
import Reveal from "./ui/Reveal";
import "../styles/Features.css";

const FEATURES = [
  {
    icon: Compass,
    title: "Discover local opportunities",
    description: "Find clean-ups, workshops, and planting days happening close to you, filtered by category and date.",
  },
  {
    icon: Users,
    title: "Meet like-minded volunteers",
    description: "Connect with students, professionals, and organisers who share your interest in environmental action.",
  },
  {
    icon: Bell,
    title: "Receive event reminders",
    description: "Opt in to friendly email reminders so you never miss an event you've registered for.",
  },
  {
    icon: TrendingUp,
    title: "Track environmental impact",
    description: "See the collective waste collected, trees planted, and hours volunteered across the community.",
  },
];

function Features() {
  return (
    <section className="section features">
      <div className="container">
        <SectionHeader eyebrow="Why Join EcoConnect" title="Everything you need to create change" />

        <div className="feature-grid">
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 80}>
              <FeatureCard icon={feature.icon} title={feature.title} description={feature.description} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
