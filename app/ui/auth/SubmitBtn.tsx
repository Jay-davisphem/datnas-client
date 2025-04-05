import { Button } from "@headlessui/react";

export default function SubmitBtn({text = 'Submit'}) {
    const co1 = 'bg-[#001A50] text-white';
    const coh1 = 'hover:opacity-80 focus:opacity-80';
    const co2 = 'text-[#001A50] bg-white border border-[#001A50]';
    const coh2 = 'hover:shadow-md hover:bg-[#001A5033] focus:shadow';
    return (
    <Button type="submit" 
        className={`cursor-pointer rounded-lg text-sm flex justify-center ${co1 + ' ' + coh1} py-5 w-full h-auto`} 
    >
        {text}
    </Button>
  )
}
