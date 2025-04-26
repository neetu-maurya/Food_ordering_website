import mongoose, { Document, Schema, Types } from "mongoose";

// ✅ Interface for Menu
export interface IMenu {
    name: string;
    description: string;
    price: number;
    image: string;
}

// ✅ Interface for Menu Document (Ensuring _id is of type `Types.ObjectId`)
export interface IMenuDocument extends Document {
    _id: Types.ObjectId;  // ✅ Explicitly define _id type
    name: string;
    description: string;
    price: number;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

// ✅ Menu Schema
const menuSchema = new Schema<IMenuDocument>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true }
    },
    { timestamps: true } // ✅ Automatically handles `createdAt` & `updatedAt`
);

// ✅ Export Menu Model with Explicit Document Type
export const Menu = mongoose.model<IMenuDocument>("Menu", menuSchema);
