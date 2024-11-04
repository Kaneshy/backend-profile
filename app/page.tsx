import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center gap-3 min-h-screen w-full bg-zin-300">
      <Link href={'/badgets/addGroudBadget'} >addgroupbadget</Link>
      <Link href={'/badgets/newBadget/dfdf'}  > newBadget</Link>
      <Link href={'/badgets/getGroupBadgets'}  > getGroupBadgets</Link>
      <Link href={'/media/stickers/getGroupBadgets'}  > getGroupStickers</Link>
      <Link href={'/media/frames/getGroupBadgets'}  > getGroupFrames</Link>
    </div>
  );
}
