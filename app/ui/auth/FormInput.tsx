'use client';
import { useState, Fragment } from 'react';
import { Label, Listbox, Transition, ListboxButton, ListboxOption, ListboxOptions, Field } from "@headlessui/react";
import { openSans } from "../fonts";
import { FaChevronDown } from "react-icons/fa6";
import { BiCheck } from 'react-icons/bi';

export interface IFormInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  validate?: (value: string) => string | undefined;
  options?: string[]; // Add options for dropdown
}

export default function FormInput({ label, error, validate, options, ...props }: IFormInput) {
  const [validationError, setValidationError] = useState<string | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // For dropdown

  const isDropdown = !!options && options.length > 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validate) {
      const errorMsg = validate(value);
      setValidationError(errorMsg);
    } else {
      setValidationError(undefined);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };

  if (isDropdown) {
    return (
      <Field>
        <div className="flex relative">
            <Label className="min-w-fit border-b border-[#BDBDBD] block py-0  text-[8px] md:text-sm font-semibold">
                {label}:
            </Label>
            <div 
            className={`${openSans.className} appearance-none border-b pl-2 border-[#BDBDBD] w-full pb-2  text-xs md:text-base leading-tight focus:outline-none focus:shadow-outline align-bottom`}
            
            >

            <Listbox value={selectedOption} onChange={setSelectedOption}
            >
            <div className="relative">
                <ListboxButton className="relative w-full cursor-default bg-white text-left focus:outline-none  sm:text-sm">
                <span className="block truncate">{selectedOption || "Select an option"}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <FaChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
                </ListboxButton>
                <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-[#001A50] ring-opacity-5 focus:outline-none sm:text-sm">
                    {options.map((option) => (
                    <ListboxOption
                        key={option}
                        className={({ active }) =>
                        `relative text-[001A50] cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-[#001A5033]' : ''
                        }`
                        }
                        value={option}
                    >
                        {({ selected }) => (
                        <>
                            <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                            {option}
                            </span>
                            {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                <BiCheck />
                            </span>
                            ) : null}
                        </>
                        )}
                    </ListboxOption>
                    ))}
                </ListboxOptions>
                </Transition>
            </div>
            </Listbox>
            </div>
            {validationError && <p className="text-red-500 text-xs mt-1">{validationError}</p>}
            {error && !validationError && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
      </Field>
    );
  }

  return (
    <Field>
      <div className="flex relative">
        <Label className="min-w-fit border-b border-[#BDBDBD] block py-0 text-[8px] md:text-sm font-semibold">
          {label}:
        </Label>
        <input
          className={`focus:autofill:bg-[001A5033] ${openSans.className} appearance-none border-b border-[#BDBDBD] w-full pl-2 md:pl-3 pb-2  text-xs md:text-base leading-tight focus:outline-none focus:shadow-outline align-bottom`}
          placeholder={props.placeholder}
          type={props.type}
          {...props}
          onChange={handleInputChange}
        />
        
      </div>
      {validationError && <p className="text-red-500 text-xs mt-1">{validationError}</p>}
      {error && !validationError && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </Field>
  );
}