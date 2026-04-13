import { motion } from 'motion/react';
import { Instagram, Twitter, Youtube, Mail } from 'lucide-react';

interface FooterProps {
  onLegalClick?: () => void;
  onAdminClick?: () => void;
}

export default function Footer({ onLegalClick, onAdminClick }: FooterProps) {
  return (
    <footer className="bg-racing-black py-12 md:py-24 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-24">
          <div className="col-span-1 sm:col-span-2">
            <h2 className="text-3xl md:text-4xl font-bold uppercase italic tracking-[0.2em] mb-6 md:mb-8">
              APEX<span className="text-racing-red">.</span>
            </h2>
            <p className="text-gray-400 max-w-md text-base md:text-lg leading-relaxed mb-8 md:mb-10">
              The definitive source for automotive culture, high-performance engineering, and the pursuit of speed.
            </p>
            <div className="flex gap-4 md:gap-6">
              <a href="#" className="p-3 bg-white/5 hover:bg-racing-red transition-colors rounded-full">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-white/5 hover:bg-racing-red transition-colors rounded-full">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-white/5 hover:bg-racing-red transition-colors rounded-full">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xs md:text-sm font-bold uppercase tracking-widest mb-6 md:mb-8 text-racing-red">Sections</h3>
            <ul className="space-y-3 md:space-y-4 text-gray-400 font-medium text-sm md:text-base">
              <li><a href="#" className="hover:text-white transition-colors">Magazine</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Racing News</a></li>
              <li><button onClick={onAdminClick} className="hover:text-white transition-colors">Submit Article</button></li>
              <li><a href="#" className="hover:text-white transition-colors">Interviews</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xs md:text-sm font-bold uppercase tracking-widest mb-6 md:mb-8 text-racing-red">Newsletter</h3>
            <p className="text-gray-400 text-xs md:text-sm mb-6">Get the latest stories delivered to your inbox.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-racing-red transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-racing-red hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 md:pt-12 border-t border-white/5 gap-6 text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-500 font-bold text-center md:text-left">
          <p>© 2026 APEX JOURNAL. ALL RIGHTS RESERVED.</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <button onClick={onLegalClick} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={onLegalClick} className="hover:text-white transition-colors">Impressum</button>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
