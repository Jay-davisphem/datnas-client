import Image from "next/image";
import SubCard, { ISubCard } from "./_subscribe";

export default function Subscribe() {
  const items: ISubCard[] = [
    {
      color: "white",
      type: "Month",
      time: 1,
      price: 50,
      name: "Basic",
      head: "Access all in-depth courses, workshops, and mobile apps.",
      textpoints: [
        "Ability to interact and use direct question",
        "Ability to learn at your own pace",
        "Ability to track your progress",
        "Ability to check your learning through post-tutorial assessment for grading",
      ],
    },
    {
      color: "#004CE8",
      type: "Month",
      time: 3,
      price: 120,
      name: "Advanced",
      head: "Access all in-depth courses, workshops, and mobile apps.",
      textpoints: [
        "Ability to interact and use direct question",
        "Ability to learn at your own pace",
        "Ability to track your progress",
        "Ability to check your learning through post-tutorial assessment for grading",
      ],
    },
    {
      color: "white",
      type: "Month",
      time: 6,
      price: 225,
      name: "Standard",
      head: "Access all in-depth courses, workshops, and mobile apps.",
      textpoints: [
        "Ability to interact and use direct question",
        "Ability to learn at your own pace",
        "Ability to track your progress",
        "Ability to check your learning through post-tutorial assessment for grading",
      ],
    },
    {
      color: "white",
      type: "Year",
      time: 1,
      price: 500,
      name: "Premium",
      head: "Access all in-depth courses, workshops, and mobile apps.",
      textpoints: [
        "Ability to interact and use direct question",
        "Ability to learn at your own pace",
        "Ability to track your progress",
        "Ability to check your learning through post-tutorial assessment for grading",
      ],
    },
    {
      color: "#004CE8",
      type: "Hour",
      time: 1,
      price: 50,
      name: "Basic",
      head: "Access all in-depth courses, workshops, and mobile apps.",
      textpoints: [
        "Ability to interact and use direct question",
        "Ability to learn at your own pace",
        "Ability to track your progress",
        "Ability to check your learning through post-tutorial assessment for grading",
      ],
    },
  ];
  return (
    <div>
      <div className="relative w-full flex flex-col items-center text-center p-6 md:p-16 lg:p-32 pb-40 lg:pb-64 pt-30 md:pt-100 lg:pt-90">
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-80">
          <Image
            src="/subs-lg.jpeg"
            alt="Sybscription Image"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className="flex flex-col gap-4 md:gap-8 text-white justify-start self-start w-full">
          <h1 className="text-left font-black max-[360px]:text-3xl text-[33px] md:text-7xl w-full">
            Subscription Page
          </h1>
          <div className="bg-[#001A5099] p-4 md:p-7 rounded-md lg:p-10 w-9/10 md:w-7/10 lg:w-49/100">
            <p className="w-full  rounded text-left font-black text-xl/relaxed md:text-4xl/relaxed lg:text-[40px]/relaxed">
              Simple, Transparent Pricing
            </p>
            <p className="w-full  rounded text-left text-[9px]/relaxed md:text-[11px]/relaxed lg:text-base/relaxed">
              Simple, Transparent Pricing
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#EEEEEE] w-full flex flex-col items-center text-center p-6 md:p-16 lg:p-32 pb-40 lg:pb-64">
        <div className="md:-mt-30 lg:-mt-70 flex flex-col md:flex-row gap-8 text-white w-full items-center md:justify-between z-90 flex-wrap">
          {items.map((item, index) => (
            <SubCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
