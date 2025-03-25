import { Button, Input } from "@headlessui/react";

export default function NewslettterSub() {
  return (
    <div className="w-full flex flex-col md:flex-col-reverse gap-4 md:gap-2">
        <p className="text-sm  font-medium">You don’t want to miss important updates about the Health field, Subscribe to our Newsletter now.</p>
        <div className="w-full flex gap-4 text-base">
            <Input className='p-2 w-3/5 h-10 rounded bg-white placeholder:text-[#505050] focus:outline-none data-[focus]:shadow data-[focus]:shadow-white' name="subscriberEmail" placeholder="Enter your email"/>
            <Button className='w-2/5  bg-[#004CE8] rounded hover:opacity-80'>Subscribe</Button>
        </div>
    </div>
  )
}
