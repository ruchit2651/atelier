import { useEffect, useState } from "react";
import { subscribeItems } from "../services/data.js";
export default function useCollection(name, options = {}) {
  const [items, setItems] = useState([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState("");
  useEffect(() => {
    let live = true;
    setLoading(true);
    setError("");
    const unsubscribe = subscribeItems(
      name,
      options,
      (nextItems) => {
        if (!live) return;
        setItems(nextItems);
        setLoading(false);
      },
      (e) => {
        if (!live) return;
        setError(e.message || "Could not load content.");
        setLoading(false);
      },
    );
    return () => {
      live = false;
      unsubscribe();
    };
  }, [name, options.publishedOnly]);
  return { items, loading, error };
}
