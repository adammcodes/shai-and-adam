interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  id: string;
  name: string;
}

export default function TextInput({
  label,
  value,
  onChange,
  id,
  name,
}: TextInputProps) {
  return (
    <label htmlFor={id} className="text-lg mb-5">
      {label}:<br />
      <input
        type="text"
        name={name}
        id={id}
        className="border border-[#06b6d4] rounded-md px-2 text-black w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
