import React, { useState } from 'react';
import NeonButton from './Button';
import { HandRockIcon, HandPaperIcon, HandScissorsIcon } from './icons';

type Choice = 'rock' | 'paper' | 'scissors';
const CHOICES: Choice[] = ['rock', 'paper', 'scissors'];

const ICONS: { [key in Choice]: React.ReactNode } = {
    rock: <HandRockIcon className="w-12 h-12" />,
    paper: <HandPaperIcon className="w-12 h-12" />,
    scissors: <HandScissorsIcon className="w-12 h-12" />,
};
const ARABIC: { [key in Choice]: string } = {
    rock: 'حجر',
    paper: 'ورقة',
    scissors: 'مقص',
}

const RockPaperScissorsGame: React.FC = () => {
    const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
    const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
    const [result, setResult] = useState<string | null>(null);

    const handlePlay = (choice: Choice) => {
        const computerChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
        setPlayerChoice(choice);
        setComputerChoice(computerChoice);

        if (choice === computerChoice) {
            setResult('تعادل!');
        } else if (
            (choice === 'rock' && computerChoice === 'scissors') ||
            (choice === 'paper' && computerChoice === 'rock') ||
            (choice === 'scissors' && computerChoice === 'paper')
        ) {
            setResult('أنت الفائز!');
        } else {
            setResult('الحاسوب هو الفائز!');
        }
    };
    
    const resetGame = () => {
        setPlayerChoice(null);
        setComputerChoice(null);
        setResult(null);
    }

    return (
        <div className="text-center p-4">
            <h3 className="text-xl font-bold text-purple-300 mb-6">حجر - ورقة - مقص</h3>

            {result ? (
                 <div className="flex flex-col items-center">
                    <div className="flex justify-around w-full mb-4">
                        <div className="text-center">
                            <p className="font-bold text-cyan-400 mb-2">أنت</p>
                            <div className="text-cyan-400">{playerChoice && ICONS[playerChoice]}</div>
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-green-400 mb-2">الحاسوب</p>
                             <div className="text-green-400">{computerChoice && ICONS[computerChoice]}</div>
                        </div>
                    </div>
                     <p className={`text-2xl font-bold mb-6 ${result.includes('الفائز') ? (result.includes('أنت') ? 'text-green-400' : 'text-red-500') : 'text-yellow-400'}`}>{result}</p>
                     <NeonButton onClick={resetGame} glowColor="purple">العب مجدداً</NeonButton>
                 </div>
            ) : (
                <>
                    <p className="mb-6 text-gray-300">اختر حركتك:</p>
                    <div className="flex justify-center gap-4">
                        <button onClick={() => handlePlay('rock')} className="p-4 bg-gray-700 rounded-full hover:bg-purple-600 transition-colors text-cyan-400">{ICONS.rock}</button>
                        <button onClick={() => handlePlay('paper')} className="p-4 bg-gray-700 rounded-full hover:bg-purple-600 transition-colors text-cyan-400">{ICONS.paper}</button>
                        <button onClick={() => handlePlay('scissors')} className="p-4 bg-gray-700 rounded-full hover:bg-purple-600 transition-colors text-cyan-400">{ICONS.scissors}</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default RockPaperScissorsGame;
