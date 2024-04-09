import { GameStatus } from '../enums.ts'

interface UtilButtonsProps {
    gameStatus: GameStatus
    selectedButtonOption: ButtonOptions
    updateButtonOption: (buttonOption: ButtonOptions) => void
    startGame: () => void
    resetGame: () => void
    solveGame: () => void
}

function UtilButtons({
    selectedButtonOption,
    updateButtonOption,
    startGame,
    resetGame,
    solveGame,
    gameStatus,
}: UtilButtonsProps) {
    const eraserBtnBgColor =
        selectedButtonOption === 'eraser' ? 'bg-slate-200' : ''
    return (
        <section className={'w-fit space-x-2'}>
            <button
                className={`h-20 w-20 rounded-md border border-slate-300 p-2 text-center text-slate-500 ${eraserBtnBgColor}`}
                onClick={() => updateButtonOption('eraser')}
            >
                Eraser
            </button>
            {gameStatus === GameStatus.WAITING ? (
                <button
                    className={`h-20 w-20 rounded-md border border-slate-300 p-2 text-center text-slate-500`}
                    onClick={startGame}
                >
                    Start
                </button>
            ) : (
                <button
                    className={`h-20 w-20 rounded-md border border-slate-300 p-2 text-center text-slate-500`}
                    onClick={resetGame}
                >
                    Reset
                </button>
            )}
            {gameStatus === GameStatus.IN_PROGRESS && (
                <button
                    className={`h-20 w-20 rounded-md border border-slate-300 p-2 text-center text-slate-500`}
                    onClick={solveGame}
                >
                    Solve
                </button>
            )}
        </section>
    )
}

export default UtilButtons
