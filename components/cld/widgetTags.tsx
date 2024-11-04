'use client'
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import UploadWidgetCdl from './UploadWidget';

interface WidgetTagsProps {
    setbookCldinfo: (info: string | CloudinaryUploadWidgetInfo  | undefined ) => void;
  }

const WidgetTags: React.FC<WidgetTagsProps> = ({ setbookCldinfo }) => {

    return (
        <div className='flex items-center justify-center'>
            <CldUploadWidget
                options={{
                    folder: 'profileBeta'
                }}
                uploadPreset="profileBeta"
                onSuccess={(result, { widget }) => {
                    console.log(result?.info);
                    setbookCldinfo(result?.info); 
                }}
            >
                {({ open }) => {
                    return (
                        <div
                            className="mt-4 w-full uppercase nerko-one-regular text-white bg-[#C5705D] text-center py-2 px-4 rounded-md hover:bg-[#ce998d] focus:outline-none focus:ring-2 focus:ring-blue-400 "
                            onClick={() => {
                                open();
                            }}>
                            Attatch Image
                        </div>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
};

export default WidgetTags;

