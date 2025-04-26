import { Request, Response } from "express";
import { Restaurant } from "../model/restaurant.model";
import { Order } from "../model/order.model";

type CheckoutSessionRequest = {
    cartItems: {
        menuId: string;
        name: string;
        image: string;
        price: number;
        quantity: number;
    }[];
    deliveryDetails: {
        name: string;
        email: string;
        address: string;
        city: string;
    };
    restaurantId: string;
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.find({ user: req.id })
            .populate("user")
            .populate("restaurant");
        res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const createCheckoutSession = async (req: Request, res: Response): Promise<void> => {
    try {
        const checkoutSessionRequest: CheckoutSessionRequest = req.body;

        const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId).populate("menus");

        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found.",
            });
            return;
        }

        const totalAmount = calculateTotalAmount(checkoutSessionRequest.cartItems);

        const order = new Order({
            restaurant: restaurant._id,
            user: req.id,
            deliveryDetails: checkoutSessionRequest.deliveryDetails,
            cartItems: checkoutSessionRequest.cartItems,
            status: "confirmed", // No pending state needed for dummy
            totalAmount: totalAmount,
        });

        await order.save();

        res.status(200).json({
            success: true,
            message: "Dummy order placed successfully.",
            orderId: order._id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const calculateTotalAmount = (cartItems: CheckoutSessionRequest["cartItems"]): number => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};
