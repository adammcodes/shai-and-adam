interface CheckboxProps {
  label: string;
  value: boolean | undefined;
  onChange: (value: boolean | undefined) => void;
  id: string;
  name: string;
}

export default function RadioSelect({
  label,
  onChange,
  id,
  name,
}: CheckboxProps) {
  // render radio buttons for Yes and No with labels
  return (
    <label htmlFor="name" className="text-lg mb-5 ">
      {label}
      <br />
      <input
        type="radio"
        name={name}
        id={`yes-${id}`}
        className="border-2 border-[#d9f99d] rounded-md p-2 m-2"
        onChange={(e) => onChange(e.target.checked)}
      />
      Yes
      <br />
      <input
        type="radio"
        name={name}
        id={`no-${id}`}
        className="border-2 border-[#d9f99d] rounded-md p-2 m-2"
        onChange={(e) => onChange(e.target.checked)}
      />
      No
    </label>
  );
}
