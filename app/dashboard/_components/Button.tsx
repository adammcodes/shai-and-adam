interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
}

export default function Button({ text, onClick, disabled }: ButtonProps) {
  const disabledClasses = disabled ? `opacity-50 cursor-not-allowed` : ``;
  const activeClasses = !disabled
    ? `hover:bg-blue-dark hover:text-white cursor-pointer`
    : ``;
  const commonClasses = `border-2 border-black font-bold text-blue bg-white-500 py-2 px-4 my-[5px] rounded-lg`;
  return (
    <button
      className={`${commonClasses} ${activeClasses} ${disabledClasses}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
