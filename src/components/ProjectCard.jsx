import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export default function ProjectCard({ item, index = 0 }) {
  return (
    <motion.article
      className="project-card"
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ delay: (index % 3) * 0.06 }}
    >
      <Link to={`/projects/${item.slug}`} aria-label={`View ${item.title}`}>
        <div className="project-image">
          <img
            loading="lazy"
            src={item.cover || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85"}
            alt={`${item.title}${item.category ? `, ${item.category.toLowerCase()}` : ""} architecture`}
          />
          <span className="card-arrow">↗</span>
        </div>
        <div className="card-meta">
          <div>
            <h3>{item.title}</h3>
            <span>{item.location || ""}</span>
          </div>
          {item.category && <span className="eyebrow">{item.category}</span>}
        </div>
      </Link>
    </motion.article>
  );
}
