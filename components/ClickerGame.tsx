import React, { useState, useEffect, useCallback } from 'react';
import NeonButton from './Button';

const GAME_DURATION = 10;

const ClickerGame: React.FC = () => {
    const [clicks, setClicks] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: number | null = null;
        if (isActive && timeLeft > 0) {
            interval = window.setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, timeLeft]);
    
    const startGame = useCallback(() => {
        setClicks(0);
        setTimeLeft(GAME_DURATION);
        setIsActive(true);
    }, []);

    const handleClick = () => {
        if (isActive) {
            setClicks(prev => prev + 1);
        }
    };
    
    if (!isActive && timeLeft === 0) {
        return (
            <div className="text-center p-4 flex flex-col items-center justify-center min-h-[250px]">
                 <h3 className="text-xl font-bold text-purple-300 mb-4">انتهى الوقت!</h3>
                 <p className="text-3xl font-bold text-green-400 mb-6">
                    {clicks} <span className="text-lg text-gray-300">نقرة</span>
                 </p>
                 <NeonButton onClick={startGame} glowColor="purple">العب مجدداً</NeonButton>
            </div>
        )
    }

    return (
        <div className="text-center p-4 flex flex-col items-center justify-center min-h-[250px]">
            <h3 className="text-xl font-bold text-purple-300 mb-4">لعبة النقر السريع</h3>
            
            <div className="w-full flex justify-around items-center mb-6">
                <div className="text-center">
                    <p className="text-gray-400">الوقت المتبقي</p>
                    <p className="text-3xl font-bold text-cyan-400">{timeLeft}</p>
                </div>
                 <div className="text-center">
                    <p className="text-gray-400">النقرات</p>
                    <p className="text-3xl font-bold text-green-400">{clicks}</p>
                </div>
            </div>

            {isActive ? (
                <button 
                    onClick={handleClick}
                    className="w-40 h-40 bg-purple-600 rounded-full text-white font-bold text-2xl flex items-center justify-center transition-transform transform active:scale-95 shadow-lg shadow-purple-500/50"
                >
                    انقر!
                </button>
            ) : (
                <NeonButton onClick={startGame} glowColor="green">ابدأ اللعبة</NeonButton>
            )}
        </div>
    );
};

export default ClickerGame;
