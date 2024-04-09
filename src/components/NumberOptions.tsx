interface NumberOptionsProps {
    selectedNumber: number
    updateSelectedNumber: (number: number) => void
}

function NumberOptions({
    updateSelectedNumber,
    selectedNumber,
}: NumberOptionsProps) {
    return (
        <section className={'m-6'}>
            {Array.from({ length: 9 }, (_, i) => {
                const bgColor = selectedNumber === i + 1 ? 'bg-slate-200' : ''
                return (
                    <button
                        key={i}
                        onClick={() => updateSelectedNumber(i + 1)}
                        className={`m-1 h-14 w-14 rounded-md border border-slate-300 p-2 text-center text-slate-500 ${bgColor}`}
                    >
                        {i + 1}
                    </button>
                )
            })}
        </section>
    )
}

export default NumberOptions
