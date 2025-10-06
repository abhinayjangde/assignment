import mongoose from "mongoose";
import { config as conf } from "dotenv";
import UserModel from "./src/models/user.model.js";
import ProductModel from "./src/models/product.model.js";
import { config } from "./src/configs/config.js";

conf();

// Dummy users data
const users = [
    // Admin users
    {
        name: "Admin User",
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
        isVerified: true,
        avatar: "https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff",
    },
    {
        name: "Super Admin",
        email: "superadmin@example.com",
        password: "admin123",
        role: "admin",
        isVerified: true,
        avatar: "https://ui-avatars.com/api/?name=Super+Admin&background=0D8ABC&color=fff",
    },
    // Seller users
    {
        name: "John Seller",
        email: "john.seller@example.com",
        password: "seller123",
        role: "seller",
        isVerified: true,
        avatar: "https://ui-avatars.com/api/?name=John+Seller&background=FF6B6B&color=fff",
    },
    {
        name: "Sarah Store",
        email: "sarah.store@example.com",
        password: "seller123",
        role: "seller",
        isVerified: true,
        avatar: "https://ui-avatars.com/api/?name=Sarah+Store&background=4ECDC4&color=fff",
    },
    {
        name: "Mike Merchant",
        email: "mike.merchant@example.com",
        password: "seller123",
        role: "seller",
        isVerified: true,
        avatar: "https://ui-avatars.com/api/?name=Mike+Merchant&background=95E1D3&color=fff",
    },
    {
        name: "Emma Electronics",
        email: "emma.electronics@example.com",
        password: "seller123",
        role: "seller",
        isVerified: true,
        avatar: "https://ui-avatars.com/api/?name=Emma+Electronics&background=F38181&color=fff",
    },
    // Regular users
    {
        name: "Alice Johnson",
        email: "alice@example.com",
        password: "user123",
        role: "user",
        isVerified: true,
        avatar: "https://ui-avatars.com/api/?name=Alice+Johnson&background=AA96DA&color=fff",
    },
    {
        name: "Bob Smith",
        email: "bob@example.com",
        password: "user123",
        role: "user",
        isVerified: true,
        avatar: "https://ui-avatars.com/api/?name=Bob+Smith&background=FCBAD3&color=fff",
    },
    {
        name: "Charlie Brown",
        email: "charlie@example.com",
        password: "user123",
        role: "user",
        isVerified: true,
        avatar: "https://ui-avatars.com/api/?name=Charlie+Brown&background=FFFFD2&color=333",
    },
    {
        name: "Diana Prince",
        email: "diana@example.com",
        password: "user123",
        role: "user",
        isVerified: false,
        avatar: "https://ui-avatars.com/api/?name=Diana+Prince&background=A8D8EA&color=fff",
    },
];

// Dummy products data (will be associated with sellers after user creation)
const productsTemplate = [
    // Electronics
    {
        name: "Samsung Galaxy S24 Ultra",
        description: "Latest flagship smartphone with advanced AI features, 200MP camera, and S Pen. Perfect for productivity and photography enthusiasts.",
        price: "1199.99",
        category: "Electronics",
        imageURL: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
    },
    {
        name: "Sony WH-1000XM5 Headphones",
        description: "Industry-leading noise canceling wireless headphones with premium sound quality and 30-hour battery life.",
        price: "399.99",
        category: "Electronics",
        imageURL: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
    },
    {
        name: "MacBook Pro 16-inch M3",
        description: "Powerful laptop with M3 Pro chip, stunning Liquid Retina XDR display, and up to 22 hours battery life.",
        price: "2499.99",
        category: "Electronics",
        imageURL: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    },
    {
        name: "iPad Air 11-inch",
        description: "Versatile tablet with M2 chip, Apple Pencil Pro support, and all-day battery life for work and play.",
        price: "599.99",
        category: "Electronics",
        imageURL: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    },
    {
        name: "LG 65-inch OLED TV",
        description: "4K OLED smart TV with stunning picture quality, Dolby Vision IQ, and gaming features for next-gen consoles.",
        price: "1799.99",
        category: "Electronics",
        imageURL: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    },
    // Clothing
    {
        name: "Classic Denim Jacket",
        description: "Timeless denim jacket with a modern fit. Made from premium cotton denim. Perfect for casual outings.",
        price: "79.99",
        category: "Clothing",
        imageURL: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    },
    {
        name: "Leather Messenger Bag",
        description: "Genuine leather messenger bag with multiple compartments. Professional and stylish for work or travel.",
        price: "129.99",
        category: "Clothing",
        imageURL: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    },
    {
        name: "Running Shoes Pro",
        description: "High-performance running shoes with advanced cushioning and breathable mesh. Ideal for marathon training.",
        price: "149.99",
        category: "Clothing",
        imageURL: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    },
    {
        name: "Winter Wool Coat",
        description: "Premium wool blend coat with elegant design. Keeps you warm and stylish during cold weather.",
        price: "249.99",
        category: "Clothing",
        imageURL: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop",
    },
    // Books
    {
        name: "The Art of Programming",
        description: "Comprehensive guide to modern software development practices. Perfect for beginners and experienced developers.",
        price: "49.99",
        category: "Books",
        imageURL: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=400&fit=crop",
    },
    {
        name: "Mystery at Midnight",
        description: "Gripping thriller novel with unexpected twists. A page-turner that will keep you up all night.",
        price: "24.99",
        category: "Books",
        imageURL: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
    },
    {
        name: "Cooking Masterclass",
        description: "Professional cooking techniques and recipes from world-renowned chefs. Elevate your culinary skills.",
        price: "39.99",
        category: "Books",
        imageURL: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=400&fit=crop",
    },
    // Home & Garden
    {
        name: "Smart WiFi Thermostat",
        description: "Energy-efficient smart thermostat with app control. Save on energy bills while maintaining comfort.",
        price: "199.99",
        category: "Home & Garden",
        imageURL: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=400&h=400&fit=crop",
    },
    {
        name: "Indoor Plant Collection",
        description: "Set of 5 easy-care indoor plants to purify air and beautify your living space.",
        price: "89.99",
        category: "Home & Garden",
        imageURL: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&h=400&fit=crop",
    },
    {
        name: "Robot Vacuum Cleaner",
        description: "Smart robot vacuum with mapping technology and automatic charging. Keep your floors spotless effortlessly.",
        price: "349.99",
        category: "Home & Garden",
        imageURL: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=400&fit=crop",
    },
    // Sports
    {
        name: "Professional Yoga Mat",
        description: "Extra-thick, non-slip yoga mat with excellent cushioning. Perfect for all types of yoga and fitness exercises.",
        price: "59.99",
        category: "Sports",
        imageURL: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    },
    {
        name: "Carbon Fiber Road Bike",
        description: "Lightweight carbon fiber road bike with 21-speed gear system. Built for speed and endurance.",
        price: "1499.99",
        category: "Sports",
        imageURL: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=400&fit=crop",
    },
    {
        name: "Adjustable Dumbbell Set",
        description: "Space-saving adjustable dumbbells ranging from 5-52.5 lbs. Complete home gym solution.",
        price: "299.99",
        category: "Sports",
        imageURL: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop",
    },
    // Toys
    {
        name: "LEGO Architecture Set",
        description: "Build famous landmarks with this detailed LEGO set. Great for adults and kids who love architecture.",
        price: "79.99",
        category: "Toys",
        imageURL: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop",
    },
    {
        name: "RC Racing Drone",
        description: "High-speed racing drone with HD camera and easy controls. Perfect for beginners and experienced pilots.",
        price: "249.99",
        category: "Toys",
        imageURL: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop",
    },
    // Health & Beauty
    {
        name: "Organic Skincare Set",
        description: "Complete skincare routine with natural ingredients. Cleanse, tone, and moisturize for glowing skin.",
        price: "89.99",
        category: "Health & Beauty",
        imageURL: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
    },
    {
        name: "Electric Toothbrush Pro",
        description: "Advanced electric toothbrush with multiple cleaning modes and long battery life. Dentist recommended.",
        price: "129.99",
        category: "Health & Beauty",
        imageURL: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop",
    },
    // Food & Beverages
    {
        name: "Gourmet Coffee Beans",
        description: "Premium single-origin coffee beans, freshly roasted. Rich flavor with notes of chocolate and caramel.",
        price: "24.99",
        category: "Food & Beverages",
        imageURL: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    },
    {
        name: "Organic Tea Collection",
        description: "Assorted organic teas from around the world. 20 different flavors to explore and enjoy.",
        price: "34.99",
        category: "Food & Beverages",
        imageURL: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
    },
    // Automotive
    {
        name: "Dash Cam Full HD",
        description: "1080p dash camera with night vision and G-sensor. Protect yourself with clear video evidence.",
        price: "89.99",
        category: "Automotive",
        imageURL: "https://images.unsplash.com/photo-1533094602577-198d3beab8ea?w=400&h=400&fit=crop",
    },
    {
        name: "Car Phone Mount",
        description: "Universal phone holder with strong magnetic grip and 360-degree rotation. Safe hands-free driving.",
        price: "19.99",
        category: "Automotive",
        imageURL: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop",
    },
    // Other
    {
        name: "Portable Power Bank 20000mAh",
        description: "High-capacity portable charger with fast charging support. Keep your devices powered on the go.",
        price: "49.99",
        category: "Other",
        imageURL: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    },
    {
        name: "Wireless Keyboard & Mouse",
        description: "Ergonomic wireless combo with silent keys and precise tracking. Boost your productivity.",
        price: "69.99",
        category: "Other",
        imageURL: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    },
];

const seedDatabase = async () => {
    try {
        // Connect to database
        console.log("Connecting to database...");
        await mongoose.connect(config.dbUri);
        console.log("✅ Database connected successfully!");

        // Clear existing data
        console.log("\n🗑️  Clearing existing data...");
        await UserModel.deleteMany({});
        await ProductModel.deleteMany({});
        console.log("✅ Existing data cleared!");

        // Create users
        console.log("\n👥 Creating users...");
        const createdUsers = await UserModel.create(users);
        console.log(`✅ Created ${createdUsers.length} users!`);

        // Display created users
        console.log("\n📋 User Summary:");
        const adminUsers = createdUsers.filter(u => u.role === "admin");
        const sellerUsers = createdUsers.filter(u => u.role === "seller");
        const regularUsers = createdUsers.filter(u => u.role === "user");

        console.log(`   - Admins: ${adminUsers.length}`);
        adminUsers.forEach(user => console.log(`     • ${user.email} (${user.name})`));

        console.log(`   - Sellers: ${sellerUsers.length}`);
        sellerUsers.forEach(user => console.log(`     • ${user.email} (${user.name})`));

        console.log(`   - Regular Users: ${regularUsers.length}`);
        regularUsers.forEach(user => console.log(`     • ${user.email} (${user.name}) - Verified: ${user.isVerified}`));

        // Create products and assign to sellers
        console.log("\n📦 Creating products...");
        const products = [];

        // Distribute products among sellers
        productsTemplate.forEach((product, index) => {
            const sellerIndex = index % sellerUsers.length;
            products.push({
                ...product,
                seller: sellerUsers[sellerIndex]._id,
            });
        });

        const createdProducts = await ProductModel.create(products);
        console.log(`✅ Created ${createdProducts.length} products!`);

        // Display products by seller
        console.log("\n📦 Products Summary:");
        for (const seller of sellerUsers) {
            const sellerProducts = createdProducts.filter(
                p => p.seller.toString() === seller._id.toString()
            );
            console.log(`   ${seller.name} (${seller.email}):`);
            sellerProducts.forEach(product => {
                console.log(`     • ${product.name} - $${product.price} (${product.category})`);
            });
        }

        // Display summary by category
        console.log("\n📊 Products by Category:");
        const categories = [...new Set(productsTemplate.map(p => p.category))];
        categories.forEach(category => {
            const count = createdProducts.filter(p => p.category === category).length;
            console.log(`   - ${category}: ${count} products`);
        });

        console.log("\n✨ Database seeding completed successfully!");
        console.log("\n🔐 Login Credentials:");
        console.log("   Admin:");
        console.log("     Email: admin@example.com");
        console.log("     Password: admin123");
        console.log("\n   Seller:");
        console.log("     Email: john.seller@example.com");
        console.log("     Password: seller123");
        console.log("\n   User:");
        console.log("     Email: alice@example.com");
        console.log("     Password: user123");

    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log("\n👋 Database connection closed.");
        process.exit(0);
    }
};

// Run the seed function
seedDatabase();
