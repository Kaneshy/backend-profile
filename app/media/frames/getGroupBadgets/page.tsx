import { fetchAllGroupFrames, fetchAllGroupStickers } from '@/actions/fetch/main'
import Link from 'next/link';
import React from 'react'
import { IoIosAdd } from "react-icons/io";


interface Badge {
    _id: string;
    name: string;
    desc: string;
    lev: number;
    img: string;
}

interface Item {
    _id: string;
    name: string;
    badgets?: Badge[]; // Use optional chaining if badgets can be undefined
}

interface Props {
    res?: Item[]; // Array of items, optional
}


const page = async () => {

    const res = await fetchAllGroupFrames()
    return (
        <main className='margin-b w-full bg-black flex flex-col justify-center'>

            <div className="bg-zinc-800 w-full mx-auto max-w-[1200px] p-4 rounded-md min-h-screen">
                {res?.map((x) => (
                    <div key={x._id} className="mb-4 p-4 border border-zinc-700 rounded-md">
                        <div className='flex justify-between items-center '>
                            <div className='flex flex-col'>
                                <div className="text-white text-lg font-semibold">{x.name}</div>
                                <div className="text-gray-400 text-xs">{x._id}</div>

                            </div>
                            <Link className='p-2 rounded-sm' href={`/badgets/newBadget/${x._id}`}>
                                <IoIosAdd className='text-gray-400 hover:bg-zinc-300 hover:text-zinc-800 rounded-lg' size={24} />
                            </Link>
                        </div>

                        <div className="mt-2 flex grid-b">
                            {x.badgets?.map((y) => (
                                <div
                                    key={y._id} className="mt-2 text-center p-2 gap-2 border flex items-center flex-col justify-between border-zinc-600 rounded-md bg-zinc-700">
                                    <img src={y.img} alt={y.name} className="mt-2 w-32 h-auto rounded-md" />
                                    <div className="text-white truncate w-full  font-semibold">{y.name}</div>
                                    <div className='w-full flex items-center justify-center flex-col text-xs text-gray-400'>
                                        <div className="">{y.desc}</div>
                                        <div className="">Level: {y.lev}</div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </main>

    )
}

export default page