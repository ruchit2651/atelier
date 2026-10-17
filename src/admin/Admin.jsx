import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { configured } from "../services/firebase.js";
import {
  listItems,
  removeItem,
  markMessage,
  siteSettings,
  saveSiteSettings,
} from "../services/data.js";
import {
  LogOut,
  Trash2,
  LayoutDashboard,
  FolderOpen,
  Users,
  Inbox,
  Settings,
} from "lucide-react";
import Loader from "../components/Loader.jsx";
import LogoMark from "../components/LogoMark.jsx";
const types = [
  ["projects", "Projects"],
  ["team", "Team"],
];
function formatInquiryDate(value) {
  const date = value?.toDate ? value.toDate() : value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return "Recently received";
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date);
}
export default function Admin() {
  const { user, logout, login } = useAuth();
  const [section, setSection] = useState("dashboard"),
    [items, setItems] = useState([]),
    [loading, setLoading] = useState(false),
    [toast, setToast] = useState(""),
    [settings, setSettings] = useState({}),
    [stats, setStats] = useState({ projects: 0, unread: 0 }),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [loginError, setLoginError] = useState("");
  function notify(m) {
    setToast(m);
    setTimeout(() => setToast(""), 3500);
  }
  async function refresh() {
    if (!types.some((x) => x[0] === section) && section !== "messages") return;
    setLoading(true);
    try {
      setItems(await listItems(section));
    } catch (e) {
      notify(e.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    refresh();
    if (section === "dashboard") {
      Promise.all([listItems("projects"), listItems("messages")])
        .then(([projects, messages]) => setStats({
          projects: projects.length,
          unread: messages.filter((message) => !message.read).length,
        }))
        .catch((e) => notify(e.message));
    }
    if (section === "settings")
      siteSettings()
        .then(setSettings)
        .catch((e) => notify(e.message));
  }, [section]);
  if (!user)
    return (
      <div className="admin-login">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoginError("");
            if (email.trim().length < 3) {
              setLoginError("Enter a username with at least 3 characters.");
              return;
            }
            if (password.length < 8) {
              setLoginError("Password must be at least 8 characters.");
              return;
            }
            try {
              await login(email.trim(), password);
            } catch {
              setLoginError(configured
                ? "Sign in failed. Check your username, password, and admin account setup."
                : "Demo sign in failed. Use the demo username and password shown below.");
            }
          }}
        >
          <span className="eyebrow">Atelier North / Studio</span>
          <h1>Admin sign in</h1>
          <p>Use your authorized studio account.</p>
          <label>
            Username
            <input
              required
              type="text"
              minLength={3}
              maxLength={254}
              autoComplete="username"
              name="username"
              placeholder="Studio username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              required
              type="password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {loginError && <p className="form-error">{loginError}</p>}
          <button className="button button-dark">Sign in</button>
          {!configured ? (
            <div className="admin-hint demo-credentials"><strong>Demo access</strong><span>Username: <code>studio-admin</code></span><span>Password: <code>atelier123</code></span><small>Demo changes stay in this browser. Configure Firebase for a secure live admin account.</small></div>
          ) : (
            <p className="admin-hint">Use the admin username and password configured for your Firebase account.</p>
          )}
        </form>
      </div>
    );
  const icons = {
    dashboard: LayoutDashboard,
    projects: FolderOpen,
    team: Users,
    messages: Inbox,
    settings: Settings,
  };
  async function saveSettings(e) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await saveSiteSettings(d);
      setSettings({ ...settings, ...d });
      notify("Site settings saved.");
    } catch (e) {
      notify(e.message);
    }
  }
  async function messageAction(it) {
    try {
      await markMessage(it.id, !it.read);
      refresh();
    } catch (e) {
      notify(e.message);
    }
  }
  async function deleteMessage(it) {
    if (!confirm("Delete this inquiry? This cannot be undone.")) return;
    try {
      await removeItem("messages", it.id);
      refresh();
      notify("Inquiry deleted.");
    } catch (e) {
      notify(e.message);
    }
  }
  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <a className="wordmark" href="/">
          <LogoMark />
          <span>ATELIER NORTH</span>
        </a>
        <span className="eyebrow">Studio manager</span>
        {[
          ["dashboard", "Overview"],
          ...types,
          ["messages", "Inbox"],
          ["settings", "Settings"],
        ].map(([id, label]) => {
          const Icon = icons[id];
          return (
            <button
              key={id}
              className={section === id ? "admin-nav-active" : ""}
              onClick={() => {
                setSection(id);
              }}
            >
              <Icon size={17} />
              {label}
            </button>
          );
        })}
        <button className="admin-logout" onClick={logout}>
          <LogOut size={17} />
          Sign out
        </button>
      </aside>
      <section className="admin-main">
        <header className="admin-top">
          <div>
            <span className="eyebrow">Atelier North</span>
            <h1>
              {section === "dashboard"
                ? "Overview"
                : section[0].toUpperCase() + section.slice(1)}
            </h1>
          </div>
          <span>{user.email}</span>
        </header>
        {section === "dashboard" ? (
          <>
            <div className="admin-stats">
              {[
                ["Projects", stats.projects],
                ["Unread messages", stats.unread],
              ].map((x) => (
                <div key={x[0]}>
                  <span>{x[0]}</span>
                  <strong>{x[1]}</strong>
                </div>
              ))}
            </div>
            <div className="admin-welcome">
              <h2>Good work starts here.</h2>
              <p>
                Manage the studio’s projects, blog, team, and inquiries from
                one place.
              </p>
            </div>
          </>
        ) : section === "settings" ? (
          <form className="admin-editor" onSubmit={saveSettings} key={settings.heroTitle || "settings"}>
            <h2>Site settings</h2>
            {[
              ["heroTitle", "Hero headline"],
              ["heroSubtitle", "Hero tagline"],
              ["about", "About text"],
              ["email", "Contact email"],
              ["phone", "Contact phone"],
              ["address", "Office address"],
              ["instagram", "Instagram URL"],
              ["pinterest", "Pinterest URL"],
            ].map(([name, label]) => (
              <label key={name}>
                {label}
                <input name={name} defaultValue={settings[name] || ""} />
              </label>
            ))}
            <button className="button button-dark">Save settings</button>
          </form>
        ) : section === "messages" ? (
          loading ? (
            <Loader />
          ) : items.length ? (
            <div className="admin-list message-list">
              {items.map((it) => (
                <article
                  className={it.read ? "message-read" : "message-unread"}
                  key={it.id}
                >
                  <div className="message-head">
                    <strong>{it.name || "New inquiry"}</strong>
                    <span>{formatInquiryDate(it.createdAt)}</span>
                  </div>
                  <p className="inquiry-contact"><a href={`mailto:${it.email}`}>{it.email}</a>{it.phone && <> · <a href={`tel:${it.phone}`}>{it.phone}</a></>}</p>
                  <dl className="inquiry-details">
                    <div><dt>Project type</dt><dd>{it.projectType || "Not specified"}</dd></div>
                    <div><dt>Location</dt><dd>{it.projectLocation || "Not specified"}</dd></div>
                    <div><dt>Ideal start</dt><dd>{it.timeline || "Not specified"}</dd></div>
                  </dl>
                  <p className="inquiry-message">{it.message}</p>
                  <div>
                    <button onClick={() => messageAction(it)}>
                      {it.read ? "Mark unread" : "Mark read"}
                    </button>
                    <button
                      onClick={() => deleteMessage(it)}
                      aria-label="Delete message"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="admin-empty">Your inquiry inbox is empty.</div>
          )
        ) : (
          <>
            <div className="admin-toolbar">
              <p>{items.length} items</p>
            </div>
            {loading ? (
              <Loader />
            ) : items.length ? (
              <div className="admin-list">
                {items.map((it) => {
                  const image = it.cover || it.images?.[0];
                  return (
                    <div key={it.id}>
                      {image && <img src={image} alt="" />}
                      <div>
                        <strong>{it.title || it.name || it.slug}</strong>
                        <span>
                          {it.category ||
                            it.role ||
                            it.status ||
                            "Studio content"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="admin-empty">
                No content yet. Add your first item.
              </div>
            )}
          </>
        )}
        {toast && (
          <div className="toast" role="status">
            {toast}
          </div>
        )}
      </section>
    </div>
  );
}
