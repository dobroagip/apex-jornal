import { motion } from 'motion/react';

const BRANDS = [
  "PORSCHE", "FERRARI", "LAMBORGHINI", "MCLAREN", "ASTON MARTIN", "BUGATTI", "PAGANI", "KOENIGSEGG"
];

export default function BrandMarquee() {
  return (
    <div className="py-8 md:py-12 bg-white text-racing-black overflow-hidden whitespace-nowrap border-y border-white/10">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ 
          repeat: Infinity, 
          duration: 30, 
          ease: "linear" 
        }}
        className="inline-block"
      >
        {[...BRANDS, ...BRANDS].map((brand, i) => (
          <span key={i} className="text-3xl md:text-6xl font-black italic tracking-tighter mx-8 md:mx-12 opacity-80">
            {brand}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
