import Image from "next/image"
import Faq, { IFAQ, faqs } from "./_faq"

export default function FAQ() {
  return (
    <div>
      <div className="relative w-full flex flex-col items-center text-center p-6 md:p-16 lg:p-32 pb-40 lg:pb-64">
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-25">
            <Image
              src="/faq-top.jpeg" 
              alt="Faq Image"
              layout="fill" 
              objectFit="cover"
              priority
              />
          </div>
          <div className="flex flex-col md:flex-row gap-8 text-white justify-between items-center">
            <h1 className="text-left font-black text-4xl md:text-6xl lg:text-7xl  md:w-16/40">Frequently Asked Question</h1>
            <div className="bg-[#004CE8] rounded px-4 py-8 text-left md:w-16/40 font-medium text-base md:text-xl lg:text-2xl leading-9">Frequently asked questions related to nursing education, career paths, and practical tips. .🌟📚 Learn more about our platforms and how you can leverage our platform to advance in your career</div>
          </div>
      </div>
      <div className="bg-white w-full flex flex-col items-center text-center p-6 md:p-16 lg:p-32 pb-40 lg:pb-64">
        <div className="bg-white md:-mt-30 lg:-mt-70 md:rounded md:border md:border-gray-200 md:shadow-lg flex flex-col gap-8 text-white w-full md:px-20 py-8 z-90">
            {
              faqs.map((faq, index) => <Faq key={index} {...faq} />)
            }
        </div>
    </div>
    </div>
  )
}

    
    