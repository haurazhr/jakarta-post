import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Detail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const post = state?.post;
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!post?.link) return;
    const fetchDetail = async () => {
      try {
        const response = await fetch(post.link);
        if (!response.ok) throw new Error("Gagal mengambil detail");
        const result = await response.json();
        setDetail(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [post]);

  if (!post) {
    return (
      <div className="container">
        <p className="status-text">Article not found.</p>
        <button className="back-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
      <article className="article">
        <img src={post.image} alt={post.title} className="article-img" />
        <div className="article-body">
          <h1 className="article-title">{post.title}</h1>
          <div className="article-meta">
            <span>{post.pusblised_at}</span>
            {post.premium_badge && post.premium_badge !== "not premium" && (
              <span className="badge">{post.premium_badge}</span>
            )}
          </div>
          <p className="article-headline">{post.headline}</p>
          <hr className="article-divider" />
          {loading && <p className="status-text">Loading full article...</p>}
          {error && <p className="status-text error">{error}</p>}
          {detail && (
            <div className="article-content">
              {detail.author && (
                <p className="article-author">By {detail.author}</p>
              )}
              {detail.content && (
                <div className="article-text">
                  {Array.isArray(detail.content)
                    ? detail.content.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))
                    : <p>{detail.content}</p>
                  }
                </div>
              )}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

export default Detail;