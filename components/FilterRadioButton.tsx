// A single Filter Radio Button component that contains a radio button and a label.

import { MapFilter } from "@/app/grenada/_helpers/mapFilters";
import React from "react";

type MapFilterProps = MapFilter & {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const FilterRadioButton: React.FC<MapFilterProps> = ({ id, label, selected, setSelected }) => {
  const isSelected = selected === id;
  const selectedStyles = `text-white bg-[#002F6C] shadow-lg ring-2 ring-[#002F6C] ring-offset-2`;
  const defaultStyles = "text-[#002F6C] bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#002F6C]";
  return (
    <div className="flex flex-row m-2 justify-center items-center">
      <input
        type="radio"
        name="filter"
        id={id}
        className="invisible absolute"
        checked={isSelected}
        onChange={e => {
          setSelected(e.target.id);
        }}
      />
      <label
        htmlFor={id}
        className={`${
          isSelected ? selectedStyles : defaultStyles
        } rounded-full px-6 py-3 cursor-pointer transition-all duration-200 text-base font-medium`}
      >
        {label}
      </label>
    </div>
  );
};

export default FilterRadioButton;
