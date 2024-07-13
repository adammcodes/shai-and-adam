// A single Filter Radio Button component that contains a radio button and a label.

import { MapFilter } from "@/app/grenada/_helpers/mapFilters";
import React from "react";

type MapFilterProps = MapFilter & {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const FilterRadioButton: React.FC<MapFilterProps> = ({ id, label, selected, setSelected }) => {
  const isSelected = selected === id;
  const selectedStyles = `text-white bg-gradient-to-tl from-blue-500 to-cyan-500 focus:ring-4 focus:outline-none `;
  const defaultStyles = "text-[#002F6C] border border-[#002F6C]";
  return (
    <div className="flex flex-row m-3 justify-center items-center drop-shadow-lg">
      <input
        type="radio"
        name="filter"
        id={id}
        className="invisible"
        checked={isSelected}
        onChange={e => {
          setSelected(e.target.id);
        }}
      />
      <label
        htmlFor={id}
        className={`${
          isSelected ? selectedStyles : defaultStyles
        } rounded-[20px] p-10 cursor-pointer hover:bg-[#002F6C] hover:text-white transition-all`}
      >
        {label}
      </label>
    </div>
  );
};

export default FilterRadioButton;
