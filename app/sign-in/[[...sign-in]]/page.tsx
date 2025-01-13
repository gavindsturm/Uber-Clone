import { SignIn } from '@clerk/nextjs'
import Image from 'next/image';

export default function Page() {
  return (
    <>
    <div>
      <Image src='/banner.jpeg' width={1000} height={1000}
        className='object-contain h-full w-full' alt={''}/>
      <div className='absolute top-20 right-10'>
      <SignIn />
      </div>
    </div>
    </>
  )
}