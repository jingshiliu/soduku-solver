import { CellColor } from '../enums.ts'

interface BoardProps {
    board: Board<number>
    cellSize: number
    boardCellColors: Board<CellColor>

    updateBoard(row: number, col: number): void
}

function Board({
    board,
    boardCellColors,
    updateBoard,
}: BoardProps): JSX.Element {
    return (
        <section>
            <div className={'grid w-fit grid-cols-9 gap-1'}>
                {board.map((row, i) =>
                    row.map((cell, j) => {
                        return (
                            <button
                                key={`${i}-${j}-${boardCellColors[i][j]}`}
                                onClick={() => updateBoard(i, j)}
                                className={`h-10 w-10 rounded-md border border-slate-300 p-2 text-center max-sm:w-8 ${boardCellColors[i][j]} `}
                            >
                                {cell === 0 ? '' : cell}
                            </button>
                        )
                    }),
                )}
            </div>
        </section>
    )
}

export default Board
