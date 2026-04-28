import React, { useState, useEffect, useCallback } from 'react';
import NeonButton from './Button';

const WORD_CATEGORIES = {
    easy: ['تفاح', 'بيت', 'شمس', 'قمر', 'كتاب', 'موز', 'بحر', 'خليل'],
    medium: ['برمجة', 'تقنية', 'علوم', 'رياضة', 'إلكترونيات', 'مستقبل', 'طموح', 'مهارة'],
    hard: ['خوارزمية', 'اصطناعي', 'تشفير', 'نظام', 'افتراضي', 'بنية', 'منطق', 'تطوير']
};
const MISTAKE_LIMITS = { easy: 8, medium: 6, hard: 4 };
const ALPHABET = 'أبتثجحخدذرزسشصضطظعغفقكلمنهوي'.split('');

const HangmanGame: React.FC = () => {
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
    const [wordToGuess, setWordToGuess] = useState('');
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [mistakes, setMistakes] = useState(0);

    const startNewGame = useCallback(() => {
        if (!difficulty) return;
        const words = WORD_CATEGORIES[difficulty];
        setWordToGuess(words[Math.floor(Math.random() * words.length)]);
        setGuessedLetters([]);
        setMistakes(0);
    }, [difficulty]);

    useEffect(() => {
        if (difficulty) {
            startNewGame();
        }
    }, [difficulty, startNewGame]);

    const handleGuess = (letter: string) => {
        if (!difficulty || guessedLetters.includes(letter) || mistakes >= MISTAKE_LIMITS[difficulty]) return;

        setGuessedLetters([...guessedLetters, letter]);
        if (!wordToGuess.includes(letter)) {
            setMistakes(mistakes + 1);
        }
    };

    const isGameWon = wordToGuess && wordToGuess.split('').every(letter => guessedLetters.includes(letter));
    const isGameLost = difficulty ? mistakes >= MISTAKE_LIMITS[difficulty] : false;
    const isGameOver = isGameWon || isGameLost;

    const displayedWord = wordToGuess
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');

    return (
        <div className="text-center p-4">
            <h3 className="text-xl font-bold text-purple-300 mb-4">احزر الكلمة</h3>
            
            {!difficulty ? (
                <div className="bg-black/40 p-6 rounded-lg border border-purple-500/30">
                    <h4 className="text-lg font-bold text-cyan-400 mb-4">اختر مستوى الصعوبة</h4>
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        <button 
                            onClick={() => setDifficulty('easy')}
                            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md transition-all"
                        >
                            سهل (8 أخطاء)
                        </button>
                        <button 
                            onClick={() => setDifficulty('medium')}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-md transition-all"
                        >
                            متوسط (6 أخطاء)
                        </button>
                        <button 
                            onClick={() => setDifficulty('hard')}
                            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition-all"
                        >
                            صعب (4 أخطاء)
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <p className="text-2xl font-bold tracking-[0.2em] mb-4 text-cyan-400" dir="ltr">{displayedWord}</p>
                    <p className="mb-4 text-red-400">الأخطاء: {mistakes} / {MISTAKE_LIMITS[difficulty]}</p>

                    {isGameOver ? (
                        <div className="my-4">
                            <p className={`text-2xl font-bold mb-4 ${isGameWon ? 'text-green-400' : 'text-red-500'}`}>
                                {isGameWon ? 'أحسنت، لقد فزت!' : `للأسف، لقد خسرت. الكلمة كانت: ${wordToGuess}`}
                            </p>
                            <NeonButton onClick={() => setDifficulty(null)} glowColor="purple">تغيير الصعوبة</NeonButton>
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
                </>
            )}
        </div>
    );
};

export default HangmanGame;
