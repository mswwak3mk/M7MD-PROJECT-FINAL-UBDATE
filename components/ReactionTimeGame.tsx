import React, { useState, useRef, useCallback } from 'react';
import NeonButton from './Button';

type GameState = 'waiting' | 'ready' | 'clicked' | 'too-soon';

const ReactionTimeGame: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>('waiting');
    const [reactionTime, setReactionTime] = useState<number | null>(null);
    const timerRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);

    const startGame = useCallback(() => {
        setGameState('ready');
        setReactionTime(null);
        timerRef.current = window.setTimeout(() => {
            setGameState('waiting');
            startTimeRef.current = Date.now();
        }, Math.random() * 3000 + 1000);
    }, []);
    
    const handleClick = () => {
        if (gameState === 'ready') {
            window.clearTimeout(timerRef.current!);
            setGameState('too-soon');
        } else if (gameState === 'waiting') {
            const endTime = Date.now();
            setReactionTime(endTime - startTimeRef.current);
            setGameState('clicked');
        }
    };

    const getDisplay = () => {
        switch (gameState) {
            case 'ready':
                return { text: 'انتظر اللون الأخضر...', color: 'bg-red-600', textColor: 'text-white' };
            case 'waiting':
                return { text: 'اضغط الآن!', color: 'bg-green-500', textColor: 'text-white' };
            case 'too-soon':
                return { text: 'لقد ضغطت مبكراً جداً!', color: 'bg-yellow-500', textColor: 'text-black' };
            case 'clicked':
                return { text: `سرعة رد فعلك: ${reactionTime} مللي ثانية`, color: 'bg-cyan-500', textColor: 'text-white' };
            default:
                return { text: 'اختبر سرعة رد فعلك', color: 'bg-purple-600', textColor: 'text-white' };
        }
    };

    const display = getDisplay();

    return (
        <div className="text-center p-4 flex flex-col items-center justify-center min-h-[250px]">
            <h3 className="text-xl font-bold text-purple-300 mb-4">اختبار سرعة رد الفعل</h3>
            
            <div
                onClick={handleClick}
                className={`w-full h-40 rounded-lg flex items-center justify-center cursor-pointer select-none transition-colors ${display.color}`}
            >
                <p className={`text-2xl font-bold ${display.textColor}`}>{display.text}</p>
            </div>
            
            {(gameState === 'waiting' || gameState === 'too-soon' || gameState === 'clicked') && (
                 <div className="mt-6">
                    <NeonButton onClick={startGame} glowColor="purple">حاول مجدداً</NeonButton>
                </div>
            )}
        </div>
    );
};

export default ReactionTimeGame;
