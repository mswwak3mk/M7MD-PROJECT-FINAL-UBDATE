import React, { useState, useCallback } from 'react';
import { quizQuestions } from '../constants';
import NeonButton from './Button';

interface QuizGameProps {
    onQuizComplete: () => void;
}

const QuizGame: React.FC<QuizGameProps> = ({ onQuizComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [quizFinished, setQuizFinished] = useState(false);

    const handleAnswerClick = (answer: string) => {
        if (selectedAnswer !== null) return;

        setSelectedAnswer(answer);
        const correct = answer === quizQuestions[currentQuestionIndex].correctAnswer;
        setIsCorrect(correct);
        if (correct) {
            setScore(prev => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setIsCorrect(null);
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setQuizFinished(true);
            onQuizComplete();
        }
    };

    const handleRestart = useCallback(() => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setQuizFinished(false);
    }, []);
    
    const getButtonClass = (option: string) => {
        if (selectedAnswer === null) {
            return 'bg-gray-700 hover:bg-gray-600';
        }
        if (option === quizQuestions[currentQuestionIndex].correctAnswer) {
            return 'bg-green-500 shadow-green-500/50';
        }
        if (option === selectedAnswer && !isCorrect) {
            return 'bg-red-500 shadow-red-500/50';
        }
        return 'bg-gray-800 cursor-not-allowed';
    };

    if (quizFinished) {
        return (
            <div className="text-center p-4">
                <h3 className="text-2xl font-bold text-cyan-300 mb-4">اكتمل الاختبار!</h3>
                <p className="text-xl mb-6">نتيجتك النهائية هي: <span className="font-bold text-green-400">{score}</span> من <span className="font-bold text-purple-400">{quizQuestions.length}</span></p>
                <NeonButton onClick={handleRestart} glowColor="purple">
                    إعادة الاختبار
                </NeonButton>
            </div>
        );
    }
    
    const currentQuestion = quizQuestions[currentQuestionIndex];

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-cyan-300">السؤال {currentQuestionIndex + 1}/{quizQuestions.length}</h3>
                <p className="font-bold text-lg text-green-400">النتيجة: {score}</p>
            </div>
            
            <p className="text-lg text-center font-semibold mb-8 min-h-[56px] flex items-center justify-center">{currentQuestion.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {currentQuestion.options.map(option => (
                    <button
                        key={option}
                        onClick={() => handleAnswerClick(option)}
                        disabled={selectedAnswer !== null}
                        className={`w-full text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg ${getButtonClass(option)}`}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {selectedAnswer && (
                 <div className="text-center">
                    <NeonButton onClick={handleNextQuestion} glowColor="blue">
                        {currentQuestionIndex < quizQuestions.length - 1 ? 'السؤال التالي' : 'إنهاء الاختبار'}
                    </NeonButton>
                </div>
            )}
        </div>
    );
};

export default QuizGame;