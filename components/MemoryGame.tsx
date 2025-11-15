import React, { useState, useEffect, useCallback } from 'react';
import { GamepadIcon, CircuitBoardIcon, ControllerIcon, BrainCircuitIcon, TrophyIcon, UserIcon } from './icons';
import NeonButton from './Button';

const ICONS = [
    { component: GamepadIcon, name: 'Gamepad' },
    { component: CircuitBoardIcon, name: 'CircuitBoard' },
    { component: ControllerIcon, name: 'Controller' },
    { component: BrainCircuitIcon, name: 'BrainCircuit' },
    { component: TrophyIcon, name: 'Trophy' },
    { component: UserIcon, name: 'User' },
];

interface CardType {
    id: number;
    icon: React.FC<{className?: string}>;
    name: string;
}

const createShuffledDeck = (): CardType[] => {
    const duplicatedIcons = [...ICONS, ...ICONS];
    return duplicatedIcons
        .map((icon, index) => ({ id: index, icon: icon.component, name: icon.name }))
        .sort(() => Math.random() - 0.5);
};


const MemoryGame: React.FC = () => {
    const [cards, setCards] = useState<CardType[]>(createShuffledDeck());
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [matchedNames, setMatchedNames] = useState<string[]>([]);
    const [moves, setMoves] = useState(0);
    const [isGameWon, setIsGameWon] = useState(false);

    const resetGame = useCallback(() => {
        setCards(createShuffledDeck());
        setFlippedIndices([]);
        setMatchedNames([]);
        setMoves(0);
        setIsGameWon(false);
    }, []);

    useEffect(() => {
        if (matchedNames.length === ICONS.length) {
            setIsGameWon(true);
        }
    }, [matchedNames]);

    useEffect(() => {
        if (flippedIndices.length === 2) {
            const [firstIndex, secondIndex] = flippedIndices;
            const firstCard = cards[firstIndex];
            const secondCard = cards[secondIndex];

            if (firstCard.name === secondCard.name) {
                setMatchedNames(prev => [...prev, firstCard.name]);
                setFlippedIndices([]);
            } else {
                setTimeout(() => {
                    setFlippedIndices([]);
                }, 1000);
            }
            setMoves(prev => prev + 1);
        }
    }, [flippedIndices, cards]);

    const handleCardClick = (index: number) => {
        if (flippedIndices.length === 2 || flippedIndices.includes(index) || matchedNames.includes(cards[index].name)) {
            return;
        }
        setFlippedIndices(prev => [...prev, index]);
    };

    if (isGameWon) {
        return (
             <div className="text-center p-4 flex flex-col items-center justify-center min-h-[300px]">
                <h3 className="text-2xl font-bold text-green-400 mb-2">تهانينا، لقد فزت!</h3>
                <p className="text-xl mb-6">أكملت اللعبة في <span className="font-bold text-purple-400">{moves}</span> حركة.</p>
                <NeonButton onClick={resetGame} glowColor="purple">
                    العب مرة أخرى
                </NeonButton>
            </div>
        )
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-purple-300">لعبة الذاكرة</h3>
                <p className="font-bold text-lg text-green-400">الحركات: {moves}</p>
            </div>
            <div className="grid grid-cols-4 gap-4 justify-center">
                {cards.map((card, index) => {
                    const isFlipped = flippedIndices.includes(index) || matchedNames.includes(card.name);
                    const IconComponent = card.icon;
                    return (
                        <div key={card.id} className="aspect-square perspective" onClick={() => handleCardClick(index)}>
                            <div className={`relative w-full h-full preserve-3d transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}>
                                <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer">
                                    {/* Card Back */}
                                    <span className="text-3xl font-bold text-purple-400">?</span>
                                </div>
                                <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center bg-[#1d2739] border-2 border-purple-500 rounded-lg">
                                    {/* Card Front */}
                                    <IconComponent className="w-1/2 h-1/2 text-cyan-400" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
             <style>{`
                .perspective { perspective: 1000px; }
                .preserve-3d { transform-style: preserve-3d; }
                .rotate-y-180 { transform: rotateY(180deg); }
                .backface-hidden { backface-visibility: hidden; }
            `}</style>
        </div>
    );
};

export default MemoryGame;
