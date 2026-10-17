import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";
export default function NotFound() {
  return (
    <>
      <SEO title="Page not found" />
      <div className="center-state not-found">
        <span className="eyebrow">404 · Lost in the plans</span>
        <h1>
          This page isn’t
          <br />
          on the drawing board.
        </h1>
        <Link className="text-link" to="/">
          Return to the studio ↗
        </Link>
      </div>
    </>
  );
}
