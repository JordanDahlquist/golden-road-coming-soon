import RoadBackground from "@/components/road/RoadBackground";
import RoadStation from "@/components/road/RoadStation";

/**
 * /road — isolated proof-of-concept for "Stations on the Golden Road."
 * Persistent cinematic background; sections emerge from the horizon, rest
 * readably at screen center, then recede as the next station rises.
 * Scroll is normal (scroll-linked, never hijacked).
 */
const Road = () => {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <RoadBackground />

      {/* Spacer so the first station has horizon visible before it arrives */}
      <div className="relative z-10 h-[40vh]" aria-hidden />

      {/* Station 1 — Hero */}
      <RoadStation>
        <p
          className="mb-6 text-xs uppercase tracking-[0.35em] text-foreground/60"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Golden Road Strategies
        </p>
        <h1
          className="mb-8 text-balance text-5xl leading-[1.05] text-foreground md:text-7xl"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            letterSpacing: "-0.02em",
          }}
        >
          Build the financial infrastructure your next stage demands.
        </h1>
        <p
          className="mx-auto mb-10 max-w-xl text-base text-foreground/75 md:text-lg"
          style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }}
        >
          Forward-looking strategic finance leadership for founders, CEOs, and
          boards ready to break through their growth ceiling.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-none border border-[hsl(var(--gold))] bg-[hsl(var(--gold))] px-8 py-4 text-xs uppercase tracking-[0.28em] text-[hsl(var(--background))] transition-all duration-500 hover:bg-transparent hover:text-[hsl(var(--gold))]"
          style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}
        >
          Start the Conversation
        </a>
      </RoadStation>

      {/* Station 2 — The Pain lead-in */}
      <RoadStation>
        <p
          className="mb-6 text-xs uppercase tracking-[0.4em] text-[hsl(var(--gold))]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          The Ceiling
        </p>
        <h2
          className="mb-8 text-balance text-4xl leading-[1.08] text-foreground md:text-6xl"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            letterSpacing: "-0.02em",
          }}
        >
          You did everything right. The growth still stalled.
        </h2>
        <p
          className="mx-auto max-w-xl text-base text-foreground/75 md:text-lg"
          style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }}
        >
          Revenue climbs, the team scales, the calendar fills. Yet decisions get
          made on lagging data, the financial architecture wasn't built for this
          stage, and the next level keeps slipping out of reach.
        </p>
      </RoadStation>

      {/* Tail spacer so the last station can complete its recede */}
      <div className="relative z-10 h-[30vh]" aria-hidden />
    </main>
  );
};

export default Road;
