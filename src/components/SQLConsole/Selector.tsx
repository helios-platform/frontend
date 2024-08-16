import React from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface SelectorProps {
  options: string[];
  selectedOption: string | null;
  onSelect: (option: string) => void;
  label: string;
}

const Selector: React.FC<SelectorProps> = ({
  options,
  selectedOption,
  onSelect,
  label,
}) => (
  <div>
    <label
      htmlFor={label}
      className="block text-lg font-medium text-custom-light-gray mb-2"
    >
      {label}
    </label>
    <Menu as="div" className="relative inline-block text-left w-full">
      <div>
        <Menu.Button className="inline-flex w-full justify-between items-center rounded-md bg-custom-dark-blue px-4 py-2 text-md font-medium text-custom-light-gray shadow-glow ring-1 ring-inset ring-custom-light-blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {selectedOption || "Select..."}
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5 text-custom-light-blue"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Menu.Items className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-custom-dark-blue shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="px-1 py-1">
          {options.map((option) => (
            <Menu.Item key={option}>
              {({ active }) => (
                <button
                  className={`${
                    active
                      ? "bg-custom-light-purple text-white"
                      : "text-custom-light-gray"
                  } group flex w-full items-center rounded-md px-2 py-2 text-md`}
                  onClick={() => onSelect(option)}
                >
                  {option}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  </div>
);

export default Selector;
