import Image from 'next/image'
import Link from 'next/link'
export default function Logo({width = 119, height = 45}: {width?: number, height?: number}) {
  return (
    <Link href='/' title='The logo and link back to homepage' className='active:shadow-md hover:rounded hover:shadow-md active:rounded'>
      <Image 
        alt='datnas logo'
        src='/DATNAS01.svg'
        width={width}
        height={height}
        priority
        />
      </Link>
  )
}
