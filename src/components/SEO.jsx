import { Helmet } from "react-helmet-async";
export default function SEO({
  title,
  description = "Architecture for living well. Atelier North is an independent architecture studio in New York.",
}) {
  return (
    <Helmet>
      <title>
        {title
          ? `${title} — Atelier North`
          : "Atelier North — Architecture & Place"}
      </title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title || "Atelier North"} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}
