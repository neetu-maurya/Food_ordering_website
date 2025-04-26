"use strict";
/*import { Request, Response } from "express";
import { Restaurant } from "../model/restaurant.model";
import { Order } from "../model/order.model";

import crypto from "crypto";



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
        const orders = await Order.find({ user: req.id }).populate("user").populate("restaurant");
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

        const order: any = new Order({
            restaurant: restaurant._id,
            user: req.id,
            deliveryDetails: checkoutSessionRequest.deliveryDetails,
            cartItems: checkoutSessionRequest.cartItems,
            status: "pending",
        });

        const totalAmount = calculateTotalAmount(checkoutSessionRequest.cartItems);

        const razorpayOrder = await razorpay.orders.create({
            amount: totalAmount, // Amount in paise
            currency: "INR",
            receipt: order._id.toString(),
            notes: {
                deliveryDetails: JSON.stringify(checkoutSessionRequest.deliveryDetails),
                cartItems: JSON.stringify(checkoutSessionRequest.cartItems),
            },
        });

        if (!razorpayOrder) {
            res.status(400).json({ success: false, message: "Error while creating order" });
            return;
        }

        await order.save();

        res.status(200).json({
            orderId: razorpayOrder.id,
            key: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const razorpayWebhook = async (req: Request, res: Response): Promise<void> => {
    try {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;

        const signature = req.headers["x-razorpay-signature"];
        const body = JSON.stringify(req.body);

        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(body)
            .digest("hex");

        if (signature !== expectedSignature) {
            res.status(400).send("Webhook signature verification failed.");
            return;
        }

        const event = req.body;

        if (event.event === "payment.captured") {
            const payment = event.payload.payment.entity;
            const orderId = payment.notes?.orderId;

            const order = await Order.findById(orderId);

            if (!order) {
                res.status(404).json({ message: "Order not found" });
                return;
            }

            order.status = "confirmed";
            order.totalAmount = payment.amount;
            await order.save();
        }

        res.status(200).send();
    } catch (error) {
        console.error("Webhook error:", error);
        res.status(500).send("Internal Server Error");
    }
};

const calculateTotalAmount = (cartItems: CheckoutSessionRequest["cartItems"]): number => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 100; // Convert to paise
};*/
