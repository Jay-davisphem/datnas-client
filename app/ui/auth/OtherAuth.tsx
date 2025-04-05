import { SiFacebook } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";

export default function OtherAuth({ status = 'up' }: { status?: 'in' | 'up' }) {
  return (
    <div className="flex justify-between text-xs md:text-sm"> 
      <span className="flex cursor-pointer w-1/2 items-center gap-2 border-r border-[#001A50] pr-4">
        <FcGoogle size={20}/>
        <p className="min-w-fit">Sign {status} with Google</p>
      </span>
      <span className="flex cursor-pointer w-1/2 items-center gap-2 justify-end"> 
        <SiFacebook className="text-[#004CE8]"size={20}/>
        <p className="min-w-fit">Sign {status} with Facebook</p> 
      </span>
    </div>
  );
}