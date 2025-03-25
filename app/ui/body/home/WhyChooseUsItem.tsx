import Image from "next/image";

export type IWhyChooseUsItem = { imgUrl?: string; title: string; content: string };

export default function WhyChooseUsItem({ imgUrl = "/academics.svg", title, content }: IWhyChooseUsItem) {
  return (
    <div className="flex flex-col gap-4 items-center text-center shadow-lg p-8 rounded-lg w-full h-full">
      <Image className="w-40 h-40 md:w-35 md:h-35  object-contain" src={imgUrl} alt={title} width={96} height={96} />
      <h2 className="text-base font-bold w-2/3 md:w-full lg:w-2/3">{title}</h2>
      <p className="text-sm text-gray-700">{content}</p>
    </div>
  );
}
