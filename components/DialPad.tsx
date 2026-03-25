// components/DialPad.tsx
'use client';

interface DialPadProps {
  onNumberPress: (num: string) => void;
  onClear: () => void;
}

const DialPad: React.FC<DialPadProps> = ({ onNumberPress, onClear }) => {
  const keys = [
    { num: '1', letters: '' },
    { num: '2', letters: 'A B C' },
    { num: '3', letters: 'D E F' },
    { num: '4', letters: 'G H I' },
    { num: '5', letters: 'J K L' },
    { num: '6', letters: 'M N O' },
    { num: '7', letters: 'P Q R S' },
    { num: '8', letters: 'T U V' },
    { num: '9', letters: 'W X Y Z' },
  ];

  const btnStyle = "flex flex-col items-center justify-center w-20 h-20 rounded-full bg-white/80 backdrop-blur-md active:bg-gray-300 transition-colors duration-100 shadow-sm";

  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-4 justify-items-center w-full max-w-[280px] mx-auto">
      {keys.map((key) => (
        <button key={key.num} onClick={() => onNumberPress(key.num)} className={btnStyle}>
          <span className="text-3xl font-normal text-gray-900">{key.num}</span>
          <span className="text-[10px] font-bold text-gray-500 tracking-widest">{key.letters}</span>
        </button>
      ))}
      
      {/* เว้นที่ว่างคอลัมน์ซ้าย */}
      <div /> 

      {/* เลข 0 */}
      <button onClick={() => onNumberPress('0')} className={btnStyle}>
        <span className="text-3xl font-normal text-gray-900">0</span>
      </button>

      {/* ปุ่ม Delete */}
      <button onClick={onClear} className="flex items-center justify-center w-20 h-20 text-gray-600 active:text-gray-400 font-medium transition-colors">
        Delete
      </button>
    </div>
  );
};

export default DialPad;