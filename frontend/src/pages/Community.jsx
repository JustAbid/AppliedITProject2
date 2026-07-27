import { useEffect, useState } from "react";
import { Award, Image as ImageIcon, Megaphone, UserPlus } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import StatCard from "../components/ui/StatCard";
import CommunityGroupCard from "../components/ui/CommunityGroupCard";
import TestimonialCard from "../components/ui/TestimonialCard";
import CTASection from "../components/ui/CTASection";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import {
  fetchActivityFeed,
  fetchCommunityGroups,
  fetchGalleryImages,
  fetchStats,
  fetchTestimonials,
} from "../services/api";
import { formatRelativeTime } from "../utils/time";
import "../styles/Community.css";

const ACTIVITY_ICONS = {
  joined_event: UserPlus,
  published_event: Megaphone,
  milestone: Award,
  photo_upload: ImageIcon,
};

function Community() {
  const [stats, setStats] = useState([]);
  const [groups, setGroups] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [activity, setActivity] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchStats("community").then((data) => isMounted && setStats(data));
    fetchCommunityGroups().then((data) => {
      if (isMounted) {
        setGroups(data);
        setLoadingGroups(false);
      }
    });
    fetchTestimonials("community").then((data) => isMounted && setTestimonials(data));
    fetchActivityFeed().then((data) => isMounted && setActivity(data.slice(0, 6)));
    fetchGalleryImages().then((data) => isMounted && setGallery(data));

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="The EcoConnect Community"
          title="Small local actions become powerful when we work together"
          description="Meet volunteers, organisers, students, NGOs, and environmental groups building healthier and greener communities."
        >
          <Button to="/events">Join the Community</Button>
          <Button to="/events" variant="secondary" className="page-hero-secondary-light">
            Explore Community Events
          </Button>
        </PageHero>

        {stats.length > 0 && (
          <section className="section community-impact">
            <div className="container">
              <SectionHeader eyebrow="Community Impact" title="What we've built together" />
              <div className="community-impact-grid">
                {stats.map((stat) => (
                  <StatCard key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section community-groups">
          <div className="container">
            <SectionHeader
              eyebrow="Featured Community Groups"
              title="Find a group that matches your interests"
              description="From student clubs to city-wide NGO coalitions, there's a group ready to welcome you."
            />
            {loadingGroups ? (
              <LoadingSkeleton count={6} />
            ) : (
              <div className="community-groups-grid">
                {groups.map((group, index) => (
                  <Reveal key={group.id} delay={(index % 3) * 80}>
                    <CommunityGroupCard group={group} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {testimonials.length > 0 && (
          <section className="section community-stories">
            <div className="container">
              <SectionHeader eyebrow="Community Stories" title="Volunteers, in their own words" />
              <div className="community-stories-grid">
                {testimonials.map((testimonial, index) => (
                  <Reveal key={testimonial.id} delay={index * 80}>
                    <TestimonialCard
                      quote={testimonial.quote}
                      authorName={testimonial.author_name}
                      authorRole={testimonial.author_role}
                      image={testimonial.image_url}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {activity.length > 0 && (
          <section className="section community-activity">
            <div className="container community-activity-inner">
              <SectionHeader eyebrow="Recent Community Activity" title="What's happening right now" />
              <ul className="community-activity-feed">
                {activity.map((item) => {
                  const Icon = ACTIVITY_ICONS[item.action_type] || UserPlus;
                  return (
                    <li key={item.id}>
                      <span className="community-activity-icon">
                        <Icon size={17} aria-hidden="true" />
                      </span>
                      <div>
                        <p>{item.description}</p>
                        <time>{formatRelativeTime(item.created_at)}</time>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}

        {gallery.length > 0 && (
          <section className="section community-gallery">
            <div className="container">
              <SectionHeader eyebrow="Community Gallery" title="Moments from recent events" />
              <div className="community-gallery-grid">
                {gallery.map((image, index) => (
                  <Reveal key={image.id} delay={(index % 6) * 60} className="community-gallery-item">
                    <img src={image.image_url} alt={image.alt_text} loading="lazy" />
                    <p>{image.caption}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTASection
          title="Find your people. Create your impact."
          description="Join a group, attend an event, or start organising your own — every action adds up."
        >
          <Button to="/events">Browse Events</Button>
          <Button to="/about" variant="secondary">
            Learn About EcoConnect
          </Button>
        </CTASection>
      </main>
      <Footer />
    </>
  );
}

export default Community;
