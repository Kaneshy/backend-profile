'use client'
import React, { useState } from 'react'
import AllbadgetsGet from '../fetch/allBadgets'

interface Sections {
    badgets: string[];
}


interface Badget {
    _id: string;
    name: string;
    desc: string;
    lev: number;
    img: string;
}

interface AddBadgetProps {
    setselected: React.Dispatch<React.SetStateAction<(string | Badget)[]>>;  // Based on your use of Sections
}

const AddBadget: React.FC<AddBadgetProps> = ({ setselected }) => {
    const [data, setdata] = useState<number>(1)
    const [openSearch, setopenSearch] = useState<boolean>(false)

    return (
        <div>
            <button onClick={() => {
                setdata(1)
                setopenSearch(true)
            }} className='p-2 bg-zinc-600 max-w-32 text-center'> Add badget </button>
            <button onClick={() => {
                setdata(2)
                setopenSearch(true)
            }} className='p-2 bg-zinc-600 max-w-32 text-center'> Add Sticker </button>
            {openSearch && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                    <div className='relative bg-zinc-800 p-4 rounded-lg max-h-[80vh] w-full max-w-[800px] overflow-y-auto'>
                        {/* Close button to hide popup */}
                        <button
                            className="absolute top-2 right-2 p-2 text-white bg-red-600 hover:bg-red-500 rounded-full"
                            onClick={() => setopenSearch(false)}
                        >
                            X
                        </button>

                        {(data === 1 || data === 2) && (
                            <AllbadgetsGet setselected={setselected} visibility={data === 1 ? 'public' : 'private'} />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddBadget;