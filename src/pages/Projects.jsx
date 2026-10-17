import { useMemo, useState } from "react";
import SEO from "../components/SEO.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import Loader from "../components/Loader.jsx";
import useCollection from "../hooks/useCollection.js";
export default function Projects() {
  const { items, loading, error } = useCollection("projects", { publishedOnly: true });
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(items.map((x) => x.category))];
  const filtered = useMemo(
    () =>
      category === "All" ? items : items.filter((x) => x.category === category),
    [items, category],
  );
  return (
    <>
      <SEO title="Selected projects" />
      <section className="page-intro container">
        <span className="eyebrow">Our work · 2021—2025</span>
        <h1>
          Spaces made
          <br />
          with intention.
        </h1>
        <p>
          Every project is an opportunity to make daily life a little more
          thoughtful.
        </p>
      </section>
      <section className="container page-section">
        <div className="filter-row" role="group" aria-label="Filter projects">
          {categories.map((c) => (
            <button
              className={category === c ? "filter-active" : ""}
              key={c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="empty-state">{error}</div>
        ) : filtered.length ? (
          <div className="project-grid">
            {filtered.map((p, i) => (
              <ProjectCard item={p} index={i} key={p.id} />
            ))}
          </div>
        ) : (
          <div className="empty-state">No projects in this category yet.</div>
        )}
      </section>
    </>
  );
}
