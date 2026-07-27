import { LayoutGrid, List, Search, X } from "lucide-react";
import "../../styles/ui/SearchFilters.css";

function SearchFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categoryOptions,
  location,
  onLocationChange,
  locationOptions,
  date,
  onDateChange,
  sort,
  onSortChange,
  sortOptions,
  view,
  onViewChange,
  onClear,
  resultsCount,
}) {
  return (
    <div className="search-filters">
      <div className="search-filters-row">
        <label className="search-filters-search">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search events by name or keyword"
            aria-label="Search events"
          />
        </label>

        <select value={category} onChange={(event) => onCategoryChange(event.target.value)} aria-label="Filter by category">
          <option value="">All categories</option>
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select value={location} onChange={(event) => onLocationChange(event.target.value)} aria-label="Filter by location">
          <option value="">All locations</option>
          {locationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(event) => onDateChange(event.target.value)}
          aria-label="Filter by date"
        />

        <select value={sort} onChange={(event) => onSortChange(event.target.value)} aria-label="Sort events">
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="search-filters-footer">
        <p className="search-filters-count">{resultsCount} event{resultsCount === 1 ? "" : "s"} found</p>

        <div className="search-filters-actions">
          <button type="button" className="search-filters-clear" onClick={onClear}>
            <X size={15} aria-hidden="true" /> Clear filters
          </button>

          <div className="search-filters-view" role="group" aria-label="Toggle layout">
            <button
              type="button"
              className={view === "grid" ? "is-active" : ""}
              onClick={() => onViewChange("grid")}
              aria-pressed={view === "grid"}
              aria-label="Grid view"
            >
              <LayoutGrid size={17} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={view === "list" ? "is-active" : ""}
              onClick={() => onViewChange("list")}
              aria-pressed={view === "list"}
              aria-label="List view"
            >
              <List size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFilters;
