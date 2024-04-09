enum CellColor {
    SLATE = 'text-slate-500',
    RED = 'text-red-400',
    BLUE = 'text-blue-400',
}

type Board<T> = [
    [T, T, T, T, T, T, T, T, T],
    [T, T, T, T, T, T, T, T, T],
    [T, T, T, T, T, T, T, T, T],
    [T, T, T, T, T, T, T, T, T],
    [T, T, T, T, T, T, T, T, T],
    [T, T, T, T, T, T, T, T, T],
    [T, T, T, T, T, T, T, T, T],
    [T, T, T, T, T, T, T, T, T],
    [T, T, T, T, T, T, T, T, T],
]

type ButtonOptions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'eraser'

type GameStatus = 'in-progress' | 'won' | 'lost' | 'waiting'
