import React, { Suspense, lazy } from 'react';
import Card from './Card';
import { GamepadIcon, ChevronLeftIcon } from './icons';

// Lazy loading game components for better performance
const SnakeGame = lazy(() => import('./SnakeGame'));
const HangmanGame = lazy(() => import('./HangmanGame'));
const TicTacToeGame = lazy(() => import('./TicTacToeGame'));
const RockPaperScissorsGame = lazy(() => import('./RockPaperScissorsGame'));
const ReactionTimeGame = lazy(() => import('./ReactionTimeGame'));
const ClickerGame = lazy(() => import('./ClickerGame'));
const SudokuGame = lazy(() => import('./SudokuGame'));

interface GamesPageProps {
  onBack: () => void;
}

const SectionTitle: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
    <div className="flex items-center justify-center gap-4 mb-8">
        <div className="text-purple-400 drop-shadow-[0_0_5px_rgba(192,132,252,0.7)]">{icon}</div>
        <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            {title}
        </h2>
    </div>
);

const GameLoadingFallback: React.FC = () => (
    <div className="w-full h-64 flex flex-col items-center justify-center space-y-4 animate-pulse">
        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
        <p className="text-cyan-400 font-bold tracking-widest text-sm">LOADING COMPONENT...</p>
    </div>
);

const GamesPage: React.FC<GamesPageProps> = ({ onBack }) => {
  return (
    <div className="relative z-10 p-4 md:p-8 max-w-6xl mx-auto">
        <header className="relative text-center py-10">
            <button 
                onClick={onBack} 
                className="absolute top-1/2 -translate-y-1/2 left-0 md:left-4 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                aria-label="العودة لصفحة الملف الشخصي"
            >
                <ChevronLeftIcon className="w-6 h-6" aria-hidden="true" />
                <span className="font-bold">العودة للملف</span>
            </button>
            <SectionTitle icon={<GamepadIcon className="w-10 h-10"/>} title="صالة الألعاب" />
            <p className="max-w-2xl mx-auto text-lg text-gray-300">
                مرحباً بك في منطقة الترفيه! خذ استراحة قصيرة واستمتع بمجموعة من الألعاب الكلاسيكية.
            </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card glowColor="purple">
                <Suspense fallback={<GameLoadingFallback />}>
                    <SnakeGame />
                </Suspense>
            </Card>
            <Card glowColor="green">
                <Suspense fallback={<GameLoadingFallback />}>
                    <HangmanGame />
                </Suspense>
            </Card>
            <Card glowColor="blue">
                <Suspense fallback={<GameLoadingFallback />}>
                    <TicTacToeGame />
                </Suspense>
            </Card>
            <Card glowColor="purple">
                <Suspense fallback={<GameLoadingFallback />}>
                    <RockPaperScissorsGame />
                </Suspense>
            </Card>
            <Card glowColor="green">
                <Suspense fallback={<GameLoadingFallback />}>
                    <ReactionTimeGame />
                </Suspense>
            </Card>
            <Card glowColor="blue">
                <Suspense fallback={<GameLoadingFallback />}>
                    <ClickerGame />
                </Suspense>
            </Card>
            <Card glowColor="purple" className="md:col-span-2 lg:col-span-3">
                <Suspense fallback={<GameLoadingFallback />}>
                    <SudokuGame />
                </Suspense>
            </Card>
        </div>
    </div>
  );
};

export default GamesPage;
