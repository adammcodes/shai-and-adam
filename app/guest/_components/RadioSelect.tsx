"use client";

interface CheckboxProps {
  label: string;
  value: boolean | undefined;
  onChange: (value: boolean) => void;
  id: string;
  name: string;
}

export default function RadioSelect({
  label,
  onChange,
  id,
  name,
}: // value,
CheckboxProps) {
  // render radio buttons for Yes and No with labels

  const handleYes = () => {
    // set state to true
    onChange(true);
  };

  const handleNo = () => {
    // set state to false
    onChange(false);
  };

  return (
    <label htmlFor={id} className="text-lg mb-5 ">
      {label}
      <br />
      <label htmlFor={`yes-${id}`}>
        <input
          type="radio"
          name={name}
          id={`yes-${id}`}
          // checked={value === true}
          className="border-2 border-[#d9f99d] rounded-md p-2 m-2"
          onChange={handleYes}
        />
        Yes, I will be attending
      </label>
      <br />
      <label htmlFor={`no-${id}`}>
        <input
          type="radio"
          name={name}
          id={`no-${id}`}
          // checked={value === false}
          className="border-2 border-[#d9f99d] rounded-md p-2 m-2"
          onChange={handleNo}
        />
        No, I don't like joy or happiness
      </label>
    </label>
  );
}
