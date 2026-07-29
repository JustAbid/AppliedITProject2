import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchX } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";
import PageHero from "../components/ui/PageHero";
import SearchFilters from "../components/ui/SearchFilters";
import EmptyState from "../components/ui/EmptyState";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";
import HostEventCTA from "../components/ui/HostEventCTA";
import { fetchEvents } from "../services/api";
import "../styles/Events.css";

const PAGE_SIZE = 6;
const SORT_OPTIONS = [
  { value: "date-asc", label: "Date: soonest first" },
  { value: "title-asc", label: "Name: A to Z" },
  { value: "spots-desc", label: "Most spots available" },
];

function parseEventDate(event) {
  const parsed = new Date(`${event.date} ${event.time}`);
  return Number.isNaN(parsed.getTime()) ? new Date(`${event.date}`) : parsed;
}

function Events() {
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [sort, setSort] = useState("date-asc");
  const [view, setView] = useState("grid");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch {
        setError("Unable to load events right now.");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  const categoryOptions = useMemo(
    () => [...new Set(events.map((event) => event.category).filter(Boolean))].sort(),
    [events]
  );
  const locationOptions = useMemo(
    () => [...new Set(events.map((event) => event.location).filter(Boolean))].sort(),
    [events]
  );

  const filteredEvents = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    let result = events.filter((event) => {
      const matchesSearch =
        !searchTerm ||
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm);
      const matchesCategory = !category || event.category === category;
      const matchesLocation = !location || event.location === location;
      const matchesDate = !date || parseEventDate(event) >= new Date(date);

      return matchesSearch && matchesCategory && matchesLocation && matchesDate;
    });

    result = [...result].sort((a, b) => {
      if (sort === "title-asc") return a.title.localeCompare(b.title);
      if (sort === "spots-desc") return (b.available_spots ?? 0) - (a.available_spots ?? 0);
      return parseEventDate(a) - parseEventDate(b);
    });

    return result;
  }, [events, search, category, location, date, sort]);

  function handleClearFilters() {
    setSearch("");
    setCategory("");
    setLocation("");
    setDate("");
    setSort("date-asc");
    setVisibleCount(PAGE_SIZE);
  }

  const visibleEvents = filteredEvents.slice(0, visibleCount);
  const hasMore = visibleCount < filteredEvents.length;

  return (
    <>
      <Navbar />
      <main className="events-page">
        <PageHero
          eyebrow="Community Calendar"
          title="Find your next opportunity to make a difference"
          description="Explore clean-up drives, tree-planting activities, sustainability workshops, community gardens, and environmental campaigns near you."
        />

        <section className="section events-section">
          <div className="container">
            <SearchFilters
              search={search}
              onSearchChange={(value) => {
                setSearch(value);
                setVisibleCount(PAGE_SIZE);
              }}
              category={category}
              onCategoryChange={(value) => {
                setCategory(value);
                setVisibleCount(PAGE_SIZE);
              }}
              categoryOptions={categoryOptions}
              location={location}
              onLocationChange={(value) => {
                setLocation(value);
                setVisibleCount(PAGE_SIZE);
              }}
              locationOptions={locationOptions}
              date={date}
              onDateChange={(value) => {
                setDate(value);
                setVisibleCount(PAGE_SIZE);
              }}
              sort={sort}
              onSortChange={setSort}
              sortOptions={SORT_OPTIONS}
              view={view}
              onViewChange={setView}
              onClear={handleClearFilters}
              resultsCount={filteredEvents.length}
            />

            {loading && <LoadingSkeleton count={6} />}
            {error && <p className="events-state">{error}</p>}

            {!loading && !error && visibleEvents.length === 0 && (
              <EmptyState
                icon={SearchX}
                title="No events match your filters"
                description="Try widening your search or clearing filters to see more upcoming events."
                action={
                  <Button variant="secondary" onClick={handleClearFilters}>
                    Clear filters
                  </Button>
                }
              />
            )}

            {!loading && !error && visibleEvents.length > 0 && (
              <>
                <div className={`events-grid events-grid-${view}`}>
                  {visibleEvents.map((event, index) => (
                    <Reveal key={event.id} delay={(index % PAGE_SIZE) * 60}>
                      <EventCard event={event} layout={view} />
                    </Reveal>
                  ))}
                </div>

                {hasMore && (
                  <div className="events-load-more">
                    <Button variant="secondary" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
                      Load more events
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <HostEventCTA />
      </main>
      <Footer />
    </>
  );
}

export default Events;
