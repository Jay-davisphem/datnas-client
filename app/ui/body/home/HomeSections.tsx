import Button from "../../Button"
import Image from "next/image"
import { openSans } from "../../fonts"
import WhyChooseUsItem, { IWhyChooseUsItem } from "./WhyChooseUsItem"
import AboutUsItem, { IAboutUsItem } from "./AboutUsItem"
// import { Swiper, SwiperSlide } from 'swiper/react';

export function HomeSection1() {
  return (
    <div className="mt-4 p-6 md:p-16 lg:p-32 flex flex-col items-center  md:flex-row md:justify-between gap-18 md:gap-0">
          <div className="md:w-[45%] flex flex-col text-white text-center md:text-start gap-8 md:items-start mx-auto">
            <h1 className="md:transform md:scale-y-110 text-3xl lg:text-6xl font-black">Tutoring Platform for Nursing and Allied Health Students</h1>
            <p className="text-sm lg:text-2xl">Unlock limitless learning with our educational platform. Explore, discover, and achieve your goals with personalized learning experiences tailored just for you.</p>
            <div className="flex justify-center gap-8 md:gap-16">
              <Button className="text-sm font-bold md:px-8 lg:px-16 lg:text-xl px-6 md:py-4" variant="accent">Learn More</Button>
              <Button className="text-sm font-bold md:px-8 lg:px-16 lg:text-xl px-6 md:py-4" variant="secondary">Sign up</Button>
            </div>
          </div>
          <div className="md:w-[45%] relative md:self-center mx-auto">
            <Image className="w-full h-full object-cover" src='/stethoscope.svg' priority width={200} height={200} alt="students+stethoscope"/>
            <Image className="absolute w-full h-full top-[-5%] left-0 object-cover" src='/students.svg' priority width={200} height={200} alt="students+stethoscope"/>
          </div>
    </div>
  )
}


export function HomeSection2() {
  return (
    <div className="p-6 md:p-16 lg:p-32 flex flex-col md:justify-between bg-white gap-8 md:flex-row-reverse">
          <div className="flex flex-col gap-4 text-center items-center lg:text-start lg:items-start md:w-1/2 self-center lg:gap-8">
            <h1 className="font-black text-3xl lg:text-6xl">Personalised professional online tutor on your schedule</h1>
            <p className={`text-sm lg:text-xl ${openSans.className}`}>Lorem ipsum dolor sit amet consectetur. Vel quis velit integer massa eget nibh viverra. Consequat dictum aliquam aliquam pellentesque morbi habitant. Molestie ipsum sed pharetra faucibus ac ac penatibus feugiat. Facilisis eget nunc pellentesque vitae.</p>
            <div className="lg:hidden">
              <Button className="text-sm w-fit border px-16 rounded-lg" variant="primary">Learn more</Button>
            </div>
            <div className="hidden lg:block">
              <Button className="text-lg font-bold w-fit border px-30 py-4 rounded-lg" variant="accent">Learn more</Button>
            </div>
          </div>
          <div className="flex justify-between h-96 md:w-[40%] lg:h-164">
            <Image className="w-[48%] self-start" src='/work3.svg' alt="working students" width={200} height={200} priority/>
            <Image className="w-[48%] self-end" src='/work2.svg' alt="working students" width={200} height={200} priority/>
          </div>
      </div>
  )
}


export function HomeSection3() {
  return (
    <div className="p-6 md:p-16 lg:p-32 flex flex-col items-center md:flex-row md:justify-between gap-8">
          <div className="md:w-[45%] flex flex-col text-white text-center md:text-start gap-8 md:items-start mx-auto">
            <h1 className="md:transform md:scale-y-110 text-3xl lg:text-6xl font-black">All in one platform for your learning need</h1>
            <p className={`text-sm lg:text-2xl ${openSans.className}`}>This platform aims to empower nursing students by providing comprehensive resources, engaging modules, and practical insights.</p>
            <div className="flex justify-center gap-8 md:gap-16">
              <Button className="text-sm font-bold md:px-8 lg:px-16 lg:text-xl px-6 md:py-4" variant="secondary">Sign up</Button>
            </div>
          </div>
          <div className="md:w-[45%] relative md:self-center mx-auto">
              <Image className="w-[95%] md:w-full md:h-full object-cover top-6 left-5 absolute lg:top-15 lg:left-10 opacity-30" src='/reading.svg' priority width={200} height={200} alt="shadow reading students"/>
              <Image className="w-[95%] md:w-full md:h-full object-cover" src='/reading.svg' priority width={200} height={200} alt="reading students"/>
          </div>
      </div>
  )
}

export function AdsSection() {
  return (
    <div className="p-6 md:p-16 lg:p-32 flex flex-col items-center md:flex-row md:justify-between bg-white mb-2 lg:mb-3">
    Ads
    </div>
  )
}

export function WhyChooseUs() {
  const items: IWhyChooseUsItem[] = [
    {title: 'Leading provider', content: 'Our vision is to set the standard as the foremost choice in online tutoring services, distinguished by our commitment to excellence, innovation, and unparalleled service delivery.'}, 
    {title: 'Innovative and Transformative Services', content: 'We pioneer a new era in online tutoring, leveraging innovative technologies and transformative approaches to enrich the learning journey of nursing and allied health students worldwide.'},
    {title: 'Compassionate, Competent, Teaching', content: 'Our vision is to set the standard as the foremost choice in online tutoring services, distinguished by our commitment to excellence, innovation, and unparalleled service delivery.'},
    {title: 'Fullest Potential', content: 'We inspire and support students in reaching their fullest potential, fostering a culture of growth, resilience, and achievement in every aspect of their academic and professional development.'},
  ]
  return (
    <div className="p-6 md:p-16 lg:p-32 flex flex-col items-center justify-center bg-white mb-2 lg:mb-3 gap-16">
        <div className="flex flex-col items-center text-center gap-4 md:gap-6">
          <h2 className="text-2xl md:text-4xl font-black text-[#001A50]">Why Choose Us?</h2>
          <p className={`md:w-2/3 ${openSans.className} text-xs md:text-lg`}>Lorem ipsum dolor sit amet consectetur. Vel quis velit integer massa eget nibh viverra. Consequat dictum aliquam aliquam pellentesque morbi habitant.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {items.map(({title, content}) => <WhyChooseUsItem key={title} title={title} content={content}/>)}
        </div>
    </div>
  )
}

export function SayingsAboutUs() {
  const items: IAboutUsItem[] = [
    {name: 'Henry Wilson', profession: 'Medicine and Surgery Student', school: 'Cambridge University', comment: '“Lorem ipsum dolor sit amet consectetur. Diam amet pulvinar fermentum aliquam diam lacinia aliquam urna. Consectetur proin vehicula et velit fringilla aenean nullam eget. Ut faucibus aenean “'}, 
    {name: 'Benson Anderson', profession: 'Medicine and Surgery Student', school: 'Cambridge University', comment: '“Lorem ipsum dolor sit amet consectetur. Diam amet pulvinar fermentum aliquam diam lacinia aliquam urna. Consectetur proin vehicula et velit fringilla aenean nullam eget. Ut faucibus aenean “'},
  ]
  return (
    <div className="p-6 md:p-16 lg:p-32 flex flex-col items-center justify-center bg-white mb-2 lg:mb-3 gap-16">
        <div className="flex flex-col items-center text-center gap-4 md:gap-6">
          <h2 className="text-2xl  md:text-4xl font-black text-[#001A50]">What people are saying about us</h2>
          <p className={`md:w-2/3 ${openSans.className} text-xs md:text-lg`}>Lorem ipsum dolor sit amet consectetur. Vel quis velit integer massa eget nibh viverra. Consequat dictum aliquam aliquam pellentesque morbi habitant.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {items.map((props) => <AboutUsItem key={props.name} {...props}/>)}
        </div>
    </div>
  )
}