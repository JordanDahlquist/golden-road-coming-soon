import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/* ------------------------------------------------------------------ */
/*  Helper: convert HSL string → hex (for display)                    */
/* ------------------------------------------------------------------ */
function hslToHex(hsl: string): string {
  const m = hsl.match(/hsl\((\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%\)/i);
  if (!m) return hsl;
  let h = parseFloat(m[1]) / 360;
  let s = parseFloat(m[2]) / 100;
  let l = parseFloat(m[3]) / 100;
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/* ------------------------------------------------------------------ */
/*  TOKEN DATA                                                        */
/* ------------------------------------------------------------------ */

interface TokenDef { name: string; cssVar: string; value: string; note?: string }

const BRAND_TOKENS: TokenDef[] = [
  { name: "background", cssVar: "--background", value: "hsl(0 2% 8%)", note: "page bg · #161515" },
  { name: "charcoal-deep", cssVar: "--charcoal-deep", value: "hsl(30 4% 18%)", note: "elevated surface · #302e2c" },
  { name: "charcoal", cssVar: "--charcoal", value: "hsl(30 4% 18%)", note: "surface · #302e2c" },
  { name: "gold", cssVar: "--gold", value: "hsl(40 74% 62%)", note: "hero accent · #e5b555" },
  { name: "off-white", cssVar: "--off-white", value: "hsl(30 11% 96%)", note: "headings · #f7f6f5" },
  { name: "muted-foreground", cssVar: "--muted-foreground", value: "hsl(30 8% 60%)", note: "body / captions" },
];

const RESERVED_TOKENS: TokenDef[] = [
  { name: "white", cssVar: "--white", value: "hsl(0 0% 100%)" },
  { name: "silver", cssVar: "--silver", value: "hsl(24 10% 90%)" },
  { name: "black", cssVar: "--black", value: "hsl(0 2% 8%)" },
  { name: "navy", cssVar: "--navy", value: "hsl(212 35% 33%)" },
  { name: "cool-blue", cssVar: "--cool-blue", value: "hsl(212 36% 53%)" },
  { name: "glacier", cssVar: "--glacier", value: "hsl(212 38% 66%)" },
  { name: "frozen", cssVar: "--frozen", value: "hsl(206 41% 80%)" },
  { name: "gold-light", cssVar: "--gold-light", value: "hsl(40 74% 72%)" },
  { name: "gold-dark", cssVar: "--gold-dark", value: "hsl(40 74% 52%)" },
  { name: "foreground", cssVar: "--foreground", value: "hsl(30 11% 96%)" },
  { name: "card", cssVar: "--card", value: "hsl(30 4% 12%)" },
  { name: "card-foreground", cssVar: "--card-foreground", value: "hsl(30 11% 96%)" },
  { name: "popover", cssVar: "--popover", value: "hsl(30 4% 12%)" },
  { name: "popover-foreground", cssVar: "--popover-foreground", value: "hsl(30 11% 96%)" },
  { name: "primary", cssVar: "--primary", value: "hsl(40 74% 62%)" },
  { name: "primary-foreground", cssVar: "--primary-foreground", value: "hsl(0 2% 8%)" },
  { name: "secondary", cssVar: "--secondary", value: "hsl(30 4% 18%)" },
  { name: "secondary-foreground", cssVar: "--secondary-foreground", value: "hsl(30 11% 96%)" },
  { name: "muted", cssVar: "--muted", value: "hsl(30 4% 18%)" },
  { name: "accent", cssVar: "--accent", value: "hsl(40 74% 62%)" },
  { name: "accent-foreground", cssVar: "--accent-foreground", value: "hsl(0 2% 8%)" },
  { name: "destructive", cssVar: "--destructive", value: "hsl(0 84.2% 60.2%)" },
  { name: "destructive-foreground", cssVar: "--destructive-foreground", value: "hsl(210 40% 98%)" },
  { name: "border", cssVar: "--border", value: "hsl(30 4% 25%)" },
  { name: "input", cssVar: "--input", value: "hsl(30 4% 25%)" },
  { name: "ring", cssVar: "--ring", value: "hsl(40 74% 62%)" },
  { name: "sidebar-background", cssVar: "--sidebar-background", value: "hsl(0 0% 98%)" },
  { name: "sidebar-foreground", cssVar: "--sidebar-foreground", value: "hsl(240 5.3% 26.1%)" },
  { name: "sidebar-primary", cssVar: "--sidebar-primary", value: "hsl(240 5.9% 10%)" },
  { name: "sidebar-primary-foreground", cssVar: "--sidebar-primary-foreground", value: "hsl(0 0% 98%)" },
  { name: "sidebar-accent", cssVar: "--sidebar-accent", value: "hsl(240 4.8% 95.9%)" },
  { name: "sidebar-accent-foreground", cssVar: "--sidebar-accent-foreground", value: "hsl(240 5.9% 10%)" },
  { name: "sidebar-border", cssVar: "--sidebar-border", value: "hsl(220 13% 91%)" },
  { name: "sidebar-ring", cssVar: "--sidebar-ring", value: "hsl(217.2 91.2% 59.8%)" },
];

/* ------------------------------------------------------------------ */
/*  SWATCH COMPONENTS                                                  */
/* ------------------------------------------------------------------ */

function BrandSwatch({ token }: { token: TokenDef }) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="h-24 w-full rounded-md border border-border/30 shadow-sm"
        style={{ backgroundColor: token.value }}
      />
      <div>
        <p className="font-sans text-sm font-medium text-off-white">{token.name}</p>
        <p className="font-sans text-xs text-muted-foreground">{token.value}</p>
        <p className="font-sans text-xs text-muted-foreground/70">{hslToHex(token.value)}</p>
        {token.note && <p className="mt-1 font-sans text-[11px] uppercase tracking-wider text-gold/80">{token.note}</p>}
      </div>
    </div>
  );
}

function ReservedSwatch({ token }: { token: TokenDef }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-10 w-10 shrink-0 rounded border border-border/20"
        style={{ backgroundColor: token.value }}
      />
      <div className="min-w-0">
        <p className="truncate font-sans text-xs text-off-white/70">{token.name}</p>
        <p className="truncate font-sans text-[11px] text-muted-foreground/50">{token.value} · {hslToHex(token.value)}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MOTION COMPONENTS                                                  */
/* ------------------------------------------------------------------ */

function MotionDemo() {
  const prefersReduced = useReducedMotion();
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {/* Fade In */}
      <div className="space-y-3">
        <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Fade In</p>
        <motion.div
          className="h-20 rounded-md bg-charcoal border border-border/30 flex items-center justify-center"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <span className="font-serif text-gold text-lg">Fade</span>
        </motion.div>
      </div>

      {/* Upward Reveal */}
      <div className="space-y-3">
        <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Upward Reveal</p>
        <motion.div
          className="h-20 rounded-md bg-charcoal border border-border/30 flex items-center justify-center"
          initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-serif text-gold text-lg">Reveal</span>
        </motion.div>
      </div>

      {/* Refined Hover */}
      <div className="space-y-3">
        <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Refined Hover</p>
        <motion.button
          className="h-20 w-full rounded-md bg-transparent border border-gold/40 text-gold font-serif text-lg flex items-center justify-center"
          whileHover={prefersReduced ? {} : { scale: 1.02, borderColor: "hsl(42 72% 62%)", boxShadow: "0 0 24px hsla(42,72%,62%,0.12)" }}
          transition={{ duration: 0.3 }}
        >
          Hover
        </motion.button>
      </div>

      {prefersReduced && (
        <div className="md:col-span-3">
          <p className="font-sans text-xs text-muted-foreground italic">
            prefers-reduced-motion is active — animations are disabled.
          </p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */

export default function Styleguide() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/20">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
            Internal Reference
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-off-white">
            Design System
          </h1>
          <p className="mt-4 font-sans text-sm text-muted-foreground max-w-xl">
            Golden Road Strategies — visual tokens, typography, spacing, components, and motion. For internal use only.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-16 space-y-24">

        {/* ============================================================ */}
        {/*  COLOR                                                       */}
        {/* ============================================================ */}
        <section>
          <div className="mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-off-white">Color</h2>
            <p className="mt-2 font-sans text-sm text-muted-foreground">All swatches derived from <code className="text-gold">src/index.css</code> and <code className="text-gold">tailwind.config.ts</code>.</p>
          </div>

          {/* GROUP 1 — Brand palette */}
          <div className="mb-14">
            <div className="flex items-baseline gap-4 mb-6">
              <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Brand palette
              </h3>
              <span className="font-sans text-xs text-off-white/60">Use these — source of truth for every public site section</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {BRAND_TOKENS.map((t) => (
                <BrandSwatch key={t.name} token={t} />
              ))}
            </div>
          </div>

          {/* GROUP 2 — Reserved */}
          <div className="relative rounded-lg border border-border/10 bg-charcoal-deep/50 p-6 md:p-8">
            <div className="absolute -top-3 left-6 md:left-8 bg-background px-2">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Defined but reserved
              </h3>
            </div>
            <p className="mt-2 mb-6 font-sans text-xs text-muted-foreground/70">
              Do not use in site sections unless explicitly promoted later. Shown here for reference only.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              {RESERVED_TOKENS.map((t) => (
                <ReservedSwatch key={t.name} token={t} />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  TYPOGRAPHY                                                  */}
        {/* ============================================================ */}
        <section>
          <div className="mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-off-white">Typography</h2>
            <p className="mt-2 font-sans text-sm text-muted-foreground">Cormorant Garamond (serif) for headings. Montserrat (sans) for body. All sizes in rem.</p>
          </div>

          <div className="space-y-10">
            {/* Display */}
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3">Display / Hero</p>
              <p className="font-serif text-5xl md:text-6xl lg:text-7xl text-off-white tracking-wide leading-none">
                Financial clarity
              </p>
              <p className="mt-2 font-sans text-xs text-muted-foreground">font-serif · 3rem–4.5rem · tracking-wide · leading-none</p>
            </div>

            {/* H1 */}
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3">Heading 1</p>
              <h1 className="font-serif text-4xl md:text-5xl text-off-white tracking-tight">
                Scale with confidence
              </h1>
              <p className="mt-2 font-sans text-xs text-muted-foreground">font-serif · 2.25rem–3rem · tracking-tight</p>
            </div>

            {/* H2 */}
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3">Heading 2</p>
              <h2 className="font-serif text-3xl md:text-4xl text-off-white">
                Strategic finance leadership
              </h2>
              <p className="mt-2 font-sans text-xs text-muted-foreground">font-serif · 1.875rem–2.25rem</p>
            </div>

            {/* H3 */}
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3">Heading 3</p>
              <h3 className="font-serif text-2xl md:text-3xl text-off-white">
                Fractional CFO services
              </h3>
              <p className="mt-2 font-sans text-xs text-muted-foreground">font-serif · 1.5rem–1.875rem</p>
            </div>

            {/* Body Large */}
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3">Body Large</p>
              <p className="font-sans text-lg text-off-white/90 leading-relaxed max-w-2xl">
                We build forward-looking financial architecture that lets founders make scalable decisions without the overhead of a full-time CFO.
              </p>
              <p className="mt-2 font-sans text-xs text-muted-foreground">font-sans · 1.125rem · leading-relaxed</p>
            </div>

            {/* Body */}
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3">Body</p>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-2xl">
                Every engagement starts with a clear assessment of where the financial infrastructure is today versus where it needs to be to support the next stage of growth. No templates. No jargon. Just the work.
              </p>
              <p className="mt-2 font-sans text-xs text-muted-foreground">font-sans · 0.875rem · leading-relaxed · text-muted-foreground</p>
            </div>

            {/* Small / Caption */}
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3">Small / Caption</p>
              <p className="font-sans text-xs text-muted-foreground/70 uppercase tracking-wider">
                Southern California · Available Globally
              </p>
              <p className="mt-2 font-sans text-xs text-muted-foreground">font-sans · 0.75rem · uppercase · tracking-wider</p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SPACING                                                     */}
        {/* ============================================================ */}
        <section>
          <div className="mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-off-white">Spacing</h2>
            <p className="mt-2 font-sans text-sm text-muted-foreground">Tailwind scale. Use the token, not the raw px value.</p>
          </div>

          <div className="space-y-6">
            {[
              { token: "space-2", px: "8px", rem: "0.5rem" },
              { token: "space-4", px: "16px", rem: "1rem" },
              { token: "space-6", px: "24px", rem: "1.5rem" },
              { token: "space-8", px: "32px", rem: "2rem" },
              { token: "space-12", px: "48px", rem: "3rem" },
              { token: "space-16", px: "64px", rem: "4rem" },
              { token: "space-24", px: "96px", rem: "6rem" },
              { token: "space-32", px: "128px", rem: "8rem" },
            ].map((s) => (
              <div key={s.token} className="flex items-center gap-6">
                <div
                  className="h-6 bg-gold/40 rounded-sm"
                  style={{ width: s.px }}
                />
                <div className="flex items-center gap-4 min-w-0">
                  <code className="font-sans text-xs text-gold shrink-0">{s.token}</code>
                  <span className="font-sans text-xs text-muted-foreground shrink-0">{s.px}</span>
                  <span className="font-sans text-xs text-muted-foreground/50">{s.rem}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  COMPONENTS                                                  */}
        {/* ============================================================ */}
        <section>
          <div className="mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-off-white">Components</h2>
            <p className="mt-2 font-sans text-sm text-muted-foreground">shadcn/ui primitives themed to the Golden Road system.</p>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {/* Buttons */}
            <div className="space-y-6">
              <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Buttons</p>
              <div className="flex flex-wrap gap-4">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-6">
              <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Form Fields</p>
              <div className="space-y-4">
                <Input placeholder="Email address" />
                <Textarea placeholder="How can we help?" />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        /*  MOTION                                                      */
        {/* ============================================================ */}
        <section>
          <div className="mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-off-white">Motion</h2>
            <p className="mt-2 font-sans text-sm text-muted-foreground">Subtle, refined. Always respect <code className="text-gold">prefers-reduced-motion</code>.</p>
          </div>
          <MotionDemo />
        </section>

        {/* ============================================================ */}
        {/*  BREAKPOINTS                                                 */}
        {/* ============================================================ */}
        <section>
          <div className="mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-off-white">Breakpoints</h2>
            <p className="mt-2 font-sans text-sm text-muted-foreground">Tailwind defaults. No custom breakpoints.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "sm", value: "640px" },
              { name: "md", value: "768px" },
              { name: "lg", value: "1024px" },
              { name: "xl", value: "1280px" },
              { name: "2xl", value: "1400px" },
            ].map((bp) => (
              <div key={bp.name} className="rounded-md border border-border/20 p-4 text-center">
                <p className="font-serif text-2xl text-off-white">{bp.name}</p>
                <p className="mt-1 font-sans text-xs text-muted-foreground">{bp.value}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-border/20 mt-24">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-muted-foreground/50">
            Golden Road Strategies — Internal Design Reference
          </p>
          <p className="font-sans text-xs text-muted-foreground/50">
            Not for public release
          </p>
        </div>
      </footer>
    </main>
  );
}
