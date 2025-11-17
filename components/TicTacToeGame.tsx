import React, { useState, useEffect, useCallback } from 'react';
import NeonButton from './Button';

type Player = 'X' | 'O' | null;

const TicTacToeGame: React.FC = () => {
    const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

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
        
        let availableMoves: number[] = [];
        board.forEach((square, index) => {
            if (square === null) {
                availableMoves.push(index);
            }
        });
        
        if (availableMoves.length > 0) {
            const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            const newBoard = board.slice();
            newBoard[randomMove] = 'O';
            setBoard(newBoard);
            setIsXNext(true);
        }
    }, [board, winner, isBoardFull]);


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
    };

    const renderSquare = (i: number) => (
        <button
            className="w-20 h-20 bg-gray-800 border-2 border-purple-500 text-4xl font-bold flex justify-center items-center rounded-md"
            onClick={() => handleClick(i)}
        >
            <span className={board[i] === 'X' ? 'text-cyan-400' : 'text-green-400'}>{board[i]}</span>
        </button>
    );

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
            <p className="mb-4 text-lg text-gray-300">{status}</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
                {Array(9).fill(null).map((_, i) => renderSquare(i))}
            </div>
            {(winner || isBoardFull) && <NeonButton onClick={resetGame} glowColor="purple">لعبة جديدة</NeonButton>}
        </div>
    );
};

export default TicTacToeGame;
