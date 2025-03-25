import Image from "next/image";
import Button from "../ui/Button";
import { openSans } from "../ui/fonts";
import CourseCategories from "../ui/body/home/CourseCategories";
import { AdsSection, HomeSection1, HomeSection2, HomeSection3, SayingsAboutUs, WhyChooseUs } from "../ui/body/home/HomeSections";

export default function Home() {
  return (
      <main className="flex flex-col">
        <HomeSection1 />
        <HomeSection2 />
        <HomeSection3 />
        <CourseCategories />
        <AdsSection />
        <WhyChooseUs />
        <SayingsAboutUs />
      </main>
  );
}
