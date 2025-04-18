import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-6 md:px-16 lg:px-32 min-h-screen flex items-center justify-center bg-black px-4 py-12 text-white">
      <div className="max-w-xl text-center flex flex-col items-center gap-6">
        <Image
          src="/stethoscope-confused.png"
          alt="Confused Stethoscope"
          width={200}
          height={200}
        />

        <h1 className="text-3xl sm:text-4xl font-extrabold text-red-500">
          Uh-oh... This Page Missed Report!
        </h1>

        <p className="text-lg text-gray-300">
          Looks like this chart took a detour — probably somewhere between the
          nurses' station and the break room.
        </p>

        <ul className="text-gray-400 text-base list-disc list-inside text-left max-w-md mx-auto">
          <li>Left during shift change and never came back 🌀</li>
          <li>Misfiled under "we'll deal with it later" 📁</li>
          <li>Possibly hiding in the med room 🫣</li>
          <li>...or it's just a 404, honestly 🤷‍♀️</li>
        </ul>

        <Link
          href="/"
          className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 px-6 rounded-full transition-all shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          🏥 Return to Station (Homepage)
        </Link>

        <p className="text-sm text-gray-500 mt-4 italic">
          Still lost? Ask the charge nurse. Or just refresh and pretend this
          never happened.
        </p>
      </div>
    </div>
  );
}
