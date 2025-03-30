import Image from 'next/image'
import Link from 'next/link'
export default function Logo({width = 119, height = 45}: {width?: number, height?: number}) {
  return (
    <Link href='/' title='The logo and link back to homepage'>
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
