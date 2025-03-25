'use client'
import { motion } from "framer-motion";
import Image from "next/image";

export type IAboutUsItem = { 
  imgUrl?: string, 
  name: string, 
  comment: string, 
  profession: string, 
  school: string 
};

export default function AboutUsItem({ 
  imgUrl = '/benson-anderson.jpeg', 
  name, 
  comment, 
  profession, 
  school 
}: IAboutUsItem) {
  return (
    <motion.div 
      className="md:w-1/3 flex flex-col gap-1 items-center text-center p-8 md:py-2 md:px-6 md:not-last:border-r"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
    >
      <Image 
        className="object-cover w-35 h-35 md:w-40 md:h-40 rounded-full border-8 border-[#001A50]" 
        src={imgUrl} 
        alt={name + profession + school} 
        width={30} 
        height={30} 
      />
      <div>
        <h2 className="text-[#001A50] font-bold text-xl">{name}</h2>
        <p className="text-xs text-[#BDBDBD]">{profession}</p>
        <p className="text-xs text-[#BDBDBD]">@{school}</p>
      </div>
      <p className="text-xs md:text-sm">{comment}</p>
    </motion.div>
  );
}
