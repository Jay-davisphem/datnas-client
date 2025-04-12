import { Button } from "@headlessui/react";

export default function SubmitBtn({ text = "Submit", pending = true }) {
  const co1 = "bg-[#001A50] text-white";
  const coh1 = "hover:opacity-80 focus:opacity-80";
  return (
    <Button
      type="submit"
      disabled={pending}
      className={`${pending ? "cursor-wait" : "cursor-pointer"} disabled:bg-gray-500 disabled:opacity-100 rounded-lg text-sm flex justify-center ${co1 + " " + coh1} py-5 w-full h-auto`}
      // onClick={async (e) => {
      //   const res = await getAccessToken({email: 'datnas@datnas.org', password: 'DatnasTimeless'});

      // }}
    >
      {text}
    </Button>
  );
}
