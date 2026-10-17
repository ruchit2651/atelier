import { Link } from "react-router-dom";
export default function PostCard({ post }) {
  return (
    <article className="post-card">
      <Link to={`/blog/${post.slug}`}>
        <div className="post-image">
          <img loading="lazy" src={post.cover || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85"} alt={post.title} />
        </div>
        <span className="eyebrow">
          {[post.category, post.readingTime].filter(Boolean).join(" · ")}
        </span>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <span className="text-link">Read story ↗</span>
      </Link>
    </article>
  );
}
