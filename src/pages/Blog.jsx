import { useMemo, useState } from "react";
import SEO from "../components/SEO.jsx";
import PostCard from "../components/PostCard.jsx";
import Loader from "../components/Loader.jsx";
import useCollection from "../hooks/useCollection.js";
export default function Blog() {
  const { items, loading, error } = useCollection("posts", {
    publishedOnly: true,
  });
  const [search, setSearch] = useState(""),
    [category, setCategory] = useState("All"),
    [page, setPage] = useState(1);
  const categories = ["All", ...new Set(items.map((x) => x.category))];
  const results = useMemo(
    () =>
      items.filter(
        (x) =>
          (category === "All" || x.category === category) &&
          `${x.title} ${x.excerpt}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [items, search, category],
  );
  const shown = results.slice((page - 1) * 6, page * 6),
    pages = Math.ceil(results.length / 6);
  return (
    <>
      <SEO title="Blog" />
      <section className="page-intro container">
        <span className="eyebrow">The blog · Ideas from the studio</span>
        <h1>
          Notes on making
          <br />
          and meaning.
        </h1>
        <p>
          Stories, observations, and practical ideas from our architecture
          practice. Explore the materials we return to, the details that shape
          daily life, and the lessons we learn on each project.
        </p>
        <div className="blog-topics"><span>On the blog</span><strong>Architecture</strong><i/> <strong>Materials</strong><i/> <strong>Studio life</strong><i/> <strong>Places</strong></div>
      </section>
      <section className="container page-section">
        <div className="blog-controls">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            type="search"
            placeholder="Search the blog"
            aria-label="Search posts"
          />
          <div className="filter-row">
            {categories.map((c) => (
              <button
                className={category === c ? "filter-active" : ""}
                key={c}
                onClick={() => {
                  setCategory(c);
                  setPage(1);
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        {!loading&&!error&&<p className="blog-result-count">{results.length} {results.length===1?'story':'stories'} to explore</p>}
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="empty-state">{error}</div>
        ) : shown.length ? (
          <>
            <div className="post-grid">
              {shown.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
            {pages > 1 && (
              <div className="pagination">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                  ← Previous
                </button>
                <span>
                  {page} / {pages}
                </span>
                <button
                  disabled={page === pages}
                  onClick={() => setPage(page + 1)}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            No blog stories match your search.
          </div>
        )}
      </section>
    </>
  );
}
