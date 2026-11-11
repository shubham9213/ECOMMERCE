
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import user from "./models/user.js";
import product from "./models/product.js";

dotenv.config();

// 5 Dummy Users
const users = [
    {
        name: "Admin",
        email: "admin@gmail.com",
        password: "admin123",
        role: "admin"
    },
    {
        name: "Shubham",
        email: "shubham@gmail.com",
        password: "user123",
        role: "user"
    },
    {
        name: "Rahul",
        email: "rahul@gmail.com",
        password: "user123",
        role: "user"
    },
    {
        name: "Amit",
        email: "amit@gmail.com",
        password: "user123",
        role: "user"
    },
    {
        name: "Priya",
        email: "priya@gmail.com",
        password: "user123",
        role: "user"
    }
];

// 5 Dummy Products
const products = [
    {
        name: "Wireless Headphones",
        description: "Premium wireless headphones with clear sound.",
        price: 1999,
        category: "Electronics",
        image: "https://placehold.co/400x400?text=Headphones",
           rate: 4.5, // <-- ये जोड़ें
    review: 0, // <-- ये जोड़ें
    stock: 50
    },
     {
        name: "Wirelesszdf Headphones",
        description: "Premium wireless headphones with clear sound.",
        price: 1999,
        category: "Electronics",
        image: "https://placehold.co/400x400?text=Headphones",
           rate: 4.5, // <-- ये जोड़ें
    review: 0, // <-- ये जोड़ें
    stock: 50
    },
     {
        name: "Wireless Headphones",
        description: "Premium wireless headphones with clear sound.",
        price: 1999,
        category: "Electronics",
        image: "https://placehold.co/400x400?text=Headphones",
           rate: 4.5, // <-- ये जोड़ें
    review: 0, // <-- ये जोड़ें
    stock: 50
    },
     {
        name: "Wireless Headphones",
        description: "Premium wireless headphones with clear sound.",
        price: 1999,
        category: "Electronics",
        image: "https://placehold.co/400x400?text=Headphones",   rate: 4.5, // <-- ये जोड़ें
    review: 0, // <-- ये जोड़ें
    stock: 50
    },
     {
        name: "Wireless Headphones",
        description: "Premium wireless headphones with clear sound.",
        price: 1999,
        category: "Electronics",
        image: "https://placehold.co/400x400?text=Headphones",   rate: 4.5, // <-- ये जोड़ें
    review: 0, // <-- ये जोड़ें
    stock: 50
    },
     {
        name: "Wireless Headphones",
        description: "Premium wireless headphones with clear sound.",
        price: 1999,
        category: "Electronics",
        image: "https://placehold.co/400x400?text=Headphones",   rate: 4.5, // <-- ये जोड़ें
    review: 0, // <-- ये जोड़ें
    stock: 50
    },
     {
        name: "Wireless Headphones",
        description: "Premium wireless headphones with clear sound.",
        price: 1999,
        category: "Electronics",
        image: "https://placehold.co/400x400?text=Headphones" ,  rate: 4.5, // <-- ये जोड़ें
    review: 0, // <-- ये जोड़ें
    stock: 50
    },
     {
        name: "Wireless Headphones",
        description: "Premium wireless headphones with clear sound.",
        price: 1999,
        category: "Electronics",
        image: "https://placehold.co/400x400?text=Headphones"
        ,  rate: 4.5, // <-- ये जोड़ें
    review: 0, // <-- ये जोड़ें
    stock: 50
    },
     {
        name: "Wireless Headphones",
        description: "Premium wireless headphones with clear sound.",
        price: 1999,
        category: "Electronics",
        image: "https://placehold.co/400x400?text=Headphones",  rate: 4.5, // <-- ये जोड़ें
    review: 0, // <-- ये जोड़ें
    stock: 50
    },
     {
        name: "Wireless Headphones",
        description: "Premium wireless headphones with clear sound.",
        price: 1999,
        category: "Electronics",
        image: "https://placehold.co/400x400?text=Headphones",  rate: 4.5, // <-- ये जोड़ें
    review: 0, // <-- ये जोड़ें
    stock: 50
    },
     {
        name: "Wireless Headphones",
        description: "Premium wireless headphones with clear sound.",
        price: 1999,
        category: "Electronics",
        image: "https://placehold.co/400x400?text=Headphones",  rate: 4.5, // <-- ये जोड़ें
    review: 0, // <-- ये जोड़ें
    stock: 50
    },
    
    {
        name: "Smart Watch",
        description: "Smart watch with fitness tracking.",
        price: 2499,
        category: "Electronics",
        image: "https://placehold.co/400x400?text=Smart+Watch",  rate: 4.5, // <-- ये जोड़ें
    review: 0, // <-- ये जोड़ें
    stock: 50
    },
    {
        name: "Running Shoes",
        description: "Comfortable running shoes for daily use.",
        price: 1499,
        category: "Fashion",
        image: "https://placehold.co/400x400?text=Shoes",  rate: 4.5, // <-- ये जोड़ें
    review: 0, // <-- ये जोड़ें
    stock: 50
    },
    {
        name: "Laptop Backpack",
        description: "Stylish and durable laptop backpack.",
        price: 999,
        category: "Accessories",
        image: "https://placehold.co/400x400?text=Backpack",  rate: 4.5, // <-- ये जोड़ें
    review: 0, // <-- ये जोड़ें
    stock: 50
    },
    {
        name: "Bluetooth Speaker",
        description: "Portable speaker with powerful bass.",
        price: 1299,
        category: "Electronics",
        image: "https://placehold.co/400x400?text=Speaker",  rate: 4.5, // <-- ये जोड़ें
    review: 0, // <-- ये जोड़ें
    stock: 50
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log("MongoDB connected");

        // Hash user passwords
        const hashedUsers = await Promise.all(
            users.map(async (item) => ({
                ...item,
                password: await bcrypt.hash(item.password, 10)
            }))
        );

        // Insert users only if email doesn't exist
        for (const item of hashedUsers) {
            await user.findOneAndUpdate(
                { email: item.email },
                { $setOnInsert: item },
                { upsert: true, new: true }
            );
        }

        // Insert products only if name doesn't exist
        // for (const item of products) {
        //     await product.findOneAndUpdate(
        //         { name: item.name },
        //         { $setOnInsert: item },
        //         { upsert: true, new: true }
        //     );
        // }
        if (products.length > 0) {
    // optional: await product.deleteMany({}); // Uncomment if you want to clear old items first
    await product.insertMany(products);
}

        console.log("5 Users seeded successfully");
        console.log("5 Products seeded successfully");

    } catch (err) {
        console.log("SEED ERROR:", err.message);

    } finally {
        await mongoose.disconnect();
    }
};

seedData();
