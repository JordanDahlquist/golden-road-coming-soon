import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const Index = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal-deep via-background to-charcoal opacity-80" />
      
      {/* Animated gold accent lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.div 
          className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
        />
        <motion.div 
          className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Logo */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img 
            src={logo} 
            alt="Golden Road Strategies" 
            className="w-72 sm:w-96 md:w-[480px] h-auto"
          />
        </motion.div>

        {/* Divider line */}
        <motion.div 
          className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-10"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 96, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        />

        {/* Coming Soon text */}
        <motion.p 
          className="font-sans text-sm sm:text-base tracking-[0.3em] uppercase text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Coming Soon
        </motion.p>
      </div>

      {/* Bottom accent */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
      />
    </div>
  );
};

export default Index;
