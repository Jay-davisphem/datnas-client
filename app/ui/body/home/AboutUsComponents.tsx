import Link from 'next/link'
import Button from '../../Button'

export default function AboutUs1() {
  return (
    <div className="tr-hero-image bg-cover bg-no-repeat bg-center w-full relative p-6 pt-25 md:p-16 lg:p-32 pb-40 lg:pb-64 ">
       {/* bg-[url(/hero-page-doc.svg)] opacity-50 bg-cover bg-center h-screen w-full relative z-1 p-6 pt-25 md:p-16 lg:p-32 */}
      {/* Lighter overlay with blend mode */}
      {/* <div className="absolute inset-0 bg-blue-500 bg-opacity-40 mix-blend-overlay z-2"></div>         */}

      {/* Text content with higher contrast */}
      <div className="text-white relative bg-transparent flex flex-col items-center h-full text-2xl gap-8 brightness-125 drop-shadow-lg">
        <h1 className='text-3xl md:text-6xl font-black'>About Us</h1>
        <p className='text-base md:px-32 text-center lg:px-70'>
          Unlock limitless learning with our educational platform. Explore, discover, and achieve your goals with personalized learning experiences tailored just for you.
        </p>
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
  )
}
