import React, { useState, useCallback } from 'react';
import NeonButton from './Button';

const puzzles: Record<string, number[][][]> = {
    easy: [
        [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9],
        ]
    ],
    medium: [
        [
            [0, 0, 0, 2, 6, 0, 7, 0, 1],
            [6, 8, 0, 0, 7, 0, 0, 9, 0],
            [1, 9, 0, 0, 0, 4, 5, 0, 0],
            [8, 2, 0, 1, 0, 0, 0, 4, 0],
            [0, 0, 4, 6, 0, 2, 9, 0, 0],
            [0, 5, 0, 0, 0, 3, 0, 2, 8],
            [0, 0, 9, 3, 0, 0, 0, 7, 4],
            [0, 4, 0, 0, 5, 0, 0, 3, 6],
            [7, 0, 3, 0, 1, 8, 0, 0, 0],
        ]
    ],
    hard: [
        [
            [1, 0, 0, 0, 0, 7, 0, 9, 0],
            [0, 3, 0, 0, 2, 0, 0, 0, 8],
            [0, 0, 9, 6, 0, 0, 5, 0, 0],
            [0, 0, 5, 3, 0, 0, 9, 0, 0],
            [0, 1, 0, 0, 8, 0, 0, 0, 2],
            [6, 0, 0, 0, 0, 4, 0, 0, 0],
            [3, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 4, 0, 0, 0, 0, 0, 0, 7],
            [0, 0, 7, 0, 0, 0, 3, 0, 0],
        ]
    ]
};

const SudokuGame: React.FC = () => {
    const [difficulty, setDifficulty] = useState<keyof typeof puzzles>('easy');
    const [gameStarted, setGameStarted] = useState(false);
    const [puzzleIndex, setPuzzleIndex] = useState(0);
    const [board, setBoard] = useState<number[][]>([]);
    const [initialBoard, setInitialBoard] = useState<number[][]>([]);
    const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
    const [status, setStatus] = useState<string>('ابدأ اللعبة وحل اللغز!');

    const startNewGame = useCallback((level?: keyof typeof puzzles) => {
        const currentLevel = level || difficulty;
        const levelPuzzles = puzzles[currentLevel];
        const nextIndex = Math.floor(Math.random() * levelPuzzles.length);
        
        setDifficulty(currentLevel);
        setPuzzleIndex(nextIndex);
        const newBoard = JSON.parse(JSON.stringify(levelPuzzles[nextIndex]));
        setBoard(newBoard);
        setInitialBoard(JSON.parse(JSON.stringify(newBoard)));
        setGameStarted(true);
        setSelectedCell(null);
        setStatus('لغز جديد! بالتوفيق.');
    }, [difficulty]);

    const handleNumberInput = (num: number) => {
        if (!selectedCell) return;
        const { row, col } = selectedCell;
        if (initialBoard[row][col] !== 0) return;

        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = num;
        setBoard(newBoard);

        if (num !== 0) {
            if (!isCellValid(newBoard, row, col, num)) {
                setStatus('انتبه! هناك رقم مكرر في هذا الصف أو العمود أو المربع.');
            } else {
                setStatus('خطوة جيدة!');
            }
        }
    };

    const isCellValid = (currentBoard: number[][], row: number, col: number, num: number): boolean => {
        // Check row
        for (let x = 0; x < 9; x++) {
            if (x !== col && currentBoard[row][x] === num) return false;
        }
        // Check column
        for (let x = 0; x < 9; x++) {
            if (x !== row && currentBoard[x][col] === num) return false;
        }
        // Check 3x3 box
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if ((startRow + i !== row || startCol + j !== col) && currentBoard[startRow + i][startCol + j] === num) return false;
            }
        }
        return true;
    };

    const isBoardValid = (currentBoard: number[][]): boolean => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = currentBoard[i][j];
                if (cell !== 0 && !isCellValid(currentBoard, i, j, cell)) return false;
            }
        }
        return true;
    };

    const checkSolution = () => {
        const isComplete = !board.flat().includes(0);
        if (!isComplete) {
            setStatus('اللغز لم يكتمل بعد.');
            return;
        }
        
        if (isBoardValid(board)) {
            setStatus('تهانينا! لقد حلت اللغز بشكل صحيح.');
        } else {
            setStatus('الحل غير صحيح، حاول مرة أخرى.');
        }
    };

    return (
        <div className="text-center p-4 flex flex-col items-center">
            <h3 className="text-xl font-bold text-purple-300 mb-4">لعبة السودوكو</h3>
            
            {!gameStarted ? (
                <div className="bg-black/40 p-6 rounded-lg border border-purple-500/30">
                    <h4 className="text-lg font-bold text-cyan-400 mb-4">اختر مستوى الصعوبة</h4>
                    <div className="flex gap-4 mb-6">
                        <button 
                            onClick={() => startNewGame('easy')}
                            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md transition-all"
                        >
                            سهل
                        </button>
                        <button 
                            onClick={() => startNewGame('medium')}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-md transition-all"
                        >
                            متوسط
                        </button>
                        <button 
                            onClick={() => startNewGame('hard')}
                            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition-all"
                        >
                            صعب
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-9 bg-gray-900 border-2 border-purple-500 p-1 rounded-md mb-6 shadow-xl w-fit">
                        {board.map((row, rowIndex) =>
                            row.map((cell, colIndex) => {
                                const isInitial = initialBoard[rowIndex][colIndex] !== 0;
                                const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                                
                                // Alternating background for 3x3 blocks for better visual grouping
                                const isBlockEven = (Math.floor(rowIndex / 3) + Math.floor(colIndex / 3)) % 2 === 0;
                                
                                let borderClasses = '';
                                // Stronger borders for 3x3 grid separation
                                if ((colIndex + 1) % 3 === 0 && colIndex < 8) borderClasses += ' border-r-3 border-r-purple-600';
                                if ((rowIndex + 1) % 3 === 0 && rowIndex < 8) borderClasses += ' border-b-3 border-b-purple-600';
                                
                                const isValid = cell === 0 || isCellValid(board, rowIndex, colIndex, cell);
                                const cellColor = isInitial ? 'text-cyan-400' : (isValid ? 'text-white' : 'text-red-400');

                                return (
                                    <div
                                        key={`${rowIndex}-${colIndex}`}
                                        onClick={() => setSelectedCell({row: rowIndex, col: colIndex})}
                                        className={`
                                            w-9 h-9 md:w-12 md:h-12 flex items-center justify-center text-xl font-bold 
                                            ${isBlockEven ? 'bg-gray-800' : 'bg-gray-900'} 
                                            border-t border-l border-gray-700 cursor-pointer
                                            ${isSelected ? 'bg-purple-900 ring-4 ring-inset ring-green-400 z-10' : 'hover:bg-purple-800/30'}
                                            ${cellColor}
                                            ${borderClasses}
                                            transition-all duration-200
                                        `}
                                    >
                                        {cell !== 0 ? cell : ''}
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <div className="grid grid-cols-5 gap-2 mb-6 w-full max-w-xs">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
                            <button
                                key={num}
                                onClick={() => handleNumberInput(num)}
                                className={`
                                    p-2 rounded-md font-bold text-lg transition-all
                                    ${num === 0 ? 'bg-red-900/40 text-red-400 col-span-1' : 'bg-gray-800 text-cyan-400 hover:bg-gray-700'}
                                    border border-gray-700
                                `}
                            >
                                {num === 0 ? 'X' : num}
                            </button>
                        ))}
                    </div>

                    <p className={`mb-4 min-h-[24px] font-semibold transition-all duration-300 ${status.includes('تهانينا') ? 'text-green-400 scale-110' : status.includes('انتبه') || status.includes('غير') ? 'text-red-400' : 'text-yellow-400'}`}>{status}</p>
                    
                    <div className="flex flex-wrap justify-center gap-4">
                        <NeonButton onClick={checkSolution} glowColor="green">تحقق من الحل</NeonButton>
                        <NeonButton onClick={() => setGameStarted(false)} glowColor="purple">تغيير المستوى</NeonButton>
                    </div>
                </>
            )}
        </div>
    );
};

export default SudokuGame;
