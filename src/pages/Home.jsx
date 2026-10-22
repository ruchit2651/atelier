import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import SEO from "../components/SEO.jsx";
import Button from "../components/Button.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import PostCard from "../components/PostCard.jsx";
import Loader from "../components/Loader.jsx";
import useCollection from "../hooks/useCollection.js";
import useSiteSettings from "../hooks/useSiteSettings.js";
export default function Home() {
  const { items: projects, loading, error } = useCollection("projects", { publishedOnly: true }),
    { items: posts } = useCollection("posts", { publishedOnly: true }),
    { items: reviews } = useCollection("testimonials", { publishedOnly: true });
  const { settings } = useSiteSettings();
  const testimonialCards = reviews.slice(0, 5);
  const shouldMarqueeTestimonials = testimonialCards.length === 5;
  const renderTestimonial = (review, index, copy) => {
    const rating = Math.max(0, Math.min(5, Number(review.rating) || 5));
    return (
      <article
        className="testimonial-card"
        key={`${review.id || index}-${copy}`}
        aria-label={`Review from ${review.name}`}
      >
        <div className="testimonial-rating" role="img" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={15} fill={i < rating ? "currentColor" : "none"} />
          ))}
        </div>
        <blockquote>{review.quote}</blockquote>
        <footer className="testimonial-attribution">
          <strong>{review.name}</strong>
          {review.role && <span>{review.role}</span>}
        </footer>
      </article>
    );
  };
  return (
    <>
      <SEO />
      <section className="hero">
        <img
          className="hero-image"
          src={
            settings.heroImage ||
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=90"
          }
          alt="Sunlit contemporary living room opening to a garden"
        />
        <div className="hero-shade" />
        <div className="hero-content">
      
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {settings.heroTitle || "Architecture for\nliving well."}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            {settings.heroSubtitle || "Thoughtful spaces, made to belong."}
          </motion.p>
          <div className="hero-buttons">
            <Button to="/projects" variant="light">
              Explore our work <ArrowUpRight size={16} />
            </Button>
            <Button to="/about" variant="outline-light">
              Meet the studio
            </Button>
          </div>
        </div>
       
      </section>
      <section id="work" className="section container">
        <div className="section-heading">
          <SectionTitle
            title="Places with a point of view."
          />
          <Link to="/projects" className="text-link">
            View all projects ↗
          </Link>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="empty-state">{error}</div>
        ) : (
          <div className="project-grid">
            {projects
              .filter((x) => x.featured !== false)
              .slice(0, 3)
              .map((p, i) => (
                <ProjectCard item={p} index={i} key={p.id} />
              ))}
          </div>
        )}
      </section>
      <section className="about-teaser">
        <div className="teaser-image">
          <img
            loading="lazy"
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
            alt="Quiet interior with carefully chosen natural materials"
          />
        </div>
        <div className="teaser-copy">
          <span className="eyebrow">A considered practice</span>
          <h2>
            Good architecture
            <br />
            begins with listening.
          </h2>
          <p>{settings.about || "We are an independent architecture studio working across homes, hospitality, and the spaces in between. Each project starts with curiosity: about the people, the place, and what matters most."}</p>
          <Button to="/about" variant="outline">
            Get to know us <ArrowUpRight size={16} />
          </Button>
        </div>
      </section>
      <section className="services-section section container">
        <SectionTitle
          eyebrow="Whelier we do"
          title="From first sketch to final detail."
        />
        <div className="services-row">
          {[
            [
              "01",
              "Architecture",
              "New build, renovation, and thoughtful additions.",
            ],
            [
              "02",
              "Interiors",
              "Material palettes and spaces made for living.",
            ],
            [
              "03",
              "Landscape",
              "A closer relationship between building and place.",
            ],
          ].map((x) => (
            <div className="service" key={x[0]}>
              <span>{x[0]}</span>
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="stats-band">
        <div className="stats-heading container">
          <span className="eyebrow">The practice in numbers</span>
          <h2>Built with care, over time.</h2>
        </div>
        <div className="stats-inner">
          {[
            ["12+", "Years of practice"],
            ["38", "Projects realized"],
            ["9", "Design honors"],
          ].map((x) => (
            <div key={x[0]}>
              <strong>{x[0]}</strong>
              <span>{x[1]}</span>
            </div>
          ))}
        </div>
      </section>
      {testimonialCards.length > 0 && (
        <section
          className="testimonials-section"
          aria-label="Client testimonials"
          aria-roledescription="carousel"
        >
          <div className="testimonials-heading">
            <span className="eyebrow">Kind words · From our clients</span>
          </div>
          <div className="testimonials-window">
            <div
              className={`testimonials-track${shouldMarqueeTestimonials ? "" : " is-static"}`}
              style={shouldMarqueeTestimonials ? { animationDuration: `${testimonialCards.length * 8}s` } : undefined}
            >
              <div className="testimonials-set">
                {testimonialCards.map((review, index) => renderTestimonial(review, index, "first"))}
              </div>
              {shouldMarqueeTestimonials && (
                <div className="testimonials-set" aria-hidden="true">
                  {testimonialCards.map((review, index) => renderTestimonial(review, index, "loop"))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      <section className="section container field-notes-section">
        <div className="section-heading">
          <SectionTitle eyebrow="Field notes" title="Ideas from the studio." />
          <Link to="/blog" className="text-link">
            Visit the blog ↗
          </Link>
        </div>
        <div className="post-grid">
          {posts.slice(0, 3).map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </section>
      <section className="closing-cta">
        <div className="container closing-cta-content">
          <span className="eyebrow light">Have a place in mind?</span>
          <h2>
            Let’s make something
            <br />
            meaningful.
          </h2>
          <Button to="/contact" variant="light">
            Tell us about your project <ArrowUpRight size={16} />
          </Button>
        </div>
      </section>
    </>
  );
}
