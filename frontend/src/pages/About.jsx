import { useEffect, useState } from "react";
import {
  Eye,
  Handshake,
  Heart,
  Leaf,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import StatCard from "../components/ui/StatCard";
import TeamCard from "../components/ui/TeamCard";
import CTASection from "../components/ui/CTASection";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";
import team from "../data/team";
import { fetchStats } from "../services/api";
import "../styles/About.css";

const STORY_POINTS = [
  "Environmental events are scattered across social media, flyers, and word of mouth, making them hard to discover.",
  "Information about clean-ups, workshops, and campaigns is fragmented across dozens of disconnected sources.",
  "Volunteers miss opportunities simply because they never hear about events happening near them.",
  "Organisers struggle to reach new participants and often rely on the same small circle of regulars.",
  "Existing listing platforms rarely build real community engagement around the events they list.",
];

const CORE_VALUES = [
  { icon: Users, title: "Community", description: "We prioritise local voices and collaboration over top-down decisions." },
  { icon: Heart, title: "Inclusion", description: "Every volunteer, regardless of background or experience, is welcome to take part." },
  { icon: Leaf, title: "Environmental Impact", description: "We focus on measurable outcomes for nature, not just attendance numbers." },
  { icon: ShieldCheck, title: "Transparency", description: "Event details, capacity, and organiser information stay clear and up to date." },
  { icon: Sparkles, title: "Learning", description: "Every event is a chance to share knowledge and grow more sustainable habits." },
  { icon: Handshake, title: "Collaboration", description: "We connect organisers and volunteers so local efforts reinforce each other." },
];

function About() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    let isMounted = true;
    fetchStats("about").then((data) => isMounted && setStats(data));
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="About EcoConnect"
          title="Technology that brings environmental action closer to everyone"
          description="EcoConnect helps communities discover, organise, and participate in local volunteering activities through one simple and accessible platform."
        />

        <section className="section about-story">
          <div className="container about-story-grid">
            <Reveal>
              <SectionHeader
                align="left"
                eyebrow="Our Story"
                title="Why we built EcoConnect"
                description="Local environmental action is happening everywhere — it's just hard to find, join, and grow."
              />
            </Reveal>
            <Reveal delay={100}>
              <ul className="about-story-list">
                {STORY_POINTS.map((point) => (
                  <li key={point}>
                    <Search size={16} aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="section about-mission-vision">
          <div className="container about-mission-vision-grid">
            <Reveal className="card about-mission-card">
              <span className="about-icon-badge">
                <Target size={22} aria-hidden="true" />
              </span>
              <h3>Mission</h3>
              <p>To make environmental volunteering accessible, inclusive, organised, and rewarding.</p>
            </Reveal>
            <Reveal delay={100} className="card about-mission-card">
              <span className="about-icon-badge">
                <Eye size={22} aria-hidden="true" />
              </span>
              <h3>Vision</h3>
              <p>A future where every neighbourhood has an active community protecting and restoring its local environment.</p>
            </Reveal>
          </div>
        </section>

        <section className="section about-values">
          <div className="container">
            <SectionHeader eyebrow="What We Stand For" title="Core values" />
            <div className="about-values-grid">
              {CORE_VALUES.map((value, index) => (
                <Reveal key={value.title} delay={index * 60} className="card about-value-card">
                  <value.icon size={20} aria-hidden="true" />
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {stats.length > 0 && (
          <section className="section about-stats">
            <div className="container">
              <SectionHeader eyebrow="Our Impact" title="Progress the community has made together" />
              <div className="about-stats-grid">
                {stats.map((stat) => (
                  <StatCard key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section about-team">
          <div className="container">
            <SectionHeader eyebrow="Meet the Team" title="The people behind EcoConnect" />
            <div className="about-team-grid">
              {team.map((member, index) => (
                <Reveal key={member.name} delay={index * 70}>
                  <TeamCard
                    name={member.name}
                    role={member.role}
                    contribution={member.contribution}
                    image={member.image}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CTASection
          title="Become part of the EcoConnect movement"
          description="Whether you volunteer once a year or organise events every month, there's a place for you here."
        >
          <Button to="/events">Browse Events</Button>
          <Button to="/community" variant="secondary">
            Meet the Community
          </Button>
        </CTASection>
      </main>
      <Footer />
    </>
  );
}

export default About;
