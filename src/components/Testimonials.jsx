import { Star } from "lucide-react";

const localPreviewReviews = import.meta.env.DEV
  ? [
      {
        id: "preview-01",
        quote: "They understood how we wanted our home to feel. Every room is calm, warm, and unmistakably ours.",
        name: "Preview client 01",
        role: "SAMPLE COPY · LOCAL PREVIEW",
        rating: 5,
      },
      {
        id: "preview-02",
        quote: "The team brought clarity to every choice, from the floor plan to the final material details.",
        name: "Preview client 02",
        role: "SAMPLE COPY · LOCAL PREVIEW",
        rating: 5,
      },
      {
        id: "preview-03",
        quote: "Our renovation feels brighter and more connected, while still keeping the character we loved.",
        name: "Preview client 03",
        role: "SAMPLE COPY · LOCAL PREVIEW",
        rating: 5,
      },
      {
        id: "preview-04",
        quote: "Small details make daily life easier. The whole house feels thoughtful without feeling precious.",
        name: "Preview client 04",
        role: "SAMPLE COPY · LOCAL PREVIEW",
        rating: 5,
      },
      {
        id: "preview-05",
        quote: "From our first meeting, the process felt personal. The finished spaces fit us beautifully.",
        name: "Preview client 05",
        role: "SAMPLE COPY · LOCAL PREVIEW",
        rating: 5,
      },
    ]
  : [];

export default function Testimonials({ reviews = [] }) {
  const publishedReviews = reviews.slice(0, 5);
  const cards =
    import.meta.env.DEV && publishedReviews.length < 5
      ? [...publishedReviews, ...localPreviewReviews.slice(0, 5 - publishedReviews.length)]
      : publishedReviews;
  const shouldMarquee = cards.length > 1;

  const renderCard = (review, index, copy) => {
    const rating = Math.max(0, Math.min(5, Number(review.rating) || 5));
    return (
      <article
        className="testimonial-card"
        key={`${review.id || index}-${copy}`}
        aria-label={`Review from ${review.name}`}
      >
        <div className="testimonial-rating" role="img" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, star) => (
            <Star key={star} size={15} fill={star < rating ? "currentColor" : "none"} />
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

  if (!cards.length) return null;

  return (
    <section
      className="testimonials-section"
      aria-label="Client testimonials"
      aria-roledescription="carousel"
    >
      <div className="testimonials-heading">
        <span className="eyebrow">Kind words · From our clients</span>
        <h2>Spaces that feel like your own.</h2>
      </div>
      <div className="testimonials-window">
        <div
          className={`testimonials-track${shouldMarquee ? "" : " is-static"}`}
          style={shouldMarquee ? { animationDuration: `${cards.length * 8}s` } : undefined}
        >
          <div className="testimonials-set">
            {cards.map((review, index) => renderCard(review, index, "first"))}
          </div>
          {shouldMarquee && (
            <div className="testimonials-set" aria-hidden="true">
              {cards.map((review, index) => renderCard(review, index, "loop"))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
