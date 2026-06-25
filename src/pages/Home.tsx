import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="flex flex-col sm:flex-row gap-6">
        <Link
          to="/site-v2"
          className="inline-flex items-center justify-center px-10 py-4 border border-gold text-gold font-montserrat tracking-[0.2em] text-sm uppercase hover:bg-gold hover:text-charcoal transition-colors"
        >
          Version 1
        </Link>
        <Link
          to="/site"
          className="inline-flex items-center justify-center px-10 py-4 border border-gold text-gold font-montserrat tracking-[0.2em] text-sm uppercase hover:bg-gold hover:text-charcoal transition-colors"
        >
          Version 2
        </Link>
      </div>
    </main>
  );
};

export default Home;
