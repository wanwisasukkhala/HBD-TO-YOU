"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react"; // แนะนำให้ลง lucide-react (npm install lucide-react) หรือใช้ SVG แทนได้

export default function LoginPage() {
  const [passcode, setPasscode] = useState<string[]>([]);
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  
  // ปรับเป็น 4 หลักตามรหัส 2503
  const maxLength = 4;
  const CORRECT_PASSCODE = "2503";

  const handleKeyPress = (num: string) => {
    if (passcode.length < maxLength) {
      setPasscode((prev) => [...prev, num]);
      setIsError(false);
    }
  };

  const handleDelete = () => {
    setPasscode((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    if (passcode.length === maxLength) {
      if (passcode.join("") === CORRECT_PASSCODE) {
        router.push("/birthday");
      } else {
        setIsError(true);
        setTimeout(() => {
          setPasscode([]);
          setIsError(false);
        }, 600);
      }
    }
  }, [passcode, router]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#fdfcfdd2] p-8 font-sans">
      <div className="w-full max-w-sm flex flex-col items-center">
        
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="mb-6 inline-flex p-3 bg-white rounded-full shadow-sm">
             <Heart className="text-pink-400 fill-pink-400 w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-2xl font-medium text-zinc-700">Unlock My Heart</h1>
          <p className="text-zinc-400 mt-2 text-sm italic">Enter our special date ♡</p>
        </div>

        {/* Heart Display (Indicators) */}
        <div className={`flex gap-6 mb-16 ${isError ? "animate-shake" : ""}`}>
          {[...Array(maxLength)].map((_, i) => (
            <div key={i} className="transition-all duration-300">
              {passcode[i] ? (
                <Heart className="w-6 h-6 text-pink-500 fill-pink-500 scale-125 transition-transform" />
              ) : (
                <div className={`w-3 h-3 rounded-full border-2 ${isError ? "border-red-300 bg-red-50" : "border-zinc-200 bg-zinc-100"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-x-8 gap-y-6 w-full max-w-[280px]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleKeyPress(num.toString())}
              className="w-16 h-16 text-xl font-light rounded-full bg-white text-zinc-600 shadow-[0_4px_10px_rgba(0,0,0,0.03)] hover:bg-pink-50 hover:text-pink-500 active:scale-90 transition-all border border-zinc-50"
            >
              {num}
            </button>
          ))}
          <div />
          <button
            type="button"
            onClick={() => handleKeyPress("0")}
            className="w-16 h-16 text-xl font-light rounded-full bg-white text-zinc-600 shadow-[0_4px_10px_rgba(0,0,0,0.03)] hover:bg-pink-50 hover:text-pink-500 active:scale-90 transition-all border border-zinc-50"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-16 h-16 flex items-center justify-center text-zinc-300 hover:text-red-400 transition-colors text-sm font-medium"
          >
            Delete
          </button>
        </div>

        <p className="mt-16 text-[10px] uppercase tracking-[0.2em] text-zinc-300">
          Made with love for you
        </p>
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
}