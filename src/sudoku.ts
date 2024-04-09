import Board from './components/Board.tsx'

class SudokuSolver {
    private rows: Set<number>[] = Array.from({ length: 9 }, () => new Set())
    private cols: Set<number>[] = Array.from({ length: 9 }, () => new Set())
    private grids: Set<number>[] = Array.from({ length: 9 }, () => new Set())
    private interimBoard: Board<number> = Array.from({ length: 9 }, () =>
        Array(9).fill(0),
    ) as Board<number>
    private isSolved: boolean = false

    constructor(public board: Board<number>) {
        this.update(board)
    }

    update(board: Board<number>) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = board[i][j]
                if (cell === 0) continue
                this.interimBoard[i][j] = cell
                const grid = Math.floor(i / 3) * 3 + Math.floor(j / 3)
                this.rows[i].add(cell)
                this.cols[j].add(cell)
                this.grids[grid].add(cell)
            }
        }
    }

    checkIfValid(row: number, col: number, num: number): boolean {
        const grid = Math.floor(row / 3) * 3 + Math.floor(col / 3)
        return (
            !this.rows[row].has(num) &&
            !this.cols[col].has(num) &&
            !this.grids[grid].has(num)
        )
    }

    findEmptyCell(): [number, number] {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.interimBoard[i][j] === 0) return [i, j]
            }
        }
        return [-1, -1]
    }

    solve(): Board<number> {
        const [row, col] = this.findEmptyCell()
        if (row === -1) {
            this.isSolved = true
            return this.interimBoard
        }
        for (let num = 1; num <= 9; num++) {
            if (this.checkIfValid(row, col, num)) {
                const gridIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3)

                this.interimBoard[row][col] = num
                this.rows[row].add(num)
                this.cols[col].add(num)
                this.grids[gridIndex].add(num)

                this.solve()
                if (this.isSolved) return this.interimBoard

                this.interimBoard[row][col] = 0
                this.rows[row].delete(num)
                this.cols[col].delete(num)
                this.grids[gridIndex].delete(num)
            }
        }
        return this.interimBoard
    }

    static isBoardValid(gameBoard: Board<number>): boolean {
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
}

export default SudokuSolver

export const defaultBoard: Board<number> = [
    [0, 4, 8, 0, 0, 0, 7, 9, 0],
    [0, 3, 0, 0, 7, 0, 0, 0, 0],
    [0, 5, 0, 9, 0, 6, 2, 0, 0],
    [0, 9, 0, 0, 0, 3, 0, 0, 1],
    [0, 0, 6, 0, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 8, 6],
    [5, 0, 0, 0, 0, 8, 0, 0, 0],
    [0, 0, 0, 0, 2, 7, 0, 0, 3],
    [0, 2, 0, 1, 0, 5, 0, 7, 0],
]
