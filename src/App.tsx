import { useState } from 'react'
import Board from './components/Board.tsx'
import NumberOptions from './components/NumberOptions.tsx'
import UtilButtons from './components/UtilButtons.tsx'

function App(): JSX.Element {
    const [gameStatus, setGameStatus] = useState<GameStatus>('waiting')
    const [board, setBoard] = useState<Board<number>>(
        Array.from({ length: 9 }, () => Array(9).fill(0)) as Board<number>,
    )
    const [boardCellColors, setBoardCellColors] = useState<Board<CellColor>>(
        Array.from({ length: 9 }, () =>
            Array(9).fill('text-red-400'),
        ) as Board<CellColor>,
    )
    const [selectedButtonOption, setSelectedButtonOption] =
        useState<ButtonOptions>(0 as ButtonOptions)
    const [cellColor, setCellColor] = useState<CellColor>('text-slate-500')

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
        if (!isBoardValid(board)) {
            alert('Invalid board')
            return
        }
        setGameStatus('in-progress')
        setCellColor('text-blue-400')
    }

    function resetGame(): void {
        setGameStatus('waiting')
        setCellColor('text-slate-500')
        setBoard(
            Array.from({ length: 9 }, () => Array(9).fill(0)) as Board<number>,
        )
        setBoardCellColors(
            Array.from({ length: 9 }, () =>
                Array(9).fill('text-red-400'),
            ) as Board<CellColor>,
        )
    }

    function solveGame(): void {
        if (!isBoardValid(board)) {
            alert('Invalid board')
            return
        }
        const solution = solveSudoku(board)
        setBoard(solution)
        setGameStatus('won')
    }

    function isBoardValid(gameBoard: Board<number>): boolean {
        const rows: Set<number>[] = Array.from({ length: 9 }, () => new Set())
        const cols: Set<number>[] = Array.from({ length: 9 }, () => new Set())
        const grids: Set<number>[] = Array.from({ length: 9 }, () => new Set())
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const cell = gameBoard[r][c]
                if (cell === 0) continue
                const grid = Math.floor(r / 3) * 3 + Math.floor(c / 3)
                if (
                    rows[r].has(cell) ||
                    cols[c].has(cell) ||
                    grids[grid].has(cell)
                ) {
                    return false
                }
                rows[r].add(cell)
                cols[c].add(cell)
                grids[grid].add(cell)
            }
        }
        return true
    }

    function solveSudoku(gameBoard: Board<number>): Board<number> {
        return gameBoard
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
