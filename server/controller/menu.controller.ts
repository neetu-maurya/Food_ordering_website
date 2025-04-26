import { Request, Response } from "express";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Menu } from "../model/menu.model";
import { Restaurant } from "../model/restaurant.model";
import mongoose, { Types } from "mongoose";

// ✅ Add Menu to Restaurant
export const addMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, price } = req.body;
        const file = req.file;

        if (!file) {
            res.status(400).json({ success: false, message: "Image is required" });
            return;
        }

        // ✅ Upload image
        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);

        // ✅ Create a new menu item
        const menu = await Menu.create({ name, description, price, image: imageUrl });

        // ✅ Find restaurant associated with the user
        const restaurant = await Restaurant.findOne({ user: req.id });

        if (!restaurant) {
            res.status(404).json({ success: false, message: "Restaurant not found!" });
            return;
        }

        // ✅ Add menu ID to restaurant's `menus` array
        restaurant.menus.push(menu._id);
        await restaurant.save();

        res.status(201).json({ success: true, message: "Menu added successfully", menu });
    } catch (error) {
        console.error("❌ Error adding menu:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// ✅ Fetch All Menus
export const getMenus = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("📌 Fetching all menus...");
        const menus = await Menu.find();
        res.status(200).json({ success: true, menus });
    } catch (error) {
        console.error("❌ Error fetching menus:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// ✅ Edit Menu
export const editMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const file = req.file;

        console.log("🟢 Edit Request Received");
        console.log("🟢 Menu ID:", id);
        console.log("🟢 Received Body Data:", req.body);
        console.log("🟢 Received File:", file ? file.originalname : "No file uploaded");

        // ✅ Validate `id`
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error("❌ Invalid Menu ID:", id);
            res.status(400).json({ success: false, message: "Invalid menu ID" });
            return;
        }

        // ✅ Find the menu by ID
        const menu = await Menu.findById(id);
        if (!menu) {
            console.error("❌ Menu Not Found:", id);
            res.status(404).json({ success: false, message: "Menu not found!" });
            return;
        }

        // ✅ Update fields if provided
        if (name) menu.name = name;
        if (description) menu.description = description;
        if (price) menu.price = price;

        // ✅ Upload and update image if provided
        if (file) {
            console.log("🟢 Uploading new image...");
            const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
            menu.image = imageUrl;
            console.log("🟢 New Image URL:", imageUrl);
        }

        // ✅ Save the updated menu
        await menu.save();

        console.log("✅ Menu updated successfully:", menu);
        res.status(200).json({ success: true, message: "Menu updated successfully", menu });
    } catch (error) {
        console.error("❌ Error updating menu:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
