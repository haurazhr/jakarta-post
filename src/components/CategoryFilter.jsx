const CATEGORIES = [
  { label: "All", path: "all" },
  { label: "Indonesia", path: "indonesia/jakarta" },
  { label: "Business", path: "business" },
  { label: "World", path: "world" },
  { label: "Opinion", path: "academia/opinion" },
  { label: "Culture", path: "life/style" },
];

function CategoryFilter({ active, onChange }) {
  return (
    <div className="category-wrapper">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.path}
          onClick={() => onChange(cat.path)}
          className={`category-btn ${active === cat.path ? "active" : ""}`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
export { CATEGORIES };