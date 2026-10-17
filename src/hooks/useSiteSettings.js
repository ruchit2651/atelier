import { useEffect, useState } from "react";
import { subscribeSiteSettings } from "../services/data.js";

export default function useSiteSettings() {
  const [settings, setSettings] = useState({});
  const [error, setError] = useState("");
  useEffect(() => {
    return subscribeSiteSettings(
      (nextSettings) => {
        setSettings(nextSettings);
        setError("");
      },
      (e) => setError(e.message || "Could not load site settings."),
    );
  }, []);
  return { settings, error };
}
