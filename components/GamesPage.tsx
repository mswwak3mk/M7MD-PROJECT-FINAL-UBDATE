import React from 'react';
import Card from './Card';
import { GamepadIcon, ChevronLeftIcon } from './icons';
import SnakeGame from './SnakeGame';
import HangmanGame from './HangmanGame';
import TicTacToeGame from './TicTacToeGame';
import RockPaperScissorsGame from './RockPaperScissorsGame';
import ReactionTimeGame from './ReactionTimeGame';
import ClickerGame from './ClickerGame';
import SudokuGame from './SudokuGame';
import NeonButton from './Button';

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


const GamesPage: React.FC<GamesPageProps> = ({ onBack }) => {
  return (
    <div className="relative z-10 p-4 md:p-8 max-w-6xl mx-auto">
        <header className="relative text-center py-10">
            <button onClick={onBack} className="absolute top-1/2 -translate-y-1/2 left-0 md:left-4 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                <ChevronLeftIcon className="w-6 h-6" />
                <span className="font-bold">العودة للملف</span>
            </button>
            <SectionTitle icon={<GamepadIcon className="w-10 h-10"/>} title="صالة الألعاب" />
            <p className="max-w-2xl mx-auto text-lg text-gray-300">
                مرحباً بك في منطقة الترفيه! خذ استراحة قصيرة واستمتع بمجموعة من الألعاب الكلاسيكية.
            </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card glowColor="purple"><SnakeGame /></Card>
            <Card glowColor="green"><HangmanGame /></Card>
            <Card glowColor="blue"><TicTacToeGame /></Card>
            <Card glowColor="purple"><RockPaperScissorsGame /></Card>
            <Card glowColor="green"><ReactionTimeGame /></Card>
            <Card glowColor="blue"><ClickerGame /></Card>
            <Card glowColor="purple" className="md:col-span-2 lg:col-span-3"><SudokuGame /></Card>
        </div>
    </div>
  );
};

export default GamesPage;
