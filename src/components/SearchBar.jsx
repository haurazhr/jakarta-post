function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search articles..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;