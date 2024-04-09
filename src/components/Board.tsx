interface BoardProps {
    board: Board<number>
    cellSize: number
    boardCellColors: Board<string>

    updateBoard(row: number, col: number): void
}

function Board({
    board,
    boardCellColors,
    updateBoard,
    cellSize = 20,
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
                                className={`h-10 w-${cellSize} rounded-md border border-slate-300 p-2 text-center ${boardCellColors[i][j]} `}
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
