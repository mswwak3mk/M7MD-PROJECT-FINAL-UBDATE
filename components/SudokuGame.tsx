import React, { useState, useCallback } from 'react';
import NeonButton from './Button';

const puzzles = [
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
    ],
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
];

const SudokuGame: React.FC = () => {
    const [puzzleIndex, setPuzzleIndex] = useState(0);
    const [board, setBoard] = useState<number[][]>(JSON.parse(JSON.stringify(puzzles[0])));
    const [status, setStatus] = useState<string>('ابدأ اللعبة وحل اللغز!');

    const startNewGame = useCallback(() => {
        const nextIndex = (puzzleIndex + 1) % puzzles.length;
        setPuzzleIndex(nextIndex);
        setBoard(JSON.parse(JSON.stringify(puzzles[nextIndex])));
        setStatus('لغز جديد! بالتوفيق.');
    }, [puzzleIndex]);

    const resetBoard = () => {
        setBoard(JSON.parse(JSON.stringify(puzzles[puzzleIndex])));
        setStatus('تمت إعادة تعيين اللوحة.');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
        const value = e.target.value;
        if (/^[1-9]$/.test(value) || value === '') {
            const newBoard = board.map(r => [...r]);
            newBoard[row][col] = value === '' ? 0 : parseInt(value, 10);
            setBoard(newBoard);
            
            // Real-time validation message hint
            if (value !== '') {
                if (!isCellValid(newBoard, row, col, parseInt(value, 10))) {
                    setStatus('انتبه! هناك رقم مكرر في هذا الصف أو العمود أو المربع.');
                } else {
                    setStatus('خطوة جيدة!');
                }
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
        // Check rows and columns for duplicates
        for (let i = 0; i < 9; i++) {
            const rowSet = new Set<number>();
            const colSet = new Set<number>();
            for (let j = 0; j < 9; j++) {
                const rowCell = currentBoard[i][j];
                const colCell = currentBoard[j][i];
                
                if (rowCell !== 0) {
                    if (rowSet.has(rowCell)) return false;
                    rowSet.add(rowCell);
                }
                
                if (colCell !== 0) {
                    if (colSet.has(colCell)) return false;
                    colSet.add(colCell);
                }
            }
        }

        // Check 3x3 subgrids for duplicates
        for (let boxRow = 0; boxRow < 9; boxRow += 3) {
            for (let boxCol = 0; boxCol < 9; boxCol += 3) {
                const subgrid = new Set<number>();
                for (let i = boxRow; i < boxRow + 3; i++) {
                    for (let j = boxCol; j < boxCol + 3; j++) {
                        const cell = currentBoard[i][j];
                        if (cell !== 0) {
                            if (subgrid.has(cell)) return false;
                            subgrid.add(cell);
                        }
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
            <div className="grid grid-cols-9 bg-gray-900 border-2 border-purple-500 p-1 rounded-md mb-4 shadow-xl">
                {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                        const isInitial = puzzles[puzzleIndex][rowIndex][colIndex] !== 0;
                        let borderClasses = '';
                        if ((colIndex + 1) % 3 === 0 && colIndex < 8) {
                            borderClasses += ' border-r-2 border-r-purple-500';
                        }
                        if ((rowIndex + 1) % 3 === 0 && rowIndex < 8) {
                            borderClasses += ' border-b-2 border-b-purple-500';
                        }
                        
                        // Highlight errors in red if not initial cell
                        const isValid = cell === 0 || isCellValid(board, rowIndex, colIndex, cell);
                        const cellColor = isInitial ? 'text-cyan-400' : (isValid ? 'text-white' : 'text-red-400');

                        return (
                            <input
                                key={`${rowIndex}-${colIndex}`}
                                type="tel"
                                pattern="[1-9]"
                                aria-label={`الصف ${rowIndex + 1} العمود ${colIndex + 1}${isInitial ? ' (ثابت)' : ''}`}
                                maxLength={1}
                                value={cell === 0 ? '' : cell}
                                readOnly={isInitial}
                                onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                                className={`
                                    w-8 h-8 md:w-10 md:h-10 text-center text-lg font-bold bg-gray-800 border-gray-700
                                    border-t border-l
                                    ${isInitial ? 'cursor-not-allowed' : 'hover:bg-gray-700'}
                                    ${cellColor}
                                    ${borderClasses}
                                    focus:outline-none focus:bg-gray-700 focus:ring-2 focus:ring-green-400 z-10 transition-colors
                                `}
                            />
                        );
                    })
                )}
            </div>
            <p className={`mb-4 min-h-[24px] font-semibold transition-all duration-300 ${status.includes('تهانينا') ? 'text-green-400 scale-110' : status.includes('انتبه') || status.includes('غير') ? 'text-red-400' : 'text-yellow-400'}`}>{status}</p>
            <div className="flex flex-wrap justify-center gap-4">
                <NeonButton onClick={checkSolution} glowColor="green">تحقق من الحل</NeonButton>
                <NeonButton onClick={resetBoard} glowColor="blue">إعادة المحاولة</NeonButton>
                <NeonButton onClick={startNewGame} glowColor="purple">لغز جديد</NeonButton>
            </div>
        </div>
    );
};

export default SudokuGame;
