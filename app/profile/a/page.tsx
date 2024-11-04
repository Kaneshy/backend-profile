'use client'
import { fetchAllSections, fetchsectionBadgets } from '@/actions/fetch/main'
import { addBadgesToProfile, handleDeleteAS } from '@/actions/posts/profile.post';
import AddBadget from '@/components/popup/addBadget';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
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






const page = () => {

    const [datafetched, setdatafetched] = useState<Item[]>([]) // Initialize as an array of Badge
    const [selected, setselected] = useState<(string | Badge)[]>([]);
    const [badgetsH, setbadgetsH] = useState<(string | Badge)[]>([]);
    const [refresh, setrefresh] = useState<boolean | undefined>(false)

    useEffect(() => {
        const fetchdata = async () => {
            const res = await fetchAllSections()
            setdatafetched(res)
            setbadgetsH(res.badgetsA)
            console.log('Fetched data:', res)
        }
        fetchdata()
    }, [refresh])

    const postdata = async (id: string) => {
        const res = await addBadgesToProfile(selected, id).then(fetchdata)
        console.log('Fetched data:', res)
    }

    const fetchdata = async () => {
        const res = await fetchAllSections()
        setdatafetched(res)
    }

    const fetchdatachange = async () => {
        console.log(67645, datafetched)
        const res = await fetchsectionBadgets(datafetched[0])
        setbadgetsH(res)
        console.log('Fetched data:', res)
    }

    const handledelete = async (id: string, xid: string) => {
        const res = await handleDeleteAS(id, xid)
        if (res) {
            setrefresh(true);
        }
    }


    useEffect(() => {
        console.log(3, selected)
    }, [selected])

    return (
        <main className='margin-b w-full bg-black flex flex-col justify-center'>

            <div className="bg-zinc-800 w-full mx-auto max-w-[1200px] p-4 rounded-md min-h-screen">
                {datafetched?.map((x) => (
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

                        <div className="mt-2 flex grid-a">
                            {x.badgets?.map((y, i) => (
                                <div
                                    key={y._id + i} className="mt-2 relative text-center p-2 gap-2 border flex items-center flex-col justify-between border-zinc-600 rounded-md bg-zinc-700">
                                    <img src={y.img} alt={y.name} className="mt-2 w-20 h-auto rounded-md" />
                                    <div className="text-white truncate w-full  font-semibold">{y.name}</div>
                                    <div className='w-full flex items-center justify-center flex-col text-xs text-gray-400'>
                                        <div className="">XP: {y.desc}</div>
                                        <div className="">Level: {y._id}</div>
                                    </div>
                                    <button
                                        onClick={() => handledelete(y._id, x._id)}
                                        className='absolute top-1 right-1'>x</button>

                                </div>
                            ))}
                        </div>
                        <AddBadget setselected={setselected} />
                        {(selected.length > 0) && (
                            <button
                                onClick={() => {
                                    postdata(x._id)
                                    setselected([])
                                }}
                                className='bg-zinc-500 p-2'
                            >add {selected.length} badgets?</button>
                        )}
                        <button
                            className='bg-zinc-500 p-2'
                            onClick={fetchdatachange}
                        >function</button>
                    </div>
                ))}
            </div>
        </main>

    )
}

export default page