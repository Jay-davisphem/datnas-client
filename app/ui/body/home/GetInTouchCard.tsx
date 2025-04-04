import { IconType } from "react-icons"
import { openSans } from "../../fonts"

export type IGetInTouchCard = {
    h: string,
    s: string,
    Icon: IconType,
    color: string
}
export default function GetInTouchCard({h, s, Icon, color}: IGetInTouchCard) {
  return (
    <div className="p-2 md:p-4 flex gap-1 w-[48%]  flex-wrap justify-start items-center md:w-full md:bg-white rounded-xl bg-[#E8E8E8] md:rounded-2xl">
        <span className='rounded-full p-1.5 lg:p-3' style={
            {
                background: color + '33'
            }
        }>
            <Icon className="w-3.5 h-3.5 lg:w-5 lg:h-5" style={{
                color: color
            }}/>
        </span>
        <span className="flex flex-col gap-1">
            <p className="md:text-lg text-[10px] font-bold">{h}</p>
            <p className={`md:text-base text-[8px] ${openSans.className}`}>{s}</p>
        </span>
    </div>
  )
}
