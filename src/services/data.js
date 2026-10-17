import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { db, configured } from "./firebase.js";
export const demoProjects = [
  {
    id: "p1",
    slug: "cedar-house",
    title: "Cedar House",
    location: "Catskills, New York",
    category: "Residential",
    year: "2024",
    area: "2,450 sq ft",
    client: "Private",
    status: "Published",
    projectStatus: "Completed",
    featured: true,
    cover:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85",
    ],
    description:
      "A quiet retreat shaped by the rhythm of the forest. Cedar House pairs a tactile material palette with generous openings that bring the landscape into everyday life.",
  },
  {
    id: "p2",
    slug: "the-long-table",
    title: "The Long Table",
    location: "Brooklyn, New York",
    category: "Commercial",
    year: "2023",
    area: "3,200 sq ft",
    client: "Fieldwork",
    status: "Published",
    projectStatus: "Completed",
    featured: true,
    cover:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85",
    ],
    description:
      "A neighborhood restaurant with an open heart: a long communal table, warm oak, and soft daylight create a welcoming room from morning through evening.",
  },
  {
    id: "p3",
    slug: "monument-apartment",
    title: "Monument Apartment",
    location: "Manhattan, New York",
    category: "Interior",
    year: "2022",
    area: "1,680 sq ft",
    client: "Private",
    status: "Published",
    projectStatus: "Completed",
    featured: true,
    cover:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1800&q=85",
    images: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1800&q=85",
    ],
    description:
      "An understated renovation that lets original proportions lead. Carefully edited details and a calm palette make a small footprint feel expansive.",
  },
  {
    id: "p4",
    slug: "shoreline-studio",
    title: "Shoreline Studio",
    location: "Long Island, New York",
    category: "Landscape",
    year: "2021",
    area: "980 sq ft",
    client: "Private",
    status: "Published",
    projectStatus: "Completed",
    featured: false,
    cover:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=85",
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=85",
    ],
    description:
      "A small working studio tucked into a coastal garden, designed to age gracefully alongside its native planting.",
  },
];
export const demoPosts = [
  {
    id: "b1",
    slug: "the-value-of-a-threshold",
    title: "The value of a threshold",
    category: "Perspective",
    date: "May 14, 2025",
    readingTime: "5 min read",
    cover:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
    excerpt:
      "The spaces between rooms shape how a home feels as much as the rooms themselves.",
    content:
      "A threshold is a pause. It is the moment a garden becomes a room, or a busy street gives way to a quiet interior. We look for opportunities to make those transitions feel considered.\n\nIn Cedar House, the entry is deliberately compressed before opening to the main living space. The shift in scale lets the landscape arrive with a little more force. Small decisions like this can give a home a sense of rhythm and reveal.",
  },
  {
    id: "b2",
    slug: "material-notes-oak",
    title: "Material notes: oak",
    category: "Materials",
    date: "April 02, 2025",
    readingTime: "4 min read",
    cover:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
    excerpt:
      "On a material that brings warmth, tactility, and a quiet sense of permanence.",
    content:
      "Oak is familiar without being ordinary. Its grain records how a tree grew, and its tone changes gently with light. We use it where touch matters: handrails, built-in seating, and the places where people gather.",
  },
  {
    id: "b3",
    slug: "designing-with-daylight",
    title: "Designing with daylight",
    category: "Practice",
    date: "February 18, 2025",
    readingTime: "6 min read",
    cover:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    excerpt:
      "A few observations on shaping rooms around the changing light of a day.",
    content:
      "Good daylight is not simply a matter of adding glass. Orientation, depth, reflectance, and shade all play a part. We begin by noticing how a site changes over a day, then let that understanding inform the plan.",
  },
];
const demoTestimonials = [
  { id: "t1", quote: "The process felt thoughtful from the first conversation. Our home feels entirely our own.", name: "Maya & Daniel", role: "Cedar House clients" },
];
const demoSeed = (name) => ({
  projects: demoProjects,
  posts: demoPosts,
  testimonials: demoTestimonials,
  team: [
    { id: "team-1", name: "Rowan Ellis", role: "Founder & Principal", cover: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85", status: "Published" },
    { id: "team-2", name: "Mina Park", role: "Project Architect", cover: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85", status: "Published" },
    { id: "team-3", name: "Jules Martin", role: "Studio Coordinator", cover: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85", status: "Published" },
  ],
})[name] || [];
const readLocal = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved === null ? fallback : JSON.parse(saved);
  } catch {
    return fallback;
  }
};
const writeDemoCollection = (name, items) => {
  localStorage.setItem(`atelier-demo-${name}`, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("atelier-data-change", { detail: name }));
};
const newLocalId = () => globalThis.crypto?.randomUUID?.() || `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const isPublished = (item) => item.status !== "Draft" && item.status !== "Unpublished";
const filterItems = (items, publishedOnly) => publishedOnly ? items.filter(isPublished) : items;
const itemsQuery = (name, publishedOnly) => query(
  collection(db, name),
  ...(publishedOnly ? [where("status", "==", "Published")] : []),
  orderBy(
    name === "messages" ? "createdAt" : "order",
    name === "messages" ? "desc" : "asc",
  ),
);
export async function listItems(name, { publishedOnly = false } = {}) {
  if (!configured) {
    const items = name === "messages"
      ? readLocal("atelier-messages", [])
      : readLocal(`atelier-demo-${name}`, demoSeed(name));
    return filterItems(items, publishedOnly);
  }
  const snapshot = await getDocs(itemsQuery(name, publishedOnly));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}
export function subscribeItems(name, { publishedOnly = false } = {}, onItems, onError) {
  if (!configured) {
    const update = () => {
      const items = name === "messages"
        ? readLocal("atelier-messages", [])
        : readLocal(`atelier-demo-${name}`, demoSeed(name));
      onItems(filterItems(items, publishedOnly));
    };
    const onStorage = (event) => {
      if (event.key === (name === "messages" ? "atelier-messages" : `atelier-demo-${name}`)) update();
    };
    const onLocalChange = (event) => {
      if (event.detail === name) update();
    };
    update();
    window.addEventListener("storage", onStorage);
    window.addEventListener("atelier-data-change", onLocalChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("atelier-data-change", onLocalChange);
    };
  }
  return onSnapshot(
    itemsQuery(name, publishedOnly),
    (snapshot) => onItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError,
  );
}
export async function getItem(name, slug) {
  if (!configured) return (await listItems(name, { publishedOnly: true })).find((x) => x.slug === slug) || null;
  const s = await getDocs(
    query(collection(db, name), where("slug", "==", slug), where("status", "==", "Published"), limit(1)),
  );
  return s.empty ? null : { id: s.docs[0].id, ...s.docs[0].data() };
}
export async function saveItem(name, id, data) {
  if (!configured) {
    const items = await listItems(name);
    const itemId = id || newLocalId();
    writeDemoCollection(name, id ? items.map((item) => item.id === id ? { ...item, ...data, id } : item) : [{ ...data, id: itemId }, ...items]);
    return { id: itemId };
  }
  return id
    ? updateDoc(doc(db, name, id), data)
    : addDoc(collection(db, name), data);
}
export async function removeItem(name, id) {
  if (!configured) {
    if (name === "messages") {
      localStorage.setItem("atelier-messages", JSON.stringify(readLocal("atelier-messages", []).filter((item) => item.id !== id)));
      window.dispatchEvent(new CustomEvent("atelier-data-change", { detail: "messages" }));
    } else {
      writeDemoCollection(name, (await listItems(name)).filter((item) => item.id !== id));
    }
    return;
  }
  return deleteDoc(doc(db, name, id));
}
export async function markMessage(id, read) {
  if (!configured) {
    const messages = readLocal("atelier-messages", []).map((item) => item.id === id ? { ...item, read } : item);
    localStorage.setItem("atelier-messages", JSON.stringify(messages));
    window.dispatchEvent(new CustomEvent("atelier-data-change", { detail: "messages" }));
    return;
  }
  return updateDoc(doc(db, "messages", id), { read });
}
export async function sendMessage(data) {
  if (!configured) {
    const a = readLocal("atelier-messages", []);
    localStorage.setItem(
      "atelier-messages",
      JSON.stringify([
        { ...data, id: newLocalId(), createdAt: new Date().toISOString(), read: false },
        ...a,
      ]),
    );
    window.dispatchEvent(new CustomEvent("atelier-data-change", { detail: "messages" }));
    return;
  }
  return addDoc(collection(db, "messages"), {
    ...data,
    createdAt: new Date(),
    read: false,
  });
}
const defaultSiteSettings = {
  heroTitle: "Architecture for living well.",
  heroSubtitle: "Thoughtful spaces, made to belong.",
  heroImage: demoProjects[0].cover,
  about: "Atelier North is an independent architecture studio making enduring places for everyday life.",
  email: "hello@ateliernorth.studio",
  phone: "+1 212 555 0148",
  address: "45 Orchard Street, New York, NY",
};
export async function siteSettings() {
  if (!configured)
    return { ...defaultSiteSettings, ...readLocal("atelier-demo-settings", {}) };
  const { getDoc } = await import("firebase/firestore");
  const s = await getDoc(doc(db, "settings", "site"));
  return s.exists() ? s.data() : {};
}
export function subscribeSiteSettings(onSettings, onError) {
  if (!configured) {
    const update = () => onSettings({
      ...defaultSiteSettings,
      ...readLocal("atelier-demo-settings", {}),
    });
    const onStorage = (event) => {
      if (event.key === "atelier-demo-settings") update();
    };
    const onLocalChange = (event) => {
      if (event.detail === "settings") update();
    };
    update();
    window.addEventListener("storage", onStorage);
    window.addEventListener("atelier-data-change", onLocalChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("atelier-data-change", onLocalChange);
    };
  }
  return onSnapshot(doc(db, "settings", "site"), (snapshot) => {
    onSettings(snapshot.exists() ? snapshot.data() : {});
  }, onError);
}
export async function saveSiteSettings(data) {
  if (!configured) {
    localStorage.setItem("atelier-demo-settings", JSON.stringify({ ...readLocal("atelier-demo-settings", {}), ...data }));
    window.dispatchEvent(new CustomEvent("atelier-data-change", { detail: "settings" }));
    return;
  }
  return setDoc(doc(db, "settings", "site"), data, { merge: true });
}
