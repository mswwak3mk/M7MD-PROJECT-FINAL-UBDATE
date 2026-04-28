import React, { useState, useEffect, useCallback } from 'react';
import NeonButton from './Button';

type Player = 'X' | 'O' | null;

const TicTacToeGame: React.FC = () => {
    const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
    const [gameStarted, setGameStarted] = useState(false);

    const calculateWinner = (squares: Player[]): Player => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const winner = calculateWinner(board);
    const isBoardFull = board.every(square => square !== null);

    const computerMove = useCallback(() => {
        if (winner || isBoardFull) return;
        
        const availableMoves = board.map((val, idx) => val === null ? idx : null).filter((val): val is number => val !== null);
        
        let move = -1;

        if (difficulty === 'easy') {
            // Completely random
            move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        } else if (difficulty === 'medium' && Math.random() < 0.3) {
            // 30% chance to make a random move on medium
            move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        } else {
            // Minimax Algorithm for hard/unbeatable AI
            const minimax = (tempBoard: Player[], depth: number, isMaximizing: boolean): number => {
                const currentWinner = calculateWinner(tempBoard);
                if (currentWinner === 'O') return 10 - depth;
                if (currentWinner === 'X') return depth - 10;
                if (tempBoard.every(square => square !== null)) return 0;

                if (isMaximizing) {
                    let bestScore = -Infinity;
                    for (let i = 0; i < 9; i++) {
                        if (tempBoard[i] === null) {
                            tempBoard[i] = 'O';
                            const score = minimax(tempBoard, depth + 1, false);
                            tempBoard[i] = null;
                            bestScore = Math.max(score, bestScore);
                        }
                    }
                    return bestScore;
                } else {
                    let bestScore = Infinity;
                    for (let i = 0; i < 9; i++) {
                        if (tempBoard[i] === null) {
                            tempBoard[i] = 'X';
                            const score = minimax(tempBoard, depth + 1, true);
                            tempBoard[i] = null;
                            bestScore = Math.min(score, bestScore);
                        }
                    }
                    return bestScore;
                }
            };

            let bestScore = -Infinity;
            const currentBoard = [...board];

            for (let i = 0; i < 9; i++) {
                if (currentBoard[i] === null) {
                    currentBoard[i] = 'O';
                    const score = minimax(currentBoard, 0, false);
                    currentBoard[i] = null;
                    if (score > bestScore) {
                        bestScore = score;
                        move = i;
                    }
                }
            }
        }
        
        if (move !== -1) {
            const newBoard = board.slice();
            newBoard[move] = 'O';
            setBoard(newBoard);
            setIsXNext(true);
        }
    }, [board, winner, isBoardFull, difficulty]);


    useEffect(() => {
        if (!isXNext && !winner) {
           const timeout = setTimeout(() => {
                computerMove();
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [isXNext, winner, computerMove]);


    const handleClick = (i: number) => {
        if (winner || board[i] || !isXNext) return;
        const newBoard = board.slice();
        newBoard[i] = 'X';
        setBoard(newBoard);
        setIsXNext(false);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setGameStarted(false);
    };

    const renderSquare = (i: number) => {
        const row = Math.floor(i / 3) + 1;
        const col = (i % 3) + 1;
        return (
            <button
                className="w-20 h-20 bg-gray-800 border-2 border-purple-500 text-4xl font-bold flex justify-center items-center rounded-md hover:bg-gray-700 transition-colors"
                onClick={() => handleClick(i)}
                aria-label={`المربع في الصف ${row} والعمود ${col}${board[i] ? `: ${board[i]}` : ': فارغ'}`}
            >
                <span className={board[i] === 'X' ? 'text-cyan-400' : 'text-green-400'}>{board[i]}</span>
            </button>
        );
    };

    let status;
    if (winner) {
        status = `الفائز هو: ${winner}`;
    } else if (isBoardFull) {
        status = 'تعادل!';
    } else {
        status = `الدور على: ${isXNext ? 'أنت (X)' : 'الحاسوب (O)'}`;
    }

    return (
        <div className="text-center p-4 flex flex-col items-center">
            <h3 className="text-xl font-bold text-purple-300 mb-4">لعبة إكس-أو</h3>
            
            {!gameStarted ? (
                <div className="bg-black/40 p-6 rounded-lg border border-purple-500/30">
                    <h4 className="text-lg font-bold text-cyan-400 mb-4">اختر مستوى الصعوبة</h4>
                    <div className="flex gap-4 mb-6">
                        <button 
                            onClick={() => setDifficulty('easy')}
                            className={`px-4 py-2 rounded-md transition-all ${difficulty === 'easy' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-400'}`}
                        >
                            سهل
                        </button>
                        <button 
                            onClick={() => setDifficulty('medium')}
                            className={`px-4 py-2 rounded-md transition-all ${difficulty === 'medium' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400'}`}
                        >
                            متوسط
                        </button>
                        <button 
                            onClick={() => setDifficulty('hard')}
                            className={`px-4 py-2 rounded-md transition-all ${difficulty === 'hard' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400'}`}
                        >
                            صعب
                        </button>
                    </div>
                    <NeonButton onClick={() => setGameStarted(true)} glowColor="purple">بدء اللعب</NeonButton>
                </div>
            ) : (
                <>
                    <p className="mb-4 text-lg text-gray-300">{status}</p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        {Array(9).fill(null).map((_, i) => (
                            <React.Fragment key={i}>
                                {renderSquare(i)}
                            </React.Fragment>
                        ))}
                    </div>
                    {(winner || isBoardFull) && <NeonButton onClick={resetGame} glowColor="purple">لعبة جديدة</NeonButton>}
                </>
            )}
        </div>
    );
};

export default TicTacToeGame;
