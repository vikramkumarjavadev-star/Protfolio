
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { Course } from '../types';
import { ArrowUpRight, Clock, Star } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  return (
    // Fixed: Cast framer-motion props to any to avoid type errors
    <motion.div
      className="group relative h-[450px] md:h-[550px] w-full overflow-hidden border-b md:border-r border-white/10 bg-black cursor-pointer"
      initial={"rest" as any}
      whileHover={"hover" as any}
      whileTap={"hover" as any}
      animate={"rest" as any}
      data-hover="true"
      onClick={onClick}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Fixed: Cast variants to any to avoid type errors */}
        <motion.img 
          src={course.image} 
          alt={course.title} 
          className="h-full w-full object-cover grayscale will-change-transform"
          variants={{
            rest: { scale: 1, opacity: 0.5, filter: 'grayscale(100%)' },
            hover: { scale: 1.05, opacity: 0.8, filter: 'grayscale(0%)' }
          } as any}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-[#31326f]/30 transition-colors duration-500" />
      </div>

      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
           <div className="flex flex-col gap-2">
             <span className="text-[10px] md:text-xs font-mono border border-white/30 px-3 py-1 rounded-full backdrop-blur-md w-fit bg-black/20">
               {course.category}
             </span>
             <div className="flex items-center gap-2 text-white/70 text-xs">
                <Clock className="w-3 h-3" />
                <span>{course.duration}</span>
             </div>
           </div>
           {/* Fixed: Cast variants to any to avoid type errors */}
           <motion.div
             variants={{
               rest: { opacity: 0, x: 20, y: -20 },
               hover: { opacity: 1, x: 0, y: 0 }
             } as any}
             className="bg-white text-black rounded-full p-2"
           >
             <ArrowUpRight className="w-6 h-6" />
           </motion.div>
        </div>

        <div>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${i < Math.floor(course.rating) ? 'text-[#a8fbd3] fill-[#a8fbd3]' : 'text-white/20'}`} 
              />
            ))}
          </div>
          <div className="overflow-hidden">
            {/* Fixed: Cast variants to any to avoid type errors */}
            <motion.h3 
              className="font-heading text-2xl md:text-3xl font-bold uppercase text-white leading-tight"
              variants={{
                rest: { y: 0 },
                hover: { y: -5 }
              } as any}
            >
              {course.title}
            </motion.h3>
          </div>
          {/* Fixed: Cast variants to any to avoid type errors */}
          <motion.p 
            className="text-xs font-medium uppercase tracking-widest text-[#4fb7b3] mt-2"
            variants={{
              rest: { opacity: 0, y: 10 },
              hover: { opacity: 1, y: 0 }
            } as any}
          >
            Led by {course.instructor}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
