import { motion } from 'motion/react';
import { Article } from '../types';
import { ArrowUpRight } from 'lucide-react';
import React from 'react';

interface ArticleCardProps {
  article: Article;
  index: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, index }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-4/5 overflow-hidden mb-4 md:mb-6">
        <motion.img 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="px-2 py-1 bg-racing-black/80 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest border border-white/10">
            {article.category}
          </span>
        </div>
      </div>
      
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl md:text-2xl font-bold uppercase italic leading-[1.1] mb-2 group-hover:text-racing-red transition-colors line-clamp-2 wrap-break-word [hyphens:auto]">
            {article.title}
          </h3>
          <p className="text-xs md:text-sm text-gray-400 line-clamp-2 mb-4 font-medium italic">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
            <span className="truncate">{article.author}</span>
            <span className="w-1 h-1 bg-racing-red rounded-full shrink-0" />
            <span className="whitespace-nowrap">{article.date}</span>
          </div>
        </div>
        <div className="p-3 border border-white/10 rounded-full group-hover:bg-racing-red group-hover:border-racing-red transition-all duration-500 shrink-0">
          <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-45 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
