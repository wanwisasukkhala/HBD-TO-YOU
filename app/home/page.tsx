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
  {
    id: 2,
    url: "/image/03.jpeg",
    caption: "หนังเรื่องนี้ที่ดูด้วยกัน 🍿",
    rotate: 3,
  },
  {
    id: 3,
    url: "/image/02.jpeg",
    caption: "เกาะสีชังวันนั้น.. 🌊",
    rotate: -3,
  },
  { id: 4, url: "/image/01.jpeg", caption: "วาเลนไทน์ของเรา 🌹", rotate: 2 },
  { id: 5, url: "/image/06.jpeg", caption: "ดรีมเวิลด์ด้วยกัน ", rotate: -2 },
  {
    id: 6,
    url: "/image/07.jpeg",
    caption: "พาอ้วนล่องเรือวันครบรอบและคริสมาส 🌹",
    rotate: 3,
  },
  {
    id: 7,
    url: "/image/08.jpeg",
    caption: "ไปดูพระอาทิตย์ตกที่ผาสามเหลี่ยม ",
    rotate: -3,
  },
  { id: 8, url: "/image/09.jpeg", caption: "ทะเลหมอก เชียงใหม่ ", rotate: 2 },
  {
    id: 9,
    url: "/image/10.jpeg",
    caption: "เดินป่าผาสามเหลี่ยม เชียงใหม่ ",
    rotate: -2,
  },
].reverse(); // Reverse เพื่อให้ id 1 อยู่บนสุดถ้าต้องการ

const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const letters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay },
    },
  };
  const child = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
    },
  },
  hidden: {
    opacity: 0,
    y: 10,
  },
} as const; // <--- เติมตรงนี้

  return (
    <motion.div
      className="flex flex-wrap justify-center md:justify-start"
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
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
      setHasStarted(true);
    }
  };

  const removeCard = (id: number) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FDF7F2] flex items-center justify-center p-4 md:p-8 overflow-hidden font-playpen">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playpen+Sans:wght@100..800&display=swap");
        body {
          background-color: #fdf7f2;
          margin: 0;
          overflow: hidden;
        }
        .font-playpen {
          font-family: "Playpen Sans", cursive;
        }
      `}</style>

      <audio ref={audioRef} loop>
        <source src="mp3/polycat.mp3" type="audio/mpeg" />
      </audio>

      {/* --- Overlay เริ่มต้น --- */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="fixed inset-0 z-[100] bg-[#FDF7F2] flex flex-col items-center justify-center p-6"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer flex flex-col items-center"
              onClick={handleStart}
            >
              <div className="w-[240px] md:w-[300px] bg-white p-4 pb-12 shadow-2xl border border-zinc-100 rotate-[-2deg] mb-8">
                <img
                  src="/image/05.jpeg"
                  className="w-full aspect-square object-cover"
                  alt="cover"
                />
                <p className="mt-4 text-zinc-400 italic text-sm">
                  เดทก่อนเป็นแฟนกันนนอิอิ
                </p>
              </div>
              <button className="px-10 py-4 bg-pink-300 text-white rounded-full font-bold shadow-lg hover:bg-pink-400 transition-all">
                ดูความทรงจำและคำอวยพร
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Main Content Layout --- */}
      {hasStarted && (
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* ข้อความ (ซ้ายในจอใหญ่ / บนในจอมือถือ) */}
          <div className="w-full md:w-1/2 text-center md:text-left z-20">
            <h1 className="text-3xl md:text-6xl font-bold text-zinc-800 italic leading-tight">
              <TypingText text="Happy Birthday &" />
              <TypingText text="Our Anniversary" delay={1} />
            </h1>
            <div className="mt-4 text-xl md:text-3xl font-bold text-pink-400 italic">
              <TypingText text="2 Years & 8 Months Together 💖" delay={2} />
            </div>
          </div>

          {/* กองรูปภาพ (ขวาในจอใหญ่ / ล่างในจอมือถือ) */}
          {/* --- กองรูปโพลารอยด์ --- */}

          <div className="relative w-full max-w-[320px] md:max-w-[480px] aspect-[1/1.25] mt-10 md:mt-24 z-10 flex items-center justify-center">
            <AnimatePresence>
              {cards.length > 0
                ? cards.map((card, index) => (
                    <SwipeCard
                      key={card.id}
                      card={card}
                      onSwipe={() => removeCard(card.id)}
                      isTop={index === cards.length - 1}
                    />
                  ))
                : hasStarted && (
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

                          <p>
                            เค้าขอให้เธอมีสติ มีความสุข สุขภาพร่างกายแข็งแรง
                          </p>
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
        </div>
      )}

      {/* Music Toggle */}
      {hasStarted && (
        <button
          onClick={() => {
            if (isPlaying) audioRef.current?.pause();
            else audioRef.current?.play();
            setIsPlaying(!isPlaying);
          }}
          className="fixed bottom-6 right-6 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center z-[60] border border-pink-100"
        >
          {isPlaying ? "🎵" : "🔇"}
        </button>
      )}
    </div>
  );
}

function SwipeCard({
  card,
  onSwipe,
  isTop,
}: {
  card: any;
  onSwipe: () => void;
  isTop: boolean;
}) {
  const x = useMotionValue(0);
  const rotateValue = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  return (
    <motion.div
      style={{
        x,
        rotate: isTop ? rotateValue : card.rotate,
        opacity,
        zIndex: isTop ? 50 : 0,
        touchAction: "none",
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 100 || Math.abs(info.velocity.x) > 500) {
          onSwipe();
        }
      }}
      className="absolute inset-0 cursor-grab active:cursor-grabbing origin-bottom"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{
        x: x.get() > 0 ? -500 : 500,
        opacity: 0,
        rotate: x.get() > 0 ? 45 : -45,
        transition: { duration: 0.4 },
      }}
    >
      <div className="w-full h-full bg-white p-3 md:p-5 pb-12 md:pb-20 shadow-xl border border-zinc-100 flex flex-col">
        <div className="flex-1 overflow-hidden bg-zinc-50">
          <img
            src={card.url}
            alt="memory"
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>
        <div className="h-12 md:h-16 flex items-center justify-center text-center">
          <p className="text-zinc-600 font-medium text-sm md:text-xl italic">
            {card.caption}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
