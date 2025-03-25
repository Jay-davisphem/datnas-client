import Image from "next/image";

export type IWhyChooseUsItem = {imgUrl?: string, title: string, content: string};
export default function WhyChooseUsItem({imgUrl = '/academics.svg', title, content}: IWhyChooseUsItem) {
  return (
    <div className="flex flex-col gap-4 items-center text-center shadow-lg p-8 md:py-2 md:px-4  rounded-lg md:w-1/4">
        <Image className="w-32 md:w-30 h-32 md:h-30" src={imgUrl} alt={title} width={30} height={30}/>
        <h2 className="text-sm font-bold w-3/5">{title}</h2>
        <p className="text-xs">{content}</p>
    </div>
  )
}
