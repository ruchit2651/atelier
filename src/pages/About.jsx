import SEO from "../components/SEO.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import Button from "../components/Button.jsx";
import useCollection from "../hooks/useCollection.js";
import useSiteSettings from "../hooks/useSiteSettings.js";
export default function About() {
  const { items: team } = useCollection("team", { publishedOnly: true });
  const { settings } = useSiteSettings();
  return (
    <>
      <SEO title="About the studio" />
      <section className="page-intro container">
        <span className="eyebrow">The studio</span>
        <h1>
          Rooted in place.
          <br />
          Open to possibility.
        </h1>
        <p>{settings.about || "Atelier North is an independent architecture practice creating enduring places for everyday life. We work with homeowners, small businesses, and community-minded clients to make buildings and interiors that feel considered, useful, and connected to their surroundings."}</p>
      </section>
      <section className="about-feature container">
        <img
          src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1800&q=85"
          alt="Sunlit studio interior"
        />
        <div>
          <span className="eyebrow">Our point of view</span>
          <h2>Make room for what matters.</h2>
          <p>
            We believe the best spaces feel inevitable: shaped by the character
            of a place and the lives unfolding within it. Our work balances
            clarity and warmth, rigor and instinct.
          </p>
          <p>
            Founded in 2013 by architect Rowan Ellis, the studio brings a
            collaborative, hands-on approach to projects of every scale. We
            stay involved from the first site visit through construction,
            helping clients make informed choices and keeping the original
            purpose of the project in view.
          </p>
          <p>Our work spans new homes, sensitive renovations, hospitality spaces, interiors, and landscape-led projects across New York and beyond.</p>
          <Button to="/contact" variant="outline">
            Work with us ↗
          </Button>
        </div>
      </section>
      <section className="studio-values section container">
        <SectionTitle eyebrow="What guides us" title="A practice built on care." />
        <div className="values-grid">
          <article><span>01 · Place</span><h3>Start by paying attention.</h3><p>We study the site, light, history, and neighborhood before proposing what should come next.</p></article>
          <article><span>02 · People</span><h3>Design around real life.</h3><p>We listen carefully and make room for the routines, relationships, and changing needs a space must support.</p></article>
          <article><span>03 · Craft</span><h3>Make every detail count.</h3><p>Clear plans, durable materials, and considered construction details help a project stay useful over time.</p></article>
        </div>
      </section>
      <section className="section container">
        <SectionTitle
          eyebrow="How we work"
          title="A thoughtful path forward."
        />
        <div className="process-grid">
          {[
            [
              "01",
              "Listen",
              "We begin by understanding your priorities, ambitions, and the character of your site.",
            ],
            [
              "02",
              "Imagine",
              "We explore possibilities together through sketches, models, and material studies.",
            ],
            [
              "03",
              "Refine",
              "We develop the design with care, coordinating every detail and decision.",
            ],
            [
              "04",
              "Realize",
              "We stay close through construction and handover, seeing the vision through.",
            ],
          ].map((x) => (
            <div key={x[0]}>
              <span>{x[0]}</span>
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="timeline-band">
        <span className="eyebrow">A few milestones</span>
        <div className="timeline">
          {[
            ["2013", "Studio founded in New York"],
            ["2017", "First hospitality project completed"],
            ["2021", "AIA New York design award"],
            ["2025", "38 places made together"],
          ].map((x) => (
            <div key={x[0]}>
              <strong>{x[0]}</strong>
              <span>{x[1]}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="team section container">
        <SectionTitle
          eyebrow="The people"
          title="Small studio, close collaboration."
        />
        <div className="team-grid">
          {team.map((member) => (
            <article key={member.id}>
              {member.cover && <img loading="lazy" src={member.cover} alt={member.name} />}
              <h3>{member.name}</h3>
              <span>{member.role}</span>
              {member.bio && <p>{member.bio}</p>}
            </article>
          ))}
        </div>
      </section>
      <section className="awards container">
        <span className="eyebrow">Recognition</span>
        <div>
          {[
            "AIA New York Design Award · 2021",
            "Architizer A+ Award · 2022",
            "Dezeen Awards, Longlist · 2024",
            "NYCxDesign, Honoree · 2025",
          ].map((x) => (
            <p key={x}>
              {x}
              <span>↗</span>
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
