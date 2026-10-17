import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Copy, Facebook, Linkedin } from "lucide-react";
import SEO from "../components/SEO.jsx";
import Loader from "../components/Loader.jsx";
import useCollection from "../hooks/useCollection.js";
export default function BlogDetail() {
  const { slug } = useParams();
  const { items, loading, error } = useCollection("posts", { publishedOnly: true });
  const [copied, setCopied] = useState(false);
  const post = items.find((item) => item.slug === slug);
  if (loading) return <Loader />;
  if (error) return <div className="center-state"><p>{error}</p></div>;
  if (!post)
    return (
      <div className="center-state">
        <h1>Story not found</h1>
        <Link to="/blog">Back to blog</Link>
      </div>
    );
  const copy = async () => {
    await navigator.clipboard?.writeText(location.href);
    setCopied(true);
  };
  return (
    <>
      <SEO title={post.title} description={post.excerpt} />
      <article className="article">
        <Link className="back-link" to="/blog">
          <ArrowLeft size={16} /> Back to blog
        </Link>
        <header>
          <span className="eyebrow">
            {post.category} · {post.date} · {post.readingTime}
          </span>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </header>
        {post.cover && <img className="article-cover" src={post.cover} alt={post.title} />}
        <div className="article-body">
          {(post.content || "").split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="share-row">
          <span className="eyebrow">Share this story</span>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}`}
            aria-label="Share on Facebook"
          >
            <Facebook size={18} />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(location.href)}`}
            aria-label="Share on LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <button onClick={copy} aria-label="Copy link">
            <Copy size={17} />
            {copied ? "Copied" : ""}
          </button>
        </div>
      </article>
    </>
  );
}
