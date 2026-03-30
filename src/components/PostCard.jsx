import { useNavigate } from "react-router-dom";

function PostCard({ post, featured = false }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/detail", { state: { post } });
  };

  return (
    <div
      className={`post-card ${featured ? "featured" : ""}`}
      onClick={handleClick}
    >
      <img src={post.image} alt={post.title} className="post-img" />
      <div className="post-info">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-headline">{post.headline}</p>
        {!featured && (
          <small className="post-meta">
            {post.pusblised_at}
            {post.premium_badge && ` · ${post.premium_badge}`}
          </small>
        )}
      </div>
    </div>
  );
}

export default PostCard;