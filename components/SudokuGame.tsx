import React, { useState, useCallback } from 'react';
import NeonButton from './Button';

const initialPuzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const SudokuGame: React.FC = () => {
    const [board, setBoard] = useState<number[][]>(JSON.parse(JSON.stringify(initialPuzzle)));
    const [status, setStatus] = useState<string>('ابدأ اللعبة وحل اللغز!');

    const startNewGame = useCallback(() => {
        setBoard(JSON.parse(JSON.stringify(initialPuzzle)));
        setStatus('ابدأ اللعبة وحل اللغز!');
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
        const value = e.target.value;
        if (/^[1-9]$/.test(value) || value === '') {
            const newBoard = board.map(r => [...r]);
            newBoard[row][col] = value === '' ? 0 : parseInt(value, 10);
            setBoard(newBoard);
        }
    };

    const isBoardValid = (currentBoard: number[][]): boolean => {
        // Check rows and columns for duplicates
        for (let i = 0; i < 9; i++) {
            const row = new Set<number>();
            const col = new Set<number>();
            for (let j = 0; j < 9; j++) {
                const rowCell = currentBoard[i][j];
                const colCell = currentBoard[j][i];
                if (row.has(rowCell)) return false;
                row.add(rowCell);
                if (col.has(colCell)) return false;
                col.add(colCell);
            }
        }

        // Check 3x3 subgrids for duplicates
        for (let boxRow = 0; boxRow < 9; boxRow += 3) {
            for (let boxCol = 0; boxCol < 9; boxCol += 3) {
                const subgrid = new Set<number>();
                for (let i = boxRow; i < boxRow + 3; i++) {
                    for (let j = boxCol; j < boxCol + 3; j++) {
                        const cell = currentBoard[i][j];
                        if (subgrid.has(cell)) return false;
                        subgrid.add(cell);
                    }
                }
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
            <div className="grid grid-cols-9 bg-gray-900 border-2 border-purple-500 p-1 rounded-md mb-4">
                {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                        const isInitial = initialPuzzle[rowIndex][colIndex] !== 0;
                        let borderClasses = '';
                        if ((colIndex + 1) % 3 === 0 && colIndex < 8) {
                            borderClasses += ' border-r-2 border-r-purple-500';
                        }
                        if ((rowIndex + 1) % 3 === 0 && rowIndex < 8) {
                            borderClasses += ' border-b-2 border-b-purple-500';
                        }
                        return (
                            <input
                                key={`${rowIndex}-${colIndex}`}
                                type="tel" // Use tel for number pad on mobile
                                pattern="[1-9]"
                                maxLength={1}
                                value={cell === 0 ? '' : cell}
                                readOnly={isInitial}
                                onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                                className={`
                                    w-8 h-8 md:w-10 md:h-10 text-center text-lg font-bold bg-gray-800 border-gray-700
                                    border-t border-l
                                    ${isInitial ? 'text-cyan-400 cursor-not-allowed' : 'text-white'}
                                    ${borderClasses}
                                    focus:outline-none focus:bg-gray-700 focus:ring-2 focus:ring-green-400 z-10
                                `}
                            />
                        );
                    })
                )}
            </div>
            <p className={`mb-4 min-h-[24px] font-semibold ${status.includes('تهانينا') ? 'text-green-400' : status.includes('غير') ? 'text-red-400' : 'text-yellow-400'}`}>{status}</p>
            <div className="flex gap-4">
                <NeonButton onClick={checkSolution} glowColor="green">تحقق من الحل</NeonButton>
                <NeonButton onClick={startNewGame} glowColor="purple">لعبة جديدة</NeonButton>
            </div>
        </div>
    );
};

export default SudokuGame;
