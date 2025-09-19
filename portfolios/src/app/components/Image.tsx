import Image from 'next/image'
import { useState } from 'react'

const ProjectImage = ({ src, alt, fallback, width, height, className }: { src: string; alt: string; fallback: string; className: string; width: number; height:number }) => {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      width={width}
      height={height}
      src={imgSrc || fallback}
      alt={alt}
      className={className}
      onError={() => setImgSrc(fallback)}
    />
  )
}

export default ProjectImage
