import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import SEO from "../components/SEO.jsx";
import Button from "../components/Button.jsx";
import { sendMessage } from "../services/data.js";
import useSiteSettings from "../hooks/useSiteSettings.js";
export default function Contact() {
  const { settings } = useSiteSettings();
  const address = settings.address || "45 Orchard Street, New York, NY 10002";
  const email = settings.email || "hello@ateliernorth.studio";
  const phone = settings.phone || "+1 212 555 0148";
  const phoneLink = phone.replace(/[^\d+]/g, "");
  const [status, setStatus] = useState("idle"),
    [error, setError] = useState(""),
    [fieldErrors, setFieldErrors] = useState({});
  function validate(data) {
    const next = {};
    if ((data.name || "").trim().length < 2) next.name = "Enter your name (at least 2 characters).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((data.email || "").trim())) next.email = "Enter a valid email address.";
    const digits = (data.phone || "").replace(/\D/g, "");
    if (data.phone?.trim() && (!/^[+()\-\s\d.]+$/.test(data.phone) || digits.length < 7 || digits.length > 15)) next.phone = "Enter a valid phone number, or leave this field blank.";
    if (!data.projectType) next.projectType = "Choose a project type.";
    if ((data.message || "").trim().length < 20) next.message = "Please add at least 20 characters so we understand your inquiry.";
    return next;
  }
  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    for (const key of Object.keys(data)) if (typeof data[key] === "string") data[key] = data[key].trim();
    const validation = validate(data);
    setFieldErrors(validation);
    if (Object.keys(validation).length) {
      form.querySelector(`[name="${Object.keys(validation)[0]}"]`)?.focus();
      return;
    }
    setStatus("loading");
    setError("");
    try {
      await sendMessage(data);
      setStatus("success");
      form.reset();
    } catch (err) {
      setError(err.message || "Please try again.");
      setStatus("error");
    }
  }
  return (
    <>
      <SEO title="Contact" />
      <section className="page-intro container">
        <span className="eyebrow">Start a conversation</span>
        <h1>
          Tell us what
          <br />
          you’re imagining.
        </h1>
        <p>
          Tell us where you are in the process, what you hope to change, and what matters most. We take on a select number of projects each year and usually reply within two working days.
        </p>
      </section>
      <section className="contact-layout container">
        <form className="contact-form" onSubmit={submit} noValidate>
          <h2>A little about your project</h2>
          <div className="form-grid">
            <label>
              Your name
              <input name="name" autoComplete="name" aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name ? "name-error" : undefined} />
              {fieldErrors.name && <small className="field-error" id="name-error">{fieldErrors.name}</small>}
            </label>
            <label>
              Email address
              <input name="email" type="email" autoComplete="email" aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? "email-error" : undefined} />
              {fieldErrors.email && <small className="field-error" id="email-error">{fieldErrors.email}</small>}
            </label>
            <label>
              <span className="label-heading">Phone <em>(optional)</em></span>
              <input name="phone" type="tel" autoComplete="tel" aria-invalid={!!fieldErrors.phone} aria-describedby={fieldErrors.phone ? "phone-error" : undefined} />
              {fieldErrors.phone && <small className="field-error" id="phone-error">{fieldErrors.phone}</small>}
            </label>
            <label>
              Project type
              <select name="projectType" defaultValue="" aria-invalid={!!fieldErrors.projectType} aria-describedby={fieldErrors.projectType ? "projectType-error" : undefined}>
                <option value="" disabled>
                  Select a service
                </option>
                {[
                  "Residential",
                  "Commercial",
                  "Interior",
                  "Landscape",
                  "Other",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
              {fieldErrors.projectType && <small className="field-error" id="projectType-error">{fieldErrors.projectType}</small>}
            </label>
            <label>Project location<input name="projectLocation" placeholder="City, neighborhood, or address" /></label>
            <label>Ideal start<select name="timeline" defaultValue=""><option value="">Choose a timeframe</option><option>As soon as possible</option><option>Within 3–6 months</option><option>Within 6–12 months</option><option>Still exploring</option></select></label>
          </div>
          <label>
            Tell us a little more
            <textarea
              required
              name="message"
              rows="5"
              minLength="20"
              placeholder="What are you hoping to create? Share a little about the place, your priorities, and any questions you have."
              maxLength="4000"
              aria-invalid={!!fieldErrors.message}
              aria-describedby={fieldErrors.message ? "message-error" : undefined}
            />
            {fieldErrors.message && <small className="field-error" id="message-error">{fieldErrors.message}</small>}
          </label>
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : "Send your inquiry"}{" "}
            <ArrowUpRight size={16} />
          </Button>
          {status === "success" && (
            <p className="form-success" role="status">
              Thank you. Your note is on its way; we’ll be in touch soon.
            </p>
          )}
          {status === "error" && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <p className="contact-privacy">Your details are only used to respond to this inquiry. Please do not include sensitive personal information.</p>
        </form>
        <aside className="contact-aside">
          <div>
            <span className="eyebrow">Find the studio</span>
            <h3>{address}</h3>
            <p className="contact-address-note">Lower East Side · Meetings by appointment</p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noreferrer"
            >
              Get directions ↗
            </a>
          </div>
          <div className="map-frame">
            <iframe
              title="Map showing Atelier North in New York"
              loading="lazy"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            />
          </div>
          <div className="hours">
            <span className="eyebrow">Studio hours</span>
            <p>
              Monday–Friday · 9:00 am–6:00 pm
              <br />
              By appointment
            </p>
            <a href={`mailto:${email}`}>{email}</a>
            <p><a href={`tel:${phoneLink}`}>{phone}</a><br />For new projects, please use the inquiry form and include a good time to call.</p>
          </div>
        </aside>
      </section>
    </>
  );
}
