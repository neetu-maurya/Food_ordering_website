import mongoose, { Document, Schema, Types } from "mongoose";


export interface IRestaurant {
    user: Types.ObjectId;  // ✅ Use `Types.ObjectId`
    restaurantName: string;
    city: string;
    country: string;
    deliveryTime: number;
    cuisines: string[];
    imageUrl: string;
    menus: Types.ObjectId[];  // ✅ Ensure consistency
}
export interface IRestaurantDocument extends IRestaurant, Document {
    createdAt:Date;
    updatedAt:Date;
}

const restaurantSchema = new mongoose.Schema<IRestaurantDocument>({
    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    restaurantName:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    deliveryTime:{
        type:Number,
        required:true
    },
    cuisines: [{ type: String, required: true }],
    menus: [{ type: Schema.Types.ObjectId, ref: "Menu" }],  // ✅ Correct type for schema
        imageUrl: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);
export const Restaurant = mongoose.model<IRestaurantDocument>("Restaurant", restaurantSchema);