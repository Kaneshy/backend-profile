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
        console.log(20, { combinedInfoBadge })

        // Create a new instance of the BadgeGroup model with the passed data
        const newBadgeGroup = new BadgeGroup(...combinedInfoBadge);

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

interface Sections {
    badgets: string[];
}


interface Badge {
    _id: string;
    name: string;
    desc: string;
    lev: number;
    img: string;
}



// Function to add badges to the badgets array
export const addBadgesToProfile = async (selected: (string | Badge)[], id: string) => {
    console.log(5, selected)



    try {

        // Find the BadgeGroup by ID and push the new badges into the badgets array
        const updatedBadgeGroup = await StickerGroup.findByIdAndUpdate(
            id,
            { $push: { badgets: { $each: selected } } }, // Use $each to add multiple badges
            { new: true } // Return the updated document
        );
        console.log(updatedBadgeGroup)


        return JSON.parse(JSON.stringify(updatedBadgeGroup));
    } catch (error) {
        console.error('Error adding badges:', error);
        return null;
    }
};


export const handleDeleteAS = async (id: string, xid: string) => {
    console.log(33, id, xid)

    try {

        // Find the BadgeGroup by ID and push the new badges into the badgets array
        const updatedBadgeGroup = await StickerGroup.findByIdAndUpdate(
            xid,
            { $pull: { badgets: { _id: id } } }, // Remove the specific badge
            { new: true } // Return the updated document
        );
        console.log(updatedBadgeGroup)


        return JSON.parse(JSON.stringify(updatedBadgeGroup));
    } catch (error) {
        console.error('Error adding badges:', error);
        return null;
    }
   
};





