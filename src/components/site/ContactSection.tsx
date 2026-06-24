import { useState } from "react";
import { Linkedin } from "lucide-react";
import { FadeRise, MaskedLines, SectionEnter } from "./motion";

/* ── Email delivery hookup point ──────────────────────────────────────
   TODO: Wire form submission to email delivery (e.g. Supabase Edge
   Function, Resend, or similar). For now this is front-end only:
   it console.logs the payload and shows a thank-you state.
   ------------------------------------------------------------------ */

const SOCIAL_LINKS = [
  {
    label: "LinkedIn, Tracy Golden",
    href: "#", // PLACEHOLDER: confirm URL before going live
  },
  {
    label: "LinkedIn, Golden Road Strategies",
    href: "#", // PLACEHOLDER: confirm URL before going live
  },
] as const;

/**
 * Contact section — the close.
 *
 * A single, direct call to action. Editorial two-column on desktop
 * (content left, form right), stacked on mobile. Charcoal form
 * surfaces, gold focus ring, gold submit button matching the hero CTA.
 * Front-end only; email delivery marked for future wiring.
 */
const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire email delivery here (Supabase Edge Function, Resend, etc.)
    console.log("[ContactForm] payload:", form);
    setSubmitted(true);
  };

  return (
    <section id="contact">
      <SectionEnter
        as="div"
        className="relative bg-background text-off-white px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-24 md:pb-32"
        amount={0.25}
      >
      <div className="mx-auto w-full max-w-[1100px]">
        {/* ── Section intro ────────────────────────────────────────── */}
        <FadeRise
          trigger="child"
          as="p"
          className="font-sans uppercase tracking-[0.2em] text-xs text-off-white/50"
        >
          START THE CONVERSATION
        </FadeRise>

        <MaskedLines
          as="h2"
          trigger="in-view"
          lines={[
            <>If your company has outgrown</>,
            <>its current finance function,</>,
            <>let's talk.</>,
          ]}
          className="mt-5 font-serif tracking-tight text-off-white"
          style={{
            fontSize: "clamp(1.875rem, 3.8vw, 3.5rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
          }}
        />

        {/* ── Two-column: content + form ─────────────────────────── */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-start">
          {/* Left column — copy + contact details */}
          <div className="flex flex-col gap-8 md:gap-10">
            <FadeRise trigger="child" as="div">
              <p
                className="font-sans text-off-white/70 leading-relaxed max-w-[48ch]"
                style={{
                  fontSize: "clamp(0.875rem, 1vw, 1rem)",
                }}
              >
                Tell me where you are and where you're trying to go. If it's a
                fit, we'll find the path. If it's not, I'll tell you that too.
              </p>
            </FadeRise>

            {/* Email */}
            <FadeRise trigger="child" as="div">
              <p className="font-sans uppercase tracking-[0.2em] text-xs text-off-white/50">
                Email
              </p>
              <a
                href="mailto:info@goldenroadstrategies.com"
                className="luxe-link mt-2 font-sans text-off-white"
                style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }}
              >
                info@goldenroadstrategies.com
              </a>
            </FadeRise>

            {/* Social links */}
            <FadeRise trigger="child" as="div">
              <p className="font-sans uppercase tracking-[0.2em] text-xs text-off-white/50">
                Connect
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="luxe-link font-sans text-off-white/70"
                    style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }}
                  >
                    <Linkedin className="mr-2 h-4 w-4 shrink-0" />
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </FadeRise>

            {/* Locations line */}
            <FadeRise trigger="child" as="div" className="mt-2">
              <p className="font-sans text-off-white/40 text-sm">
                Southern California | Available Globally
              </p>
            </FadeRise>
          </div>

          {/* Right column — form */}
          <FadeRise trigger="child" as="div">
            {submitted ? (
              <div className="bg-secondary rounded-sm p-8 md:p-10">
                <p
                  className="font-serif text-off-white"
                  style={{
                    fontSize: "clamp(1.25rem, 1.8vw, 1.625rem)",
                    lineHeight: 1.3,
                  }}
                >
                  Thank you. I'll be in touch shortly.
                </p>
                <p className="mt-4 font-sans text-off-white/70 text-sm leading-relaxed">
                  If this is urgent, email me directly at{" "}
                  <a
                    href="mailto:info@goldenroadstrategies.com"
                    className="luxe-link text-off-white"
                  >
                    info@goldenroadstrategies.com
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
                aria-label="Contact form"
              >
                {/* Name */}
                <div className="luxe-field flex flex-col gap-2">
                  <label
                    htmlFor="contact-name"
                    className="luxe-label font-sans uppercase tracking-[0.15em] text-[10px] text-off-white/50"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="luxe-input flex h-11 w-full rounded-sm border border-off-white/15 bg-secondary px-4 py-2 text-sm text-off-white placeholder:text-off-white/30"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div className="luxe-field flex flex-col gap-2">
                  <label
                    htmlFor="contact-email"
                    className="luxe-label font-sans uppercase tracking-[0.15em] text-[10px] text-off-white/50"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="luxe-input flex h-11 w-full rounded-sm border border-off-white/15 bg-secondary px-4 py-2 text-sm text-off-white placeholder:text-off-white/30"
                    placeholder="you@company.com"
                  />
                </div>

                {/* Company */}
                <div className="luxe-field flex flex-col gap-2">
                  <label
                    htmlFor="contact-company"
                    className="luxe-label font-sans uppercase tracking-[0.15em] text-[10px] text-off-white/50"
                  >
                    Company
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    className="luxe-input flex h-11 w-full rounded-sm border border-off-white/15 bg-secondary px-4 py-2 text-sm text-off-white placeholder:text-off-white/30"
                    placeholder="Company name"
                  />
                </div>

                {/* Message */}
                <div className="luxe-field flex flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className="luxe-label font-sans uppercase tracking-[0.15em] text-[10px] text-off-white/50"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="luxe-input flex min-h-[120px] w-full rounded-sm border border-off-white/15 bg-secondary px-4 py-3 text-sm text-off-white placeholder:text-off-white/30 resize-y"
                    placeholder="Where are you stuck?"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="luxe-cta mt-2 inline-flex items-center justify-center w-full sm:w-auto bg-gold text-background font-sans uppercase tracking-[0.14em] text-xs md:text-sm px-8 py-4 rounded-[5px]"
                >
                  Start the Conversation
                </button>
              </form>
            )}
          </FadeRise>
        </div>
      </div>
    </SectionEnter>
    </section>
  );
};

export default ContactSection;
