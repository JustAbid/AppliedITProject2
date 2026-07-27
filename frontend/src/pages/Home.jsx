import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Mission from "../components/Mission";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";
import StatCard from "../components/ui/StatCard";
import SectionHeader from "../components/ui/SectionHeader";
import TestimonialCard from "../components/ui/TestimonialCard";
import CTASection from "../components/ui/CTASection";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";
import { SkeletonCard } from "../components/ui/LoadingSkeleton";
import { fetchEvents, fetchStats, fetchTestimonials } from "../services/api";
import "../styles/Home.css";

function Home() {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState([]);
  const [testimonial, setTestimonial] = useState(null);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchEvents().then((data) => {
      if (isMounted) {
        setEvents(data.slice(0, 4));
        setLoadingEvents(false);
      }
    });
    fetchStats("home").then((data) => isMounted && setStats(data));
    fetchTestimonials("home").then((data) => isMounted && setTestimonial(data[0] || null));

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        {stats.length > 0 && (
          <section className="home-impact-strip">
            <div className="container home-impact-grid">
              {stats.map((stat) => (
                <StatCard key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} variant="plain" />
              ))}
            </div>
          </section>
        )}

        <Mission />
        <HowItWorks />

        <section className="section featured-events">
          <div className="container">
            <SectionHeader
              eyebrow="Featured Upcoming Events"
              title="Find something happening near you"
              description="A selection of upcoming clean-ups, workshops, and community days ready for volunteers."
            />

            <div className="featured-events-grid">
              {loadingEvents
                ? Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)
                : events.map((event, index) => (
                    <Reveal key={event.id} delay={index * 80}>
                      <EventCard event={event} />
                    </Reveal>
                  ))}
            </div>

            <div className="featured-events-action">
              <Button to="/events" variant="secondary">
                View all events
              </Button>
            </div>
          </div>
        </section>

        <Features />

        {testimonial && (
          <section className="section home-testimonial">
            <div className="container home-testimonial-inner">
              <SectionHeader eyebrow="Community Testimonial" title="Volunteers who found their people" />
              <TestimonialCard
                quote={testimonial.quote}
                authorName={testimonial.author_name}
                authorRole={testimonial.author_role}
                image={testimonial.image_url}
              />
            </div>
          </section>
        )}

        <CTASection
          title="Ready to turn your free time into positive impact?"
          description="Join thousands of volunteers already making a measurable difference in their local communities."
        >
          <Button to="/events" size="lg">
            Browse Events
          </Button>
          <Button to="/community" size="lg" variant="secondary">
            Become an Organiser
          </Button>
        </CTASection>
      </main>
      <Footer />
    </>
  );
}

export default Home;
