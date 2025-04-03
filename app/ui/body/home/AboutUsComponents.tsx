import Image from 'next/image';
import Link from 'next/link';
import  Button  from '@/app/ui/Button'; // Assuming you have a Button component
import { openSans } from '../../fonts';
import ScaleUpParagraph from '../../AnimatedP';
import MissionCard, { IMission } from './MissionCard';
import CourseCategory, { ICourseCategory } from './courses/CourseCategory';
export function AboutUs1() {
  return (
    <div className="relative w-full flex flex-col items-center text-center p-6 md:p-16 lg:p-32 pb-40 lg:pb-64">
      {/* Image Container */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-25">
        <Image 
          src="/hero-page-doc.png" 
          alt="About Us"
          layout="fill" // Important: Makes the image fill the parent container
          objectFit="cover" // Ensures the image covers the area, potentially cropping it
          priority
        />
      </div>

      {/* Content */}
      <div className="text-white flex flex-col items-center gap-8 max-w-4xl brightness-125 drop-shadow-lg">
        <h1 className='text-3xl md:text-6xl font-black'>About Us</h1>
        <ScaleUpParagraph className='text-base md:px-16 lg:px-20'>
          Unlock limitless learning with our educational platform. Explore, discover, and achieve your goals with personalized learning experiences tailored just for you.
        </ScaleUpParagraph>
        <div className="flex gap-4 md:gap-8">
          <Link href='/about-us' className="hover:opacity-80 active:opacity-80">
            <Button className="text-sm font-bold md:px-8 lg:px-16 lg:text-xl px-6 md:py-4" variant="accent">
              Learn More
            </Button>
          </Link>
          <Link href='/sign-up' className="hover:opacity-80 active:opacity-80">
            <Button className="text-sm font-bold md:px-8 lg:px-16 lg:text-xl px-6 md:py-4" variant="secondary">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function AboutUs2() {
  return (
    <div className="mb-2 bg-white w-full flex flex-col-reverse lg:flex-row justify-between items-center px-6 md:px-16 lg:px-32 py-16 md:py-24 gap-16">
      <div className='w-full md:w-2/5'>
        <Image src='/aboutus2.svg' alt='About us 2' width={100} height={100}  className='w-full'/>
         </div>
      <div className='w-full md:w-2/5 flex flex-col gap-2 md:gap-4 lg:gap-6'>
        <h2 className='font-bold text-2xl md:text-3xl lg:text-4xl text-center md:text-left'>Know more about us</h2>
        <ScaleUpParagraph
          className={`${openSans.className} text-justify md:text-left text-sm lg:text-base leading-8`}
        >
          Lorem ipsum dolor sit amet consectetur. Bibendum arcu turpis morbi arcu morbi ut varius. Mi amet enim ac placerat. Nullam magna dis nascetur cras tincidunt gravida nisl. Amet adipiscing sed sagittis eget lectus consectetur. Eget arcu nulla ac cras a lectus maecenas. Condimentum orci et aenean feugiat eget dignissim purus porttitor. Pellentesque cras dolor egestas malesuada. Praesent a duis et aliquet sollicitudin fringilla nam molestie fusce. Nunc quam enim laoreet in pellentesque accumsan. Imperdiet convallis mattis nisl at at sagittis. Fermentum sagittis magna nisl sed. Tincidunt et elementum amet suspendisse neque neque gravida quam.
        </ScaleUpParagraph>
        <Link href='/about-us' className="hidden md:block hover:opaque-80 active:opaque-80">
                <Button className="text-sm border md:px-8 lg:px-16 lg:text-xl px-6 md:py-4" variant="primary">Learn More</Button>
        </Link>
      </div>
    </div>
  );
}

export function AboutUs3() {
  const missions: IMission[] = [
    {src: '/holistic.jpeg', title: 'Holistic Approach to teaching', content: 'Beyond academic excellence, we prioritize the holistic development of our students. We foster a supportive learning environment where students not only gain knowledge but also develop essential qualities such as empathy, resilience, and professionalism—qualities that are integral to becoming exemplary healthcare professionals.'},
    {src: '/comp-curri.jpeg', title: 'Comprehensive Curriculum', content: ' Our platform offers a comprehensive curriculum designed to cover all aspects of nursing education. From foundational concepts to advanced clinical skills, we provide resources and tutoring across various specialties to ensure a well-rounded education for our students.'},
    {src: '/tailored.jpeg', title: 'Tailored Learning Experience', content: 'At DATNAS, we believe in customizing our tutoring services to meet the unique needs of each nursing student. Through personalized learning plans and one-on-one guidance, we ensure that every student receives the support they need to succeed.'}
  ]
  return (
    <div className="mb-2 bg-white w-full flex flex-col items-center px-6 md:px-16 lg:px-32 py-16 md:py-24 gap-16">
      <div className='flex flex-col w-full md:w-3/5 text-center justify-center items-center'>
        <h2 className='font-bold text-3xl'>Our Mission</h2>
        <p className={`${openSans.className} text-base w-full mt-4 mb-2`}>Our mission is to provide globally accessible, interactive, and high-quality tutoring services for nursing and allied health students, fostering academic excellence, professional growth, and positive impact in healthcare.</p>
        <Image src='/unstraightline.svg' alt='underline our mission' width={100} height={10} className='w-2/4 text-center border'/>
      </div>
      <div className='flex flex-col w-full justify-between md:flex-row flex-wrap gap-8'>
        {missions.map((mission, index) => <MissionCard key={index} {...mission} />)}
      </div>
    </div>
  )
}


export function AboutUs4() {
  return (
    <div className="mb-2 bg-white w-full flex flex-col lg:flex-row justify-between items-center px-6 md:px-16 lg:px-32 py-16 md:py-24 gap-16">
      <div className='w-full md:w-2/5 flex flex-col gap-2 md:gap-4 lg:gap-6'>
        <h2 className='font-bold text-2xl md:text-3xl lg:text-4xl text-center md:text-left'>Vision Statement</h2>
        <ScaleUpParagraph
          className={`${openSans.className} text-justify md:text-left text-sm lg:text-base leading-8`}
        >
          Our vision is to be the leading provider of innovative and transformative online tutoring services, empowering nursing and allied health students worldwide to reach their fullest potential and become compassionate, competent, and impactful healthcare professionals.        </ScaleUpParagraph>
        <Link href='/about-us' className="hidden md:block hover:opaque-80 active:opaque-80">
            <Button className="text-sm border md:px-8 lg:px-16 lg:text-xl px-6 md:py-4" variant="primary">Learn More</Button>
        </Link>
      </div>
      <div className='w-full md:w-2/5'>
        <Image src='/vision.svg' alt='Vison image' width={100} height={100}  className='w-full'/>
      </div>
    </div>
  );
}


export function AboutUs5() {
  const categories: ICourseCategory[] = [
    {thumbnail: '/heart.jpeg', category: 'The Heart', discussionComments: 45, discussionLikes: 567, rating: 4.56, courseTitle: 'Microscopic structure of cardiac muscle tissue and its unique properties'},
    {thumbnail: '/neural.jpeg', category: 'The Brain', discussionComments: 4, discussionLikes: 23, rating: 3.5, courseTitle: 'The intricate network of neural pathways and their role in cognition'},
    {thumbnail: '/heart.jpeg', category: 'The Heart', discussionComments: 45, discussionLikes: 567, rating: 4.56, courseTitle: 'Microscopic structure of cardiac muscle tissue and its unique properties'},
    {thumbnail: '/neural.jpeg', category: 'The Brain', discussionComments: 4, discussionLikes: 23, rating: 2.1, courseTitle: 'The intricate network of neural pathways and their role in cognition'}
  ]
  return (
    <div className="mb-2 bg-white w-full flex flex-col items-center px-6 md:px-16 lg:px-32 py-16 md:py-24 gap-16">
      <div className='flex flex-col w-full md:w-3/5 text-center justify-center items-center'>
        <h2 className='font-bold text-3xl'>Favorite courses to learn</h2>
        <p className={`${openSans.className} text-base w-full mt-4 mb-2`}>Access to our easy to understand course videos with well detailed explanation, image representation and illustrations</p>
        <Image src='/unstraightline.svg' alt='underline our mission' width={100} height={10} className='w-2/4 text-center border'/>
      </div>
      <div className='flex flex-col w-full justify-between md:flex-row flex-wrap gap-8'>
        {
          categories.map((category, index) => 
            <CourseCategory key={index} {...category}/>
          )
        }
      </div>
    </div>
  )
}