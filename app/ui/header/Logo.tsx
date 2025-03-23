import Image from 'next/image'
export default function Logo({width = 119, height = 45}: {width?: number, height?: number}) {
  return (
    <Image 
        alt='datnas logo'
        src='/DATNAS01.svg'
        width={width}
        height={height}
      
    />
  )
}
