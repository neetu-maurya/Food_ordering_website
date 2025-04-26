"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editMenu = exports.getMenus = exports.addMenu = void 0;
const imageUpload_1 = __importDefault(require("../utils/imageUpload"));
const menu_model_1 = require("../model/menu.model");
const restaurant_model_1 = require("../model/restaurant.model");
const mongoose_1 = __importDefault(require("mongoose"));
// ✅ Add Menu to Restaurant
const addMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price } = req.body;
        const file = req.file;
        if (!file) {
            res.status(400).json({ success: false, message: "Image is required" });
            return;
        }
        // ✅ Upload image
        const imageUrl = yield (0, imageUpload_1.default)(file);
        // ✅ Create a new menu item
        const menu = yield menu_model_1.Menu.create({ name, description, price, image: imageUrl });
        // ✅ Find restaurant associated with the user
        const restaurant = yield restaurant_model_1.Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            res.status(404).json({ success: false, message: "Restaurant not found!" });
            return;
        }
        // ✅ Add menu ID to restaurant's `menus` array
        restaurant.menus.push(menu._id);
        yield restaurant.save();
        res.status(201).json({ success: true, message: "Menu added successfully", menu });
    }
    catch (error) {
        console.error("❌ Error adding menu:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.addMenu = addMenu;
// ✅ Fetch All Menus
const getMenus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("📌 Fetching all menus...");
        const menus = yield menu_model_1.Menu.find();
        res.status(200).json({ success: true, menus });
    }
    catch (error) {
        console.error("❌ Error fetching menus:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.getMenus = getMenus;
// ✅ Edit Menu
const editMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const file = req.file;
        console.log("🟢 Edit Request Received");
        console.log("🟢 Menu ID:", id);
        console.log("🟢 Received Body Data:", req.body);
        console.log("🟢 Received File:", file ? file.originalname : "No file uploaded");
        // ✅ Validate `id`
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            console.error("❌ Invalid Menu ID:", id);
            res.status(400).json({ success: false, message: "Invalid menu ID" });
            return;
        }
        // ✅ Find the menu by ID
        const menu = yield menu_model_1.Menu.findById(id);
        if (!menu) {
            console.error("❌ Menu Not Found:", id);
            res.status(404).json({ success: false, message: "Menu not found!" });
            return;
        }
        // ✅ Update fields if provided
        if (name)
            menu.name = name;
        if (description)
            menu.description = description;
        if (price)
            menu.price = price;
        // ✅ Upload and update image if provided
        if (file) {
            console.log("🟢 Uploading new image...");
            const imageUrl = yield (0, imageUpload_1.default)(file);
            menu.image = imageUrl;
            console.log("🟢 New Image URL:", imageUrl);
        }
        // ✅ Save the updated menu
        yield menu.save();
        console.log("✅ Menu updated successfully:", menu);
        res.status(200).json({ success: true, message: "Menu updated successfully", menu });
    }
    catch (error) {
        console.error("❌ Error updating menu:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.editMenu = editMenu;
