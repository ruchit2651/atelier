import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import SEO from "../components/SEO.jsx";
import Modal from "../components/Modal.jsx";
import Loader from "../components/Loader.jsx";
import Button from "../components/Button.jsx";
import useCollection from "../hooks/useCollection.js";
export default function ProjectDetail() {
  const { slug } = useParams();
  const { items, loading, error } = useCollection("projects", { publishedOnly: true });
  const item = items.find((project) => project.slug === slug);
  const [active, setActive] = useState(null);
  if (loading) return <Loader />;
  if (error) return <div className="center-state"><p>{error}</p></div>;
  if (!item)
    return (
      <div className="center-state">
        <h1>Project not found</h1>
        <Link to="/projects">Back to projects</Link>
      </div>
    );
  const i = items.findIndex((project) => project.slug === slug),
    next = items[(i + 1) % items.length];
  return (
    <>
      <SEO title={item.title} description={item.description} />
      <section className="detail-hero">
        {item.cover && <img src={item.cover} alt={item.title} />}
        <span className="detail-label">
          {item.category} · {item.year}
        </span>
      </section>
      <section className="detail-heading container">
        <div>
          <span className="eyebrow">{item.location}</span>
          <h1>{item.title}</h1>
        </div>
        <p>{item.description}</p>
      </section>
      <section className="facts container">
        {[
          ["Year", item.year],
          ["Location", item.location],
          ["Area", item.area],
          ["Client", item.client],
          ["Status", item.projectStatus || (item.status === "Published" ? "Completed" : item.status)],
        ].map(([a, b]) => (
          <div key={a}>
            <span className="eyebrow">{a}</span>
            <strong>{b}</strong>
          </div>
        ))}
      </section>
      <section className="gallery container">
        {(item.images || (item.cover ? [item.cover] : [])).map((src, n) => (
          <button
            key={src + n}
            onClick={() => setActive(src)}
            aria-label={`Open project image ${n + 1}`}
          >
            <img
              loading="lazy"
              src={src}
              alt={`${item.title} architectural view ${n + 1}`}
            />
          </button>
        ))}
      </section>
      <section className="next-project container">
        <span className="eyebrow">Continue exploring</span>
        <Link to={`/projects/${next.slug}`}>
          <span>Next project</span>
          <strong>{next.title}</strong>
          <ArrowRight />
        </Link>
      </section>
      <Modal open={!!active} onClose={() => setActive(null)}>
        <img
          className="lightbox-image"
          src={active || ""}
          alt="Expanded project"
        />
      </Modal>
    </>
  );
}
