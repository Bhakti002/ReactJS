

export default function Controls({
  search,
  setSearch,
  showFilter,
  setShowFilter,
  showSort,
  setShowSort,
  filterCity,
  setFilterCity,
  clearFilter,
  cityOptions,
  sortConfig,
  setSortConfig,
}) {
  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Search by Name or City..."
        className="input search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="controls-right">
        <div className="btn-group">
          <button
            onClick={() => setShowFilter((s) => !s)}
            className="btn-outline"
            aria-expanded={showFilter}
          >
            Filter
          </button>

          <button
            onClick={() => setShowSort((s) => !s)}
            className="btn-outline"
            aria-expanded={showSort}
          >
            Sort
          </button>
        </div>

        {showFilter && (
          <div className="panel filter-panel">
            <label className="panel-row">
              <span>City</span>
              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
              >
                <option value="">All Cities</option>
                {cityOptions
                  .filter(Boolean)
                  .map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </label>
            <div className="panel-actions">
              <button onClick={() => setShowFilter(false)} className="btn-sm">
                Apply
              </button>
              <button onClick={clearFilter} className="btn-sm muted">
                Clear
              </button>
            </div>
          </div>
        )}

        {showSort && (
          <div className="panel sort-panel">
            <label className="panel-row">
              <span>Sort by</span>
              <select
                value={sortConfig.key}
                onChange={(e) => setSortConfig({ ...sortConfig, key: e.target.value })}
              >
                <option value="name">Name</option>
                <option value="age">Age</option>
                <option value="city">City</option>
              </select>
            </label>
            <div className="panel-row">
              <span>Direction</span>
              <button
                onClick={() =>
                  setSortConfig({ ...sortConfig, direction: sortConfig.direction === "asc" ? "desc" : "asc" })
                }
                className="btn-sm"
              >
                {sortConfig.direction === "asc" ? "Ascending ⬆️" : "Descending ⬇️"}
              </button>
            </div>
            <div className="panel-actions">
              <button onClick={() => setShowSort(false)} className="btn-sm">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
