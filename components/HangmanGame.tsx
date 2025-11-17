import React, { useState, useEffect, useCallback } from 'react';
import NeonButton from './Button';

const WORDS = ['برمجة', 'تقنية', 'علوم', 'رياضة', 'إلكترونيات', 'مستقبل', 'طموح', 'مهارة'];
const ALPHABET = 'أبتثجحخدذرزسشصضطظعغفقكلمنهوي'.split('');

const HangmanGame: React.FC = () => {
    const [wordToGuess, setWordToGuess] = useState('');
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [mistakes, setMistakes] = useState(0);

    const startNewGame = useCallback(() => {
        setWordToGuess(WORDS[Math.floor(Math.random() * WORDS.length)]);
        setGuessedLetters([]);
        setMistakes(0);
    }, []);

    useEffect(() => {
        startNewGame();
    }, [startNewGame]);

    const handleGuess = (letter: string) => {
        if (guessedLetters.includes(letter) || mistakes >= 6) return;

        setGuessedLetters([...guessedLetters, letter]);
        if (!wordToGuess.includes(letter)) {
            setMistakes(mistakes + 1);
        }
    };

    const isGameWon = wordToGuess && wordToGuess.split('').every(letter => guessedLetters.includes(letter));
    const isGameLost = mistakes >= 6;
    const isGameOver = isGameWon || isGameLost;

    const displayedWord = wordToGuess
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');

    return (
        <div className="text-center p-4">
            <h3 className="text-xl font-bold text-purple-300 mb-4">احزر الكلمة</h3>
            <p className="text-2xl font-bold tracking-[0.2em] mb-4 text-cyan-400" dir="ltr">{displayedWord}</p>
            <p className="mb-4 text-red-400">الأخطاء: {mistakes} / 6</p>

            {isGameOver ? (
                <div className="my-4">
                    <p className={`text-2xl font-bold mb-4 ${isGameWon ? 'text-green-400' : 'text-red-500'}`}>
                        {isGameWon ? 'أحسنت، لقد فزت!' : `للأسف، لقد خسرت. الكلمة كانت: ${wordToGuess}`}
                    </p>
                    <NeonButton onClick={startNewGame} glowColor="purple">لعبة جديدة</NeonButton>
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-2" dir="rtl">
                    {ALPHABET.map(letter => (
                        <button
                            key={letter}
                            onClick={() => handleGuess(letter)}
                            disabled={guessedLetters.includes(letter)}
                            className="w-10 h-10 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded"
                        >
                            {letter}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HangmanGame;
