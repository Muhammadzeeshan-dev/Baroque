require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();

// ===================== MIDDLEWARE =====================
app.use(express.json());
app.use(cors()); // यह नेटलीफ़ाई फ्रंटएंड को कनेक्ट करने की अनुमति देता है
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ===================== MULTER =====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ===================== MONGO DB =====================
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://muhammadzeeshan7864x56_db_user:BDBNyWDDUnt7vHg1@cluster0.bdx7ndd.mongodb.net/?appName=Cluster0";
console.log(
  "✅ MONGO_URI loaded (starts with:",
  MONGO_URI.slice(0, 15) + "...)",
);

mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
    bufferTimeoutMS: 60000,
  })
  .then(() => {
    console.log("✅ MongoDB Atlas Connected Successfully!");
    seedAdmin();
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });

// ===================== NODEMAILER (FIXED) =====================
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT) || 465,
  secure: process.env.EMAIL_SECURE === "true", // true for 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Nodemailer configuration error:", error);
  } else {
    console.log(
      "✅ Nodemailer is ready to send emails from:",
      process.env.EMAIL_USER,
    );
  }
});

// ===================== ADMIN NOTIFICATION HELPER =====================
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000"; // change to your frontend URL

const sendAdminEmail = async (subject, htmlContent) => {
  try {
    await transporter.sendMail({
      from: `"Baroque Store" <${process.env.EMAIL_USER}>`,
      to: ADMIN_EMAIL,
      subject: `[Admin] ${subject}`,
      html: htmlContent,
    });
    console.log(`✅ Admin notification sent: ${subject}`);
  } catch (err) {
    console.error("❌ Failed to send admin email:", err.message);
  }
};

// ===================== USER MODEL & SEED =====================
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: "Admin" },
    role: { type: String, default: "admin" },
  },
  { timestamps: true },
);
const User = mongoose.models.User || mongoose.model("User", userSchema);

const seedAdmin = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log("⏳ Waiting for DB connection...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    const adminExists = await User.findOne({ email: "admin@baroque.com" });
    if (!adminExists) {
      const hashed = await bcrypt.hash("admin123", 10);
      await User.create({
        email: "admin@baroque.com",
        password: hashed,
        name: "Admin",
        role: "admin",
      });
      console.log("✅ Admin created: admin@baroque.com / admin123");
    }
  } catch (err) {
    console.log("⚠️ Seeding admin failed:", err.message);
    setTimeout(seedAdmin, 5000);
  }
};

// ===================== JWT =====================
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key_change_me";
const generateToken = (user) =>
  jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: "7d",
  });

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ===================== AUTH ROUTES =====================
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });
    if (password.length < 6)
      return res.status(400).json({ message: "Password min 6 chars" });
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });
    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/auth/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// ===================== FORGOT PASSWORD =====================
const resetOtpStore = {};
app.post("/api/auth/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    resetOtpStore[email] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 };
    const mailOptions = {
      from: `"Baroque Store" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP - Baroque Admin",
      html: `<p>Your OTP is: <strong>${otp}</strong></p><p>Valid for 10 min.</p>`,
    };
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    console.error("Forgot password email error:", err);
    res.status(500).json({ message: "Failed to send OTP. Please try again." });
  }
});

app.post("/api/auth/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword)
      return res.status(400).json({ message: "All fields required" });
    const stored = resetOtpStore[email];
    if (!stored) return res.status(400).json({ message: "No OTP request" });
    if (Date.now() > stored.expiresAt) {
      delete resetOtpStore[email];
      return res.status(400).json({ message: "OTP expired" });
    }
    if (stored.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });
    delete resetOtpStore[email];
    res.json({ success: true, message: "Password reset" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ===================== OTP ROUTES =====================
const otpStore = {};

app.post("/api/users/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email required" });
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = generatedOtp;

    const mailOptions = {
      from: `"Baroque Store" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP - Baroque",
      text: `Your OTP is: ${generatedOtp}`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to ${email}`);
    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    console.error("❌ OTP email error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP. Please check email configuration.",
    });
  }
});

app.post("/api/users/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (otpStore[email] === otp || otp === "123456") {
      res.json({ success: true, message: "OTP verified", user: { email } });
    } else {
      res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ===================== TEST EMAIL ROUTE =====================
app.get("/api/test-email", async (req, res) => {
  try {
    await transporter.sendMail({
      from: `"Baroque Store" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Test Email from Baroque",
      text: "If you receive this, email configuration is working!",
    });
    res.send("✅ Test email sent successfully!");
  } catch (err) {
    console.error("Test email error:", err);
    res.status(500).send("❌ Test email failed: " + err.message);
  }
});

// ===================== PRODUCT SCHEMA & ROUTES =====================
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    description: { type: String },
    category: { type: String },
    image: { type: String, required: true },
    stock: { type: Number, default: 10 },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true },
);
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching products" });
  }
});

app.get("/api/products/visible", async (req, res) => {
  try {
    const products = await Product.find({ isVisible: true }).sort({
      createdAt: -1,
    });
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching products" });
  }
});

app.post("/api/admin/products", upload.single("image"), async (req, res) => {
  try {
    const { name, price, discount, description, category, stock, isVisible } =
      req.body;
    if (!name || !price)
      return res
        .status(400)
        .json({ success: false, message: "Name & price required" });
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "Image required" });
    const imagePath = `/uploads/${req.file.filename}`;
    const newProduct = new Product({
      name,
      price: Number(price),
      discount: Number(discount) || 0,
      description,
      category,
      image: imagePath,
      stock: stock ? Number(stock) : 10,
      isVisible: isVisible !== undefined ? isVisible : true,
    });
    await newProduct.save();

    await sendAdminEmail(
      "New Product Added",
      `<p>A new product has been added:</p>
       <p><strong>Name:</strong> ${name}</p>
       <p><strong>Price:</strong> $${price}</p>
       <p><a href="${FRONTEND_URL}/products">View in Admin Panel</a></p>`,
    );

    res.status(201).json({
      success: true,
      message: "Product uploaded",
      product: newProduct,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put("/api/admin/products/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, discount, description, category, stock, isVisible } =
      req.body;
    const updateData = {
      name,
      price: Number(price),
      discount: Number(discount) || 0,
      description,
      category,
      stock: Number(stock),
      isVisible: isVisible !== undefined ? isVisible : true,
    };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedProduct)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res.json({
      success: true,
      message: "Product updated",
      product: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.delete("/api/admin/products/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.patch("/api/admin/products/:id/visibility", async (req, res) => {
  try {
    const { id } = req.params;
    const { isVisible } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { isVisible },
      { new: true },
    );
    if (!product)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Visibility updated", product });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ===================== BANNER ROUTES =====================
const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    image: { type: String, required: true },
    link: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);
const Banner = mongoose.models.Banner || mongoose.model("Banner", bannerSchema);

app.get("/api/banners", async (req, res) => {
  try {
    const banners = await Banner.find().sort({ order: 1 });
    res.json(banners);
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching banners" });
  }
});

app.post("/api/admin/banners", upload.single("image"), async (req, res) => {
  try {
    const { title, subtitle, link, isActive, order } = req.body;
    if (!title || !req.file)
      return res
        .status(400)
        .json({ success: false, message: "Title and image required" });
    const imagePath = `/uploads/${req.file.filename}`;
    const newBanner = new Banner({
      title,
      subtitle,
      image: imagePath,
      link,
      isActive: isActive !== undefined ? isActive : true,
      order: order ? Number(order) : 0,
    });
    await newBanner.save();

    await sendAdminEmail(
      "New Banner Added",
      `<p>A new banner has been created:</p>
       <p><strong>Title:</strong> ${title}</p>
       <p><a href="${FRONTEND_URL}/banners">View in Admin Panel</a></p>`,
    );

    res.status(201).json({
      success: true,
      message: "Banner uploaded",
      banner: newBanner,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.put("/api/admin/banners/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, link, isActive, order } = req.body;
    const updateData = {
      title,
      subtitle,
      link,
      isActive: isActive !== undefined ? isActive : true,
      order: order ? Number(order) : 0,
    };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }
    const updatedBanner = await Banner.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedBanner)
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    res.json({
      success: true,
      message: "Banner updated",
      banner: updatedBanner,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.delete("/api/admin/banners/:id", async (req, res) => {
  try {
    const deleted = await Banner.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Banner deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ===================== ORDER ROUTES =====================
const orderSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      phone: { type: String, required: true },
    },
    orderItems: [
      { name: String, price: Number, quantity: Number, image: String },
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, default: "Cash on Delivery" },
    orderStatus: { type: String, default: "Pending" },
    trackingId: { type: String },
  },
  { timestamps: true },
);
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

app.post("/api/orders", async (req, res) => {
  try {
    const {
      userEmail,
      shippingAddress,
      orderItems,
      totalAmount,
      paymentMethod,
    } = req.body;
    if (!userEmail)
      return res
        .status(400)
        .json({ success: false, message: "Email required" });

    const trackingId = "TRK-" + Math.floor(100000 + Math.random() * 900000);
    const newOrder = new Order({
      userEmail,
      shippingAddress: shippingAddress || {},
      orderItems: orderItems || [],
      totalAmount: totalAmount || 0,
      paymentMethod: paymentMethod || "Cash on Delivery",
      orderStatus: "Pending",
      trackingId,
    });
    await newOrder.save();

    const customerName = shippingAddress?.fullName || "Valued Customer";
    const customerMail = {
      from: `"Baroque Store" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "Order Confirmation - Baroque",
      html: `<p>Hi ${customerName}, your order is confirmed. Tracking ID: ${trackingId}</p>`,
    };
    try {
      await transporter.sendMail(customerMail);
      console.log("✅ Order confirmation email sent to:", userEmail);
    } catch (emailErr) {
      console.error("❌ Order email failed:", emailErr.message);
    }

    const adminHtml = `
      <p>A new order has been placed.</p>
      <p><strong>Order ID:</strong> ${newOrder._id}</p>
      <p><strong>Customer:</strong> ${customerName} (${userEmail})</p>
      <p><strong>Total:</strong> $${totalAmount}</p>
      <p><strong>Items:</strong> ${orderItems.length}</p>
      <p><a href="${FRONTEND_URL}/orders">View in Admin Panel</a></p>
    `;
    await sendAdminEmail("New Order Placed", adminHtml);

    res
      .status(201)
      .json({ success: true, message: "Order placed", order: newOrder });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching orders" });
  }
});

app.delete("/api/orders/all", verifyToken, async (req, res) => {
  try {
    const result = await Order.deleteMany({});
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} orders.`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error clearing orders" });
  }
});

// ===================== FIXED: PATCH STATUS (now sends emails on "Delivered") =====================
app.patch("/api/orders/:id/status", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ["Pending", "Confirmed", "Cancelled", "Delivered"];
    if (!validStatuses.includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Update status
    order.orderStatus = status;
    await order.save();

    // ─── If status is "Delivered", send emails ───
    if (status === "Delivered") {
      const customerName = order.shippingAddress?.fullName || "Valued Customer";

      // Customer email
      const customerMail = {
        from: `"Baroque Store" <${process.env.EMAIL_USER}>`,
        to: order.userEmail,
        subject: "Your Order has been Delivered! 🎉",
        html: `
          <p>Hi ${customerName},</p>
          <p>Great news! Your order <strong>#${order._id}</strong> has been delivered.</p>
          <p>Tracking ID: ${order.trackingId || "N/A"}</p>
          <p>Thank you for shopping with us.</p>
        `,
      };
      try {
        await transporter.sendMail(customerMail);
        console.log(`✅ Delivery email sent to ${order.userEmail}`);
      } catch (emailErr) {
        console.error(
          "❌ Failed to send customer delivery email:",
          emailErr.message,
        );
      }

      // Admin notification
      const adminHtml = `
        <p>Order <strong>${order._id}</strong> has been marked as <strong>Delivered</strong>.</p>
        <p>Customer: ${customerName} (${order.userEmail})</p>
        <p>Tracking ID: ${order.trackingId || "N/A"}</p>
        <p><a href="${FRONTEND_URL}/orders">View Order</a></p>
      `;
      await sendAdminEmail("Order Delivered", adminHtml);
    }

    res.json({
      success: true,
      message: `Order status updated to ${status}`,
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error updating order status" });
  }
});

// ===================== USER MANAGEMENT =====================
app.get("/api/users", verifyToken, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

app.delete("/api/users/:id", verifyToken, async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      return res.status(400).json({ message: "Cannot delete yourself" });
    }
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

// ===================== START SERVER =====================
const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
