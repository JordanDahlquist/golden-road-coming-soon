import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

type NavLink = { label: string; href: string; id: string };

const LINKS: NavLink[] = [
  { label: "Services", href: "#services", id: "services" },
  { label: "Expertise", href: "#expertise", id: "expertise" },
  { label: "Advantage", href: "#advantage", id: "advantage" },
  { label: "Story", href: "#story", id: "story" },
];

const NavV2 = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 70);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const handleAnchor = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setOpen(false);
    const id = href.slice(1);
    if (id === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 w-full",
          "transition-[background-color,backdrop-filter,border-color,padding] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "bg-background/[0.92] border-b border-off-white/10 py-3"
            : "bg-transparent border-b border-transparent py-5",
        ].join(" ")}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 md:px-12 lg:px-20"
        >
          <a
            href="#"
            onClick={(e) => handleAnchor(e, "#")}
            aria-label="Golden Road Strategies — home"
            className="inline-flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <img
              id="nav-logo"
              src={logo}
              alt="Golden Road Strategies"
              className={[
                "nav-logo w-auto select-none transition-[height] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                scrolled ? "h-6 md:h-7" : "h-7 md:h-8",
              ].join(" ")}
              draggable={false}
            />
          </a>

          <ul className="hidden md:flex items-center gap-8 lg:gap-10">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleAnchor(e, link.href)}
                  data-active={activeId === link.id ? "true" : "false"}
                  className="luxe-link font-sans uppercase tracking-[0.18em] text-[11px] lg:text-xs text-off-white/80"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={(e) => handleAnchor(e, "#contact")}
            className="luxe-cta hidden md:inline-flex items-center justify-center bg-gold text-charcoal-deep font-sans uppercase tracking-[0.16em] text-[11px] lg:text-xs px-5 py-2.5 rounded-sm"
          >
            START THE CONVERSATION
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-v2-mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center text-gold p-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </nav>
      </header>

      <div
        id="site-v2-mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={[
          "md:hidden fixed inset-0 z-[60] bg-background/95",
          "transition-opacity duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <a
            href="#"
            onClick={(e) => handleAnchor(e, "#")}
            aria-label="Golden Road Strategies — home"
            className="inline-flex items-center"
          >
            <img src={logo} alt="Golden Road Strategies" className="h-7 w-auto" draggable={false} />
          </a>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="text-gold p-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <X size={26} strokeWidth={1.5} />
          </button>
        </div>

        <nav aria-label="Mobile primary" className="px-6 pt-8 pb-12 flex flex-col h-[calc(100%-72px)]">
          <ul className="flex flex-col gap-7">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleAnchor(e, link.href)}
                  data-active={activeId === link.id ? "true" : "false"}
                  className="luxe-link block font-serif text-off-white text-3xl leading-tight"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-10">
            <a
              href="#contact"
              onClick={(e) => handleAnchor(e, "#contact")}
              className="luxe-cta inline-flex w-full items-center justify-center bg-gold text-charcoal-deep font-sans uppercase tracking-[0.18em] text-sm px-6 py-4 rounded-sm"
            >
              START THE CONVERSATION
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavV2;
