import React, { useState, useEffect, useRef, useCallback } from 'react';
import NeonButton from './Button';

const CANVAS_SIZE = [400, 400];
const SNAKE_START = [[8, 7], [8, 8]];
const FOOD_START = [8, 3];
const SCALE = 20;
const SPEED = 150;

const UP = [0, -1];
const DOWN = [0, 1];
const LEFT = [-1, 0];
const RIGHT = [1, 0];

const DIRECTIONS: { [key: string]: number[] } = {
  arrowup: UP,
  w: UP,
  arrowdown: DOWN,
  s: DOWN,
  arrowleft: LEFT,
  a: LEFT,
  arrowright: RIGHT,
  d: RIGHT,
};

const SnakeGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [snake, setSnake] = useState(SNAKE_START);
    const [food, setFood] = useState(FOOD_START);
    const [direction, setDirection] = useState([0, -1]);
    const [speed, setSpeed] = useState<number | null>(SPEED);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const startGame = useCallback(() => {
        setSnake(SNAKE_START);
        setFood(FOOD_START);
        setDirection([0, -1]);
        setSpeed(SPEED);
        setGameOver(false);
        setScore(0);
        containerRef.current?.focus();
    }, []);

    const createFood = (currentSnake: number[][]) => {
        let newFood: number[];
        do {
            newFood = food.map((_, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));
        } while (currentSnake.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1]));
        return newFood;
    };

    const handleKeyDown = useCallback((e: React.KeyboardEvent | KeyboardEvent) => {
        const key = e.key.toLowerCase();
        const newDirection = DIRECTIONS[key];
        if (newDirection) {
            e.preventDefault();
            setDirection(currentDirection => {
                const [dx, dy] = currentDirection;
                const [newDx, newDy] = newDirection;
                if (-(dx) !== newDx && -(dy) !== newDy) {
                    return newDirection;
                }
                return currentDirection;
            });
        }
    }, []);

    useEffect(() => {
        containerRef.current?.focus();
        
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
             const key = e.key.toLowerCase();
             if (key in DIRECTIONS) {
                handleKeyDown(e);
             }
        };

        const currentRef = containerRef.current;
        currentRef?.addEventListener('keydown', handleGlobalKeyDown as EventListener);

        return () => {
            currentRef?.removeEventListener('keydown', handleGlobalKeyDown as EventListener);
        };
    }, [handleKeyDown]);


    const gameLoop = useCallback(() => {
        setSnake(prevSnake => {
            const snakeCopy = JSON.parse(JSON.stringify(prevSnake));
            const newSnakeHead = [snakeCopy[0][0] + direction[0], snakeCopy[0][1] + direction[1]];

            // Wall collision
            if (
                newSnakeHead[0] * SCALE >= CANVAS_SIZE[0] ||
                newSnakeHead[0] < 0 ||
                newSnakeHead[1] * SCALE >= CANVAS_SIZE[1] ||
                newSnakeHead[1] < 0
            ) {
                setSpeed(null);
                setGameOver(true);
                return prevSnake;
            }
            
            // Self collision
            for (const segment of snakeCopy) {
                if (newSnakeHead[0] === segment[0] && newSnakeHead[1] === segment[1]) {
                    setSpeed(null);
                    setGameOver(true);
                    return prevSnake;
                }
            }
            
            snakeCopy.unshift(newSnakeHead);

            if (newSnakeHead[0] === food[0] && newSnakeHead[1] === food[1]) {
                setScore(prev => prev + 10);
                setFood(createFood(snakeCopy));
            } else {
                snakeCopy.pop();
            }
            
            return snakeCopy;
        });
    }, [direction, food]);

    useEffect(() => {
        if (speed === null) return;
        const interval = setInterval(gameLoop, speed);
        return () => clearInterval(interval);
    }, [speed, gameLoop]);

    useEffect(() => {
        const context = canvasRef.current?.getContext('2d');
        if (context) {
            context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
            context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);
            
            context.fillStyle = 'rgb(74 222 128)'; // green-400
            snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
            
            context.fillStyle = 'rgb(239 68 68)'; // red-500
            context.fillRect(food[0], food[1], 1, 1);
        }
    }, [snake, food]);

    return (
        <div 
            ref={containerRef}
            tabIndex={0} 
            className="outline-none focus:ring-2 focus:ring-purple-500 rounded-lg p-2"
        >
             <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="text-xl font-bold text-purple-300">لعبة الثعبان</h3>
                <p className="font-bold text-xl text-green-400">النتيجة: {score}</p>
            </div>
            <div className="relative flex justify-center items-center">
                 <canvas
                    ref={canvasRef}
                    width={`${CANVAS_SIZE[0]}px`}
                    height={`${CANVAS_SIZE[1]}px`}
                    className="bg-black/50 border-2 border-purple-500 rounded-md"
                 />
                 {gameOver && (
                     <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center rounded-md">
                         <p className="text-4xl font-bold text-red-500 mb-4">انتهت اللعبة!</p>
                         <NeonButton onClick={startGame} glowColor="green">
                            إعادة اللعب
                         </NeonButton>
                     </div>
                 )}
            </div>
        </div>
    );
};

export default SnakeGame;