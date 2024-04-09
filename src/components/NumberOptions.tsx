interface NumberOptionsProps {
    selectedButtonOption: ButtonOptions
    updateButtonOption: (numOption: ButtonOptions) => void
}

function NumberOptions({
    updateButtonOption,
    selectedButtonOption,
}: NumberOptionsProps) {
    return (
        <section className={'m-4 flex w-full justify-center'}>
            {Array.from({ length: 9 }, (_, i) => {
                const bgColor =
                    selectedButtonOption === i + 1 ? 'bg-slate-200' : ''
                return (
                    <button
                        key={i}
                        onClick={() =>
                            updateButtonOption((i + 1) as ButtonOptions)
                        }
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
