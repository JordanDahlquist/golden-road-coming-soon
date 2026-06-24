import { useState } from "react";
import { Linkedin, Mail, MapPin } from "lucide-react";
import { FadeRise, MaskedLines, SectionEnter } from "./motion";
import goldenRoad from "@/assets/golden-road.png.asset.json";

const RECIPIENT = "tgolden@goldenroadstrategies.com";

const SOCIAL_LINKS = [
  { label: "LinkedIn, Tracy Golden", href: "#" },
  { label: "LinkedIn, Golden Road Strategies", href: "#" },
] as const;

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "opened">("idle");

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    setErrorMsg(null);

    const errors = {
      name: !form.name.trim(),
      email: !form.email.trim() || !isValidEmail(form.email),
      message: !form.message.trim(),
    };

    if (errors.name || errors.email || errors.message) {
      setStatus("idle");
      return;
    }

    setStatus("sending");

    try {
      const payload = new FormData();
      payload.append("name", form.name.trim());
      payload.append("email", form.email.trim());
      payload.append("company", form.company.trim() || "—");
      payload.append("message", form.message.trim());
      payload.append("_subject", `New inquiry from ${form.name.trim()} — Golden Road Strategies`);
      payload.append("_template", "table");
      payload.append("_captcha", "false");

      const res = await fetch(`https://formsubmit.co/ajax/${RECIPIENT}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });

      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      setStatus("opened");
    } catch (err) {
      console.error("Contact form submission failed", err);
      setErrorMsg(
        "Something went wrong sending your message. Please email me directly at " +
          RECIPIENT + ".",
      );
      setStatus("idle");
    }
  };


  const fieldLabel = "luxe-label t-label text-gold/80";
  const fieldInput =
    "luxe-input flex h-12 w-full rounded-[6px] border border-off-white/10 bg-[#1a1817] px-4 py-2 t-body-sm text-off-white placeholder:text-off-white/30";

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-background">
      {/* ── Road background: full-bleed, darker than hero ─────────── */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <img
          src={goldenRoad.url}
          alt=""
          className="absolute inset-0 h-full w-full object-cover scale-x-[-1] opacity-[0.55]"
          loading="lazy"
        />
        {/* Dark scrim for legibility */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_85%,rgba(229,181,85,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background/95" />
        {/* Low warm horizon glow echoing the hero */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(ellipse_60%_70%_at_50%_100%,rgba(229,181,85,0.22),transparent_70%)]" />
        {/* Subtle film grain */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")",
          }}
        />
      </div>

      <SectionEnter
        as="div"
        className="relative px-6 md:px-12 lg:px-20 pt-24 md:pt-32 pb-28 md:pb-40 text-off-white"
        amount={0.2}
      >
        <div className="mx-auto w-full max-w-[1180px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-14 md:gap-20 items-start">
            {/* ── LEFT: invitation ───────────────────────────────── */}
            <div className="flex flex-col gap-10">
              <FadeRise
                trigger="child"
                as="p"
                className="t-eyebrow"
              >
                START THE CONVERSATION
              </FadeRise>

              <MaskedLines
                as="h2"
                trigger="in-view"
                lines={[
                  <>If your company has outgrown</>,
                  <>its current finance function,</>,
                  <>
                    <span className="italic text-gold">let's talk.</span>
                  </>,
                ]}
                className="-mt-4 t-h2 text-off-white"
              />

              <FadeRise trigger="child" as="div">
                <p className="t-lead text-off-white/75 max-w-[52ch]">
                  Tell me where you are and where you're trying to go. If it's
                  a fit, we'll find the path. If it's not, I'll tell you that
                  too.
                </p>
              </FadeRise>

              {/* Thin gold divider */}
              <FadeRise trigger="child" as="div">
                <div className="h-px w-16 bg-gold/60" />
              </FadeRise>

              {/* Contact details */}
              <div className="flex flex-col gap-6">
                <FadeRise trigger="child" as="div">
                  <p className={fieldLabel}>Email</p>
                  <a
                    href="mailto:info@goldenroadstrategies.com"
                    className="luxe-link mt-2 inline-flex items-center gap-3 t-body text-off-white"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                    <span>info@goldenroadstrategies.com</span>
                  </a>
                </FadeRise>

                <FadeRise trigger="child" as="div">
                  <p className={fieldLabel}>Connect</p>
                  <div className="mt-2 flex flex-col gap-2.5">
                    {SOCIAL_LINKS.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="luxe-link inline-flex items-center gap-3 t-body text-off-white/80"
                      >
                        <Linkedin className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </div>
                </FadeRise>

                <FadeRise trigger="child" as="div">
                  <p className="inline-flex items-center gap-3 t-body-sm text-off-white/50">
                    <MapPin className="h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.5} />
                    <span>Southern California &nbsp;|&nbsp; Available Globally</span>
                  </p>
                </FadeRise>
              </div>
            </div>

            {/* ── RIGHT: floating form card ─────────────────────── */}
            <FadeRise trigger="child" as="div" className="relative">
              {/* Warm glow behind the card */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 -z-10 rounded-[20px] bg-[radial-gradient(ellipse_at_50%_50%,rgba(229,181,85,0.18),transparent_70%)] blur-2xl"
              />
              <div
                className="relative rounded-[12px] border border-gold/20 bg-charcoal/95 p-7 md:p-10 backdrop-blur-sm"
                style={{
                  boxShadow:
                    "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(229,181,85,0.06), inset 0 1px 0 rgba(247,246,245,0.04)",
                }}
              >
                {/* Inner top hairline accent */}
                <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

                {status === "opened" ? (
                  <div className="py-6" role="status" aria-live="polite">
                    <p className="t-card-title">
                      Opening your email…{" "}
                      <span className="text-gold italic">I look forward to reading your note.</span>
                    </p>
                    <p className="mt-4 t-body-sm text-off-white/70">
                      If your email client didn't open, you can reach me directly at{" "}
                      <a
                        href={`mailto:${RECIPIENT}`}
                        className="luxe-link text-off-white"
                      >
                        {RECIPIENT}
                      </a>
                      .
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                    aria-label="Contact form"
                    noValidate
                  >
                    <FadeRise trigger="child" as="div" className="luxe-field flex flex-col gap-2">
                      <label htmlFor="contact-name" className={fieldLabel}>Name</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${fieldInput} ${touched.name && !form.name.trim() ? "border-gold/60" : ""}`}
                        placeholder="Your name"
                        aria-describedby={touched.name && !form.name.trim() ? "contact-name-error" : undefined}
                      />
                      {touched.name && !form.name.trim() && (
                        <p id="contact-name-error" className="t-label text-gold">
                          Please enter your name.
                        </p>
                      )}
                    </FadeRise>

                    <FadeRise trigger="child" as="div" className="luxe-field flex flex-col gap-2">
                      <label htmlFor="contact-email" className={fieldLabel}>Email</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${fieldInput} ${touched.email && (!form.email.trim() || !isValidEmail(form.email)) ? "border-gold/60" : ""}`}
                        placeholder="you@company.com"
                        aria-describedby={touched.email && (!form.email.trim() || !isValidEmail(form.email)) ? "contact-email-error" : undefined}
                      />
                      {touched.email && !form.email.trim() && (
                        <p id="contact-email-error" className="t-label text-gold">
                          Please enter your email address.
                        </p>
                      )}
                      {touched.email && form.email.trim() && !isValidEmail(form.email) && (
                        <p id="contact-email-error" className="t-label text-gold">
                          Please enter a valid email address.
                        </p>
                      )}
                    </FadeRise>

                    <FadeRise trigger="child" as="div" className="luxe-field flex flex-col gap-2">
                      <label htmlFor="contact-company" className={fieldLabel}>Company</label>
                      <input
                        id="contact-company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        className={fieldInput}
                        placeholder="Company name"
                      />
                    </FadeRise>

                    <FadeRise trigger="child" as="div" className="luxe-field flex flex-col gap-2">
                      <label htmlFor="contact-message" className={fieldLabel}>Message</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`luxe-input flex min-h-[130px] w-full rounded-[6px] border px-4 py-3 t-body-sm text-off-white placeholder:text-off-white/30 resize-y ${touched.message && !form.message.trim() ? "border-gold/60" : "border-off-white/10"} bg-[#1a1817]`}
                        placeholder="Where are you stuck?"
                        aria-describedby={touched.message && !form.message.trim() ? "contact-message-error" : undefined}
                      />
                      {touched.message && !form.message.trim() && (
                        <p id="contact-message-error" className="t-label text-gold">
                          Please enter a message.
                        </p>
                      )}
                    </FadeRise>

                    <FadeRise trigger="child" as="div" className="mt-2">
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="luxe-cta inline-flex items-center justify-center w-full bg-gold text-background t-label px-8 py-4 rounded-[6px]"
                      >
                        {status === "sending" ? "Opening your email…" : "Start the Conversation"}
                      </button>
                      <p className="mt-4 text-center t-label text-off-white/40">
                        Replies typically within one business day.
                      </p>
                    </FadeRise>
                  </form>
                )}
              </div>
            </FadeRise>
          </div>
        </div>
      </SectionEnter>
    </section>
  );
};

export default ContactSection;
