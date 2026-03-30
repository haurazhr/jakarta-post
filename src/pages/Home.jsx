import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

const ALL_PATHS = [
  "indonesia/jakarta",
  "indonesia/politics",
  "indonesia/society",
  "indonesia/archipelago",
  "business",
  "business/economy",
  "business/tech",
  "business/companies",
  "world",
  "world/asia-pacific",
  "world/europe",
  "world/americas",
  "academia/opinion",
  "life/style",
  "life/entertainment",
  "life/health",
];

function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);
    setSearch("");

    const fetchData = async () => {
      try {
        if (category === "all") {
  const responses = await Promise.all(
    ALL_PATHS.map((path) =>
      fetch(`https://jakpost.vercel.app/api/category/${path}`).then(
        (r) => r.json()
      )
    )
  );
  // Gabungin & hapus duplikat berdasarkan judul
  const seen = new Set();
  const allPosts = responses
    .flatMap((r) => r.posts ?? [])
    .filter((post) => {
      if (seen.has(post.title)) return false;
      seen.add(post.title);
      return true;
    });
  const featuredPost = responses[0].featured_post;
  setData({ featured_post: featuredPost, posts: allPosts });
        } else {
          const response = await fetch(
            `https://jakpost.vercel.app/api/category/${category}`
          );
          if (!response.ok) throw new Error("Gagal mengambil data");
          const result = await response.json();
          setData(result);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const allPosts = data?.posts ?? [];
  const filteredPosts = allPosts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <header className="site-header">
        <p className="site-tagline">Stay informed. Stay ahead.</p>
        <h1 className="site-title">THE JAKARTA POST</h1>
        <div className="header-line" />
      </header>

      <div className="controls">
        <CategoryFilter active={category} onChange={setCategory} />
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {loading && <p className="status-text">Loading articles...</p>}
      {error && <p className="status-text error">Error: {error}</p>}

      {data && !loading && (
        <>
          {search === "" && (
            <section className="featured-section">
              <p className="section-label">Featured</p>
              <PostCard post={data.featured_post} featured />
            </section>
          )}

          <section className="posts-section">
            <p className="section-label">
              {search
                ? `Results for "${search}" (${filteredPosts.length} artikel)`
                : "Latest Articles"}
            </p>
            {filteredPosts.length === 0 ? (
              <p className="status-text">Artikel tidak ditemukan.</p>
            ) : (
              <div className="posts-grid">
                {filteredPosts.map((post, i) => (
                  <PostCard key={i} post={post} />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default Home;