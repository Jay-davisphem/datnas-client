import Image from "next/image"
import ScaleUpParagraph from "../../AnimatedP"

export type IMission = {
    src: string,
    title: string,
    content: string
}
export default function MissionCard({src, title, content}: IMission){
    return <div className="flex flex-col rounded shadow-md w-full md:w-2/5 lg:w-3/10 hover:shadow-lg" >
        <Image src={src} alt={title} width={200} height={100} className="rounded-t w-full h-40 md:h-50 lg:h-60"/>
        <h3 className="md:pt-4 px-2 md:px-4 pt-2 font-bold text-lg md:text-xl text-[#001A50] w-full">{title}</h3>
        <ScaleUpParagraph className='pt-2 md:pb-4 pb-2 md:px-4 px-2 text-xs md:text-sm leading-6'>
            {content}
        </ScaleUpParagraph>
    </div>
}