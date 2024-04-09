import { useEffect, useMemo, useState } from 'react'
import Board from './components/Board.tsx'
import NumberOptions from './components/NumberOptions.tsx'
import UtilButtons from './components/UtilButtons.tsx'

import SudokuSolver, { defaultBoard } from './sudoku.ts'

function App(): JSX.Element {
    const [gameStatus, setGameStatus] = useState<GameStatus>('waiting')
    const [board, setBoard] = useState<Board<number>>(defaultBoard)
    const [boardCellColors, setBoardCellColors] = useState<Board<CellColor>>(
        Array.from({ length: 9 }, () =>
            Array(9).fill(CellColor.RED),
        ) as Board<CellColor>,
    )
    const [selectedButtonOption, setSelectedButtonOption] =
        useState<ButtonOptions>(0 as ButtonOptions)
    const [cellColor, setCellColor] = useState<CellColor>(CellColor.SLATE)
    const sudokuSolver = useMemo(() => new SudokuSolver(board), [])

    useEffect(() => {
        const newBoardColor = [...boardCellColors]
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] !== 0) {
                    newBoardColor[i][j] = CellColor.SLATE
                }
            }
        }
    }, [])

    function updateBoard(row: number, col: number): void {
        const newBoard: Board<number> = [...board]
        newBoard[row][col] =
            selectedButtonOption === 'eraser' ? 0 : selectedButtonOption
        setBoard(newBoard)

        const newBoardCellColors: Board<CellColor> = [...boardCellColors]
        newBoardCellColors[row][col] = cellColor
        setBoardCellColors(newBoardCellColors)
    }

    function startGame(): void {
        if (!SudokuSolver.isBoardValid(board)) {
            alert('Invalid board')
            return
        }
        setGameStatus('in-progress')
        setCellColor(CellColor.BLUE)
    }

    function resetGame(): void {
        setGameStatus('waiting')
        setCellColor(CellColor.SLATE)
        setBoard(
            Array.from({ length: 9 }, () => Array(9).fill(0)) as Board<number>,
        )
        setBoardCellColors(
            Array.from({ length: 9 }, () =>
                Array(9).fill(CellColor.RED),
            ) as Board<CellColor>,
        )
    }

    function solveGame(): void {
        if (!SudokuSolver.isBoardValid(board)) {
            alert('Invalid board')
            return
        }
        sudokuSolver.update(board)
        const solution: Board<number> = sudokuSolver.solve()
        setBoard(solution)
        setGameStatus('won')
    }

    return (
        <main className={'container flex flex-col items-center'}>
            <h1 className={'m-10 text-center text-3xl text-slate-500'}>
                Sudoku Solver
            </h1>
            <Board
                board={board}
                updateBoard={updateBoard}
                cellSize={10}
                boardCellColors={boardCellColors}
            />

            <NumberOptions
                updateButtonOption={setSelectedButtonOption}
                selectedButtonOption={selectedButtonOption}
            />

            <UtilButtons
                updateButtonOption={setSelectedButtonOption}
                selectedButtonOption={selectedButtonOption}
                startGame={startGame}
                resetGame={resetGame}
                solveGame={solveGame}
                gameStatus={gameStatus}
            />
        </main>
    )
}

export default App
