import { useAuth } from "../context/AuthContext.jsx";
import Loader from "./Loader.jsx";
export default function ProtectedRoute({ children }) {
  const { user, ready, isAdmin } = useAuth();
  if (!ready) return <Loader />;
  // The admin page owns its sign-in form, so unauthenticated visitors stay on this route.
  if (!user) return children;
  if (!isAdmin)
    return (
      <div className="center-state">
        <h2>Access unavailable</h2>
        <p>This account is not on the studio admin list.</p>
      </div>
    );
  return children;
}
