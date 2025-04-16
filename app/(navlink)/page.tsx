import CourseCategories from "../ui/body/home/CourseCategories";
import {
  AdsSection,
  HomeSection1,
  HomeSection2,
  HomeSection3,
  SayingsAboutUs,
  WhyChooseUs,
} from "../ui/body/home/HomeSections";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HomeSection1 />
      <HomeSection2 />
      <HomeSection3 />
      <div className="p-6 md:p-16 lg:p-32 text-white">
        <CourseCategories />
      </div>
      <AdsSection />
      <WhyChooseUs />
      <SayingsAboutUs />
    </main>
  );
}
