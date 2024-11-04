import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full py-2 px-4 bg-black font-bold text-zinc-200 '>
      <div className="flex items-center justify-between gap-3 p-2 w-full bg-zin-300">
        <Link href={'/badgets/addGroudBadget'} >addgroupbadget</Link>
        <Link href={'/badgets/newBadget/dfdf'}  > newBadget</Link>
        <Link href={'/badgets/getGroupBadgets'}  > getGroupBadgets</Link>
        <Link href={'/media/stickers/getGroupBadgets'}  > getGroupStickers</Link>
        <Link href={'/media/frames/getGroupBadgets'}  > getGroupFrames</Link>
      </div>
      <div className="flex items-center justify-between gap-3 p-2 w-full bg-zin-300">
        <Link href={'/profile/a'} >profile</Link>
      </div>
    </div>
  )
}

export default Navbar