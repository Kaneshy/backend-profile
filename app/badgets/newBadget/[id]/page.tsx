'use client'
import { addBadgeGroup, addBadgesToGroup } from '@/actions/posts/main'
import WidgetTags from '@/components/cld/widgetTags'
import { CloudinaryUploadWidgetInfo } from 'next-cloudinary'
import React, { useState, FormEvent } from 'react'
import { useParams } from 'next/navigation'

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [bookCldinfo, setbookCldinfo] = useState<string | CloudinaryUploadWidgetInfo | undefined>(undefined);
  const params = useParams<{ id:string }>()


  interface BadgeGroupFormData {
    name: string;
    desc: string;
    lev: number;
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);

      const name = formData.get('name') as string;
      const desc = formData.get('desc') as string;

      const levValue = formData.get('lev');
      let lev: number;

      // Check if levelValue is not null and is a string
      if (levValue && typeof levValue === 'string' && levValue.trim() !== '') {
        lev = Number(levValue); // Convert string to number
      } else {
        throw new Error('Invalid level value'); // Handle invalid level
      }

      const badgeGroupData: BadgeGroupFormData = {
        name,
        desc,
        lev,
        // Ensure you add the exact form fields you expect in your form
      };

      console.log(bookCldinfo);
      await addBadgesToGroup(badgeGroupData, bookCldinfo, params);
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen '>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 bg-black p-4 max-w-[500px]">
        <h1 className='w-full text-center p-2'>ADD NEW BADGET</h1>

        {bookCldinfo && (
          <div className='flex flex-col w-full text-white'>
            <img src={bookCldinfo?.secure_url} alt="" />
            <p className='text-xs'>{bookCldinfo?.original_filename}</p>
          </div>

        )}
        <div>
          <WidgetTags setbookCldinfo={setbookCldinfo} />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Title</label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white"
            placeholder="Enter the title"
            required
          />
        </div>

        <div>
          <label htmlFor="desc" className="block text-sm font-medium text-gray-300">Description</label>
          <textarea
            id="desc"
            name="desc"
            rows={3}
            className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white"
            placeholder="Enter the description"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="lev" className="block text-sm font-medium text-gray-300">Level</label>
          <input
            type="number"
            id="lev"
            name="lev"
            className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white"
            placeholder="Enter the title"
            required
          />
        </div>

        <div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </div>

      </form>
    </div>
  )
}