import { IoSearch } from 'react-icons/io5'
import { openSans } from '../fonts';

export default function SearchInput({className, pClassName}: {className?: string, pClassName?: string}) {
  return (
    <div className={`flex flex-row ${pClassName}`}>
        <div className='flex bg-white rounded-l-full p-2'>
            <div className="flex items-center">
                <IoSearch size={30} className="text-white bg-[var(--accent-color)] p-2 rounded-full"/>
            </div>
        </div>
        
        <input
            type="text"
            placeholder="Search for Product"
            className={`bg-white rounded-r-full px-4 text-lg ${openSans.className} placeholder:text-[#cfcfcf] focus:outline-none ${className}`}
        />
    </div>
  )
}
