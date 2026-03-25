"use client";
import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";

// --- ข้อมูลรูปภาพ ---
const MEMORIES = [
  { id: 1, url: "/image/04.jpeg", caption: "น่ารักที่สุดดด 🥰", rotate: -2 },
  { id: 2, url: "/image/03.jpeg", caption: "หนังเรื่องนี้ที่ดูด้วยกัน 🍿", rotate: 3 },
  { id: 3, url: "/image/02.jpeg", caption: "เกาะสีชังวันนั้น.. 🌊", rotate: -3 },
  { id: 4, url: "/image/01.jpeg", caption: "วาเลนไทน์แรกของเรา 🌹", rotate: 2 },
  { id: 5, url: "/image/06.jpeg", caption: "ดรีมเวิลด์ด้วยกัน ", rotate: -2 },
  { id: 6, url: "/image/07.jpeg", caption: "พาอ้วนร่องเรือวันครบรอนและคริสมาส 🌹", rotate: 3 },
  { id: 7, url: "/image/08.jpeg", caption: "ไปดูพระอาทิตย์ตกที่ผาสามเหลี่ยม ", rotate: -3 },
  { id: 8, url: "/image/09.jpeg", caption: "ทะเลหมอก เชียงใหม่ ", rotate: 2 },
  { id: 9, url: "/image/10.jpeg", caption: "เดินป่าผาสามเหลี่ยม เชียงใหม่ ", rotate: -2 },
];

// --- คอมโพเนนต์ TypingText สำหรับเอฟเฟกต์พิมพ์ดีด ---
const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const letters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay },
    },
  };
  const child = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const, // <-- เติม "as const" ตรงนี้เพื่อแก้ Error
      damping: 12,
      stiffness: 200,
    },
  },
  hidden: {
    opacity: 0,
    y: 10,
  },
};

  return (
    <motion.div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index} className="inline-block">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function BirthdaySwipePage() {
  const [cards, setCards] = useState(MEMORIES);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch((err) => {
          console.error("Playback failed:", err);
          setHasStarted(true);
        });
    }
  };

  const removeCard = (id: number) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <div
      className="min-h-screen bg-[#FDF7F2] overflow-hidden flex flex-col items-center justify-start md:justify-center p-4 relative"
      style={{ fontFamily: '"Playpen Sans Thai", cursive' }}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playpen+Sans:wght@100..800&display=swap");
        body { background-color: #fdf7f2; }
        .font-playpen { font-family: "Playpen Sans Thai", "Playpen Sans", cursive; }
      `}</style>

      <audio ref={audioRef} loop preload="auto">
        <source src="mp3/polycat.mp3" type="audio/mpeg" />
      </audio>

      {/* --- หน้า Overlay เริ่มต้น --- */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.6 } }}
            className="fixed inset-0 z-[100] bg-[#FDF7F2] flex flex-col items-center justify-center p-6 text-center font-playpen"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
              className="space-y-10 flex flex-col items-center w-full max-w-2xl"
            >
              <motion.div whileHover={{ scale: 1.05, rotate: 3 }} whileTap={{ scale: 0.95 }} className="cursor-pointer" onClick={handleStart}>
                <div className="w-[220px] h-[270px] md:w-[320px] md:h-[400px] bg-white p-[12px] md:p-[20px] pb-[45px] md:pb-[70px] shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-zinc-100 flex flex-col items-center relative rotate-[-3deg]">
                  <div className="w-full aspect-square bg-zinc-100 overflow-hidden relative rounded-sm">
                    <img src="/image/05.jpeg" alt="cover" className="w-full h-full object-cover grayscale-[10%] sepia-[5%]" />
                  </div>
                  <div className="absolute bottom-0 h-[45px] md:h-[70px] flex items-center justify-center w-full px-4 text-zinc-500 font-medium text-xs md:text-lg italic opacity-70">
                    รูปคู่ ตอนจีบกันใหม่ๆ
                  </div>
                </div>
              </motion.div>
              <button onClick={handleStart} className="px-14 py-4 md:px-20 md:py-6 bg-pink-200 text-white rounded-2xl font-bold text-lg md:text-2xl shadow-2xl border-b-8 border-pink-400">
                ดูความทรงจำและคำอวยพร
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- ข้อความพิมพ์ดีด (Header) --- */}
      {hasStarted && (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }}
    className="relative mt-8 md:mt-0 md:absolute md:top-12 text-center z-20 pointer-events-none px-6 font-playpen w-full"
  >
    <div className="flex flex-col items-center max-w-[90vw] mx-auto gap-1 md:gap-2">
      
      {/* บรรทัดที่ 1: Happy Birthday & */}
      <h1 className="text-2xl md:text-5xl font-bold text-zinc-800 italic drop-shadow-sm leading-tight text-center">
        <TypingText text="Happy Birthday &" />
      </h1>
      
      {/* บรรทัดที่ 2: Our Anniversary (ใส่ delay ต่อจากบรรทัดแรก) */}
      <h1 className="text-2xl md:text-5xl font-bold text-zinc-800 italic drop-shadow-sm leading-tight text-center">
        <TypingText text="Our Anniversary" delay={1} />
      </h1>
      
      {/* บรรทัดที่ 3: ระยะเวลา (ใส่ delay เพิ่มขึ้นอีก) */}
      <h1 className="text-xl md:text-4xl font-bold text-pink-400 italic drop-shadow-sm mt-3 text-center">
        <TypingText text="2 Years & 8 Months Together 💖" delay={2.5} />
      </h1>
      
    </div>
  </motion.div>
)}
{/* --- กองรูปโพลารอยด์ --- */}
<div className="relative w-full max-w-[320px] md:max-w-[480px] aspect-[1/1.25] mt-10 md:mt-24 z-10 flex items-center justify-center">
  <AnimatePresence>
    {cards.length > 0 ? (
      cards.map((card, index) => (
        <SwipeCard 
          key={card.id} 
          card={card} 
          onSwipe={() => removeCard(card.id)} 
          isTop={index === cards.length - 1} 
        />
      ))
    ) : hasStarted && (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="text-center flex flex-col items-center justify-center w-full px-6 py-10font-playpen"
      >
        {/* หัวใจดุ๊กดิ๊กด้านบน */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-6xl md:text-7xl mb-6"
        >
          💝
        </motion.div>

        {/* ส่วนข้อความอวยพร */}
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-2xl md:text-4xl font-bold text-zinc-800 italic">
            รักเธอนะ ไอ้อ้วน!
          </h2>
          
          <div className="text-zinc-600 text-base md:text-xl leading-relaxed space-y-1">
            <p>อีกมากมายตลอดเวลาที่เราอยู่ด้วยกัน</p>
            <p>และเค้าจะพาเธอไปเที่ยวอีกมากมาย</p>
            <p>เค้าขอให้เธอมีสติ มีความสุข สุขภาพร่างกายแข็งแรง</p>
          </div>

          <p className="text-pink-400 font-bold text-xl md:text-3xl italic animate-pulse">
            เค้ารักอ้วนนะ ❤️
          </p>
        </div>

        {/* ปุ่มดูอีกรอบ ปรับให้เล็กลงไม่กวนสายตา */}
        <button 
          onClick={() => setCards(MEMORIES)} 
          className="mt-10 px-6 py-2 text-zinc-400 hover:text-pink-400 underline text-sm md:text-base transition-colors"
        >
          ดูอีกรอบนะ 
        </button>
      </motion.div>
    )}
  </AnimatePresence>
</div>

      {/* --- ปุ่มเพลง --- */}
      {hasStarted && (
        <button onClick={() => { if (isPlaying) audioRef.current?.pause(); else audioRef.current?.play(); setIsPlaying(!isPlaying); }}
          className="fixed bottom-10 p-4 bg-white shadow-xl rounded-full text-xl border border-zinc-100 z-50 transition-transform active:scale-90"
        >
          {isPlaying ? "🎵" : "🔇"}
        </button>
      )}
    </div>
  );
}

function SwipeCard({ card, onSwipe, isTop }: { card: any; onSwipe: () => void; isTop: boolean; }) {
  const x = useMotionValue(0);
  const rotateValue = useTransform(x, [-150, 150], [-15, 15]);
  const opacity = useTransform(x, [-150, -100, 0, 100, 150], [0, 1, 1, 1, 0]);

  return (
    <motion.div
      style={{ x, rotate: isTop ? rotateValue : card.rotate, opacity, zIndex: isTop ? 10 : 0 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 100) onSwipe(); }}
      className="absolute inset-0 cursor-grab active:cursor-grabbing font-playpen"
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ x: x.get() < 0 ? -400 : 400, opacity: 0, rotate: x.get() < 0 ? -30 : 30, transition: { duration: 0.4 } }}
    >
      <div className="w-full h-full bg-white p-[15px] pb-[60px] md:pb-[80px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-zinc-100 flex flex-col items-center relative">
        <div className="w-full aspect-square bg-zinc-100 overflow-hidden relative">
          <img src={card.url} alt="memory" className="w-full h-full object-cover grayscale-[10%] sepia-[5%]" />
        </div>
        <div className="absolute bottom-0 h-[65px] md:h-[80px] flex items-center justify-center w-full px-4 text-center">
          <p className="text-zinc-600 font-medium text-lg md:text-2xl italic leading-tight opacity-90">{card.caption}</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none" />
      </div>
    </motion.div>
  );
}