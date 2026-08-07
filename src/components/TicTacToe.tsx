import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

type Player = 'X' | 'O' | null;

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true); // User is X, always starts
  const [winner, setWinner] = useState<Player | 'Draw'>(null);

  // Check for winner
  useEffect(() => {
    let currentWinner: Player | 'Draw' = null;
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        currentWinner = board[a];
        break;
      }
    }
    if (!currentWinner && !board.includes(null)) {
      currentWinner = 'Draw';
    }
    
    if (currentWinner) {
      setWinner(currentWinner);
    } else if (!isXNext) {
      // Computer's turn (O)
      const timeout = setTimeout(() => {
        makeComputerMove(board);
      }, 500); // Small delay to feel natural
      return () => clearTimeout(timeout);
    }
  }, [board, isXNext]);

  const makeComputerMove = (currentBoard: Player[]) => {
    // Simple AI: Try to win, then try to block, then pick random
    // 1. Try to win
    for (let i = 0; i < 9; i++) {
      if (!currentBoard[i]) {
        const boardCopy = [...currentBoard];
        boardCopy[i] = 'O';
        if (checkWin(boardCopy, 'O')) {
          handleMove(i, 'O');
          return;
        }
      }
    }
    // 2. Block
    for (let i = 0; i < 9; i++) {
      if (!currentBoard[i]) {
        const boardCopy = [...currentBoard];
        boardCopy[i] = 'X';
        if (checkWin(boardCopy, 'X')) {
          handleMove(i, 'O');
          return;
        }
      }
    }
    // 3. Center if empty
    if (!currentBoard[4]) {
      handleMove(4, 'O');
      return;
    }
    // 4. Random available
    const available = currentBoard.map((v, i) => v === null ? i : null).filter(v => v !== null) as number[];
    if (available.length > 0) {
      const randomIdx = available[Math.floor(Math.random() * available.length)];
      handleMove(randomIdx, 'O');
    }
  };

  const checkWin = (b: Player[], p: Player) => {
    return WINNING_COMBINATIONS.some(([x, y, z]) => b[x] === p && b[y] === p && b[z] === p);
  };

  const handleMove = (index: number, player: Player) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    setIsXNext(player === 'O');
  };

  const onCellClick = (index: number) => {
    if (!isXNext || board[index] || winner) return;
    handleMove(index, 'X');
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="tic-tac-toe-wrapper">
      <div className="tictactoe-container">
        <div className="tictactoe-header">
          {winner === 'Draw' 
            ? "Hòa rồi!" 
            : winner 
              ? `${winner === 'X' ? 'Bạn' : 'Máy'} thắng!` 
              : isXNext ? "Lượt của bạn (X)" : "Máy đang nghĩ..."}
        </div>
        
        <div className="tictactoe-board">
          {board.map((cell, index) => (
            <div 
              key={index} 
              className={`tictactoe-cell ${cell ? `cell-${cell.toLowerCase()}` : ''}`}
              onClick={() => onCellClick(index)}
            >
              {cell === 'X' && (
                <svg viewBox="0 0 100 100" className="icon-x">
                  <path d="M 20 20 L 80 80 M 80 20 L 20 80" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
                </svg>
              )}
              {cell === 'O' && (
                <svg viewBox="0 0 100 100" className="icon-o">
                  <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="12" fill="none" />
                </svg>
              )}
            </div>
          ))}
        </div>

        <button className="tictactoe-reset" onClick={resetGame}>
          Chơi lại
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
