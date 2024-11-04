'use server'
import { connectToDB } from "@/lib/mongoose.js";
import BadgeGroup from "../../lib/models/badget";
import { CloudinaryUploadWidgetInfo } from "next-cloudinary";
import mongoose, { Document, Model } from 'mongoose';
import StickerGroup from "../../lib/models/stickers";



interface BadgeGroupFormData {
    name: string;
    desc: string;
    privacy: string;
}


type WidgetTagsProps = string | CloudinaryUploadWidgetInfo | undefined;


export const addBadgeGroup = async (formdata: BadgeGroupFormData, bookCldinfo: WidgetTagsProps) => {


    try {
        // Ensure the DB connection is established (assuming connectToDB is async)
        await connectToDB();

        const combinedInfoBadge = [
            {
                ...formdata,
                img: bookCldinfo?.secure_url,
                badgets: [],
            }
        ];
        console.log(20, {combinedInfoBadge})

        // Create a new instance of the BadgeGroup model with the passed data
        const newBadgeGroup = new StickerGroup(...combinedInfoBadge);

        // Save to MongoDB
        const savedBadgeGroup = await newBadgeGroup.save();

        console.log('Badge Group Saved:', savedBadgeGroup);
        return true;
    } catch (error) {
        console.error('Error saving badge group:', error);
        throw error;
    }
};



// Define interfaces for Badge and BadgeGroup
interface IBadge {
    name: string;
    desc: string;
    lev: number;
}

interface IBadgeGroup extends Document {
    name: string;
    badgets: IBadge[];
}


type paramsProps = { id: string }

// Function to add badges to the badgets array
export const addBadgesToGroup = async (formdata: IBadge, bookCldinfo: WidgetTagsProps, params: paramsProps) => {
    // console.log(3, formdata)
    // console.log(4, bookCldinfo)
    console.log(5, params)


    const combinedInfoBadge = [
        {
            ...formdata,
            img: bookCldinfo?.secure_url
        }
    ];
    try {
        // Find the BadgeGroup by ID and push the new badges into the badgets array
        const updatedBadgeGroup = await BadgeGroup.findByIdAndUpdate(
            params.id,
            { $push: { badgets: { $each: combinedInfoBadge } } }, // Use $each to add multiple badges
            { new: true } // Return the updated document
        );
        console.log(updatedBadgeGroup)
        

        return JSON.parse(JSON.stringify(updatedBadgeGroup));
    } catch (error) {
        console.error('Error adding badges:', error);
        return null;
    }
};




