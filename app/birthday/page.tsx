"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";

const CELEBRATION_ANIMATION_URL = "https://assets9.lottiefiles.com/packages/lf20_u4yrau.json";

export default function BirthdayPage() {
  const router = useRouter();
  const [isLit, setIsLit] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(CELEBRATION_ANIMATION_URL)
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  useEffect(() => {
    let audioStream: MediaStream | null = null;
    const initAudio = async () => {
      try {
        audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(audioStream);
        analyser.fftSize = 256;
        microphone.connect(analyser);
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const checkAudio = () => {
          if (!isLit || isProcessing) return;
          analyser.getByteFrequencyData(dataArray);
          let values = 0;
          for (let i = 0; i < bufferLength; i++) values += dataArray[i];
          const average = values / bufferLength;

          if (average > 60) {
            setIsProcessing(true);
            setIsLit(false);
            if (audioStream) audioStream.getTracks().forEach(t => t.stop());
            setTimeout(() => {
              router.push('/home');
            }, 3000);
          } else {
            requestAnimationFrame(checkAudio);
          }
        };
        checkAudio();
      } catch (err) {
        console.warn("Microphone access error:", err);
      }
    };
    if (isLit) initAudio();
    return () => { if (audioStream) audioStream.getTracks().forEach(t => t.stop()); };
  }, [isLit, router, isProcessing]);

  return (
    <div className="min-h-screen bg-[#fdfcfdd2] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* ตั้งค่า Font Family ผ่าน Inline Style เพื่อความแน่นอน */}
      <style jsx global>{`
        .font-playpen-thai {
          font-family: "Playpen Sans Thai", "Playpen Sans", cursive;
        }
      `}</style>

      {!isLit && (
        <div className="absolute inset-0 pointer-events-none opacity-30">
          {animationData && <Lottie animationData={animationData} loop={true} />}
        </div>
      )}

      <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-12 h-40 flex flex-col justify-center items-center">
          
          {/* ปรับขนาดฟอนต์: มือถือ text-3xl (เล็กกำลังดี), แท็บเล็ต text-4xl, คอม text-6xl */}
          <h1 className="font-playpen-thai text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-bold mb-4 text-pink-400 drop-shadow-sm transition-all duration-1000 leading-tight">
            {isLit ? "เป่าเทียนเลยที่รัก 🌬️" : "สุขสันต์วันเกิดน้าา ✨"}
          </h1>
          
          {/* ปรับขนาดคำอธิบายย่อย */}
          <p className="font-playpen-thai text-base sm:text-lg md:text-xl text-pink-300 font-medium opacity-80">
            {isLit ? "เป่าที่ไมโครโฟนได้เลยนะ" : "กำลังไปหาคำอวยพร..."}
          </p>
        </div>

        {/* ตัวเทียนปรับขนาดให้เล็กลงนิดหน่อยในมือถือเพื่อให้สมดุล */}
        <div className="w-56 h-56 sm:w-64 sm:h-64 bg-white/40 group relative rounded-[2rem] flex justify-center items-center overflow-hidden shadow-sm border border-orange-50 backdrop-blur-sm">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bottom-8 absolute">
            <div className={`w-20 h-20 sm:w-24 sm:h-24 absolute bg-white duration-1000 shadow-2xl ${isLit ? '[box-shadow:0px_-75px_55px_-30px_#ffedd5]' : '[box-shadow:none]'}`}>
              <div className="w-full h-full bg-white shadow-inner shadow-orange-50"></div>
              <div className="w-full h-full bg-white absolute -bottom-10 sm:-bottom-12 rounded-full [transform:_rotateX(80deg)]"></div>
              <div className="w-full h-full bg-orange-100 border-4 border-orange-50 absolute -top-10 sm:-top-12 rounded-full [transform:_rotateX(80deg)]"></div>
            </div>
            
            {isLit ? (
              <svg 
                className="animate-pulse absolute -top-10 sm:-top-12 left-2 sm:left-4 fill-orange-300 w-12 h-12 sm:w-16 sm:h-16 drop-shadow-[0_0_12px_rgba(251,146,60,0.7)]" 
                viewBox="0 0 100 100"
              >
                <path d="M59.5,20.5a3.9,3.9,0,0,0-2.5-2,4.3,4.3,0,0,0-3.3.5,11.9,11.9,0,0,0-3.2,3.5,26,26,0,0,0-2.3,4.4,76.2,76.2,0,0,0-3.3,10.8,120.4,120.4,0,0,0-2.4,14.2,11.4,11.4,0,0,1-3.8-4.2c-1.3-2.7-1.5-6.1-1.5-10.5a4,4,0,0,0-2.5-3.7,3.8,3.8,0,0,0-4.3.9,27.7,27.7,0,1,0,39.2,0,62.4,62.4,0,0,1-5.3-5.8A42.9,42.9,0,0,1,59.5,20.5ZM58.4,70.3a11.9,11.9,0,0,1-20.3-8.4s3.5,2,9.9,2c0-4,2-15.9,5-17.9a21.7,21.7,0,0,0,5.4,7.5,11.8,11.8,0,0,1,3.5,8.4A12,12,0,0,1,58.4,70.3Z" />
              </svg>
            ) : (
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 animate-ping opacity-20 text-3xl sm:text-4xl">🌬️</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}