import { Input, InputProps, Textarea } from "@headlessui/react";
import { openSans } from "../../fonts";

export interface ICustomInputProps extends InputProps {
  label: string;
  isTextArea?: boolean;
  onChange?: any
}

export default function CustomInput({
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
  isTextArea,
}: ICustomInputProps) {
  return (
    <div className="flex flex-col gap-2 md:gap-3">
      <label className="block py-0 pl-2 md:pl-3 text-[8px] md:text-sm font-bold">{label}:</label>

      {isTextArea ? (
        <Textarea
          className={`${openSans.className} appearance-none border-b border-[#BDBDBD] w-full pl-2 md:pl-3 pb-2 md:pb-3 text-xs md:text-base leading-tight focus:outline-none focus:shadow-outline align-text-bottom h-20 resize-none`}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      ) : (
        <Input
          className={`${openSans.className} appearance-none border-b border-[#BDBDBD] w-full pl-2 md:pl-3 pb-2 md:pb-3 text-xs md:text-base leading-tight focus:outline-none focus:shadow-outline align-bottom`}
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}