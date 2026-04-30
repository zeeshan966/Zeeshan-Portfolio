const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

// --- 1. Middleware ---
app.use(express.json());

// Professional CORS Configuration for Production
const allowedOrigins = [
    "https://zeeshanchauhanportfolio.netlify.app", // Your Live Netlify Link
    "http://localhost:5173"                       // For Local Testing
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// --- 2. Database Connection ---
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected ✅"))
  .catch(err => console.error("DB Error ❌:", err));

// --- 3. Models ---

// Message Schema
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// User Schema (Admin)
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' } 
});
const User = mongoose.model('User', userSchema);

// --- 4. Security Middlewares ---

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, text: "No token, access denied!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, text: "Invalid Token!" });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, text: "Access Denied: Admins Only!" });
  }
  next();
};

// --- 5. API Routes ---

// [PUBLIC] Health Check
app.get('/', (req, res) => res.send("Zeeshan's Portfolio Server is Live! 🚀"));

// [PUBLIC] POST: Save message (Contact Form)
app.post('/api/messages/send', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json({ success: true, text: "Message stored in MongoDB! ✅" });
  } catch (error) {
    res.status(500).json({ success: false, text: "Failed to save message." });
  }
});

// [AUTH] Admin Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, msg: "Invalid Credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );
    res.json({ success: true, token, role: user.role });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// [PRIVATE] GET: All Messages
app.get('/api/messages/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const allMessages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(allMessages);
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// [PRIVATE] DELETE: Delete Message
app.delete('/api/messages/delete/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await Message.findByIdAndDelete(id);
    if (!deletedMessage) return res.status(404).json({ success: false, text: "Message not found!" });
    res.status(200).json({ success: true, text: "Deleted! 🗑️" });
  } catch (error) {
    res.status(500).json({ success: false, text: "Delete failed" });
  }
});

// [PRIVATE] PUT: Update Message
app.put('/api/messages/update/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMessage = await Message.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedMessage) return res.status(404).json({ success: false, text: "Message not found!" });
    res.status(200).json({ success: true, data: updatedMessage, text: "Updated! 🚀" });
  } catch (error) {
    res.status(500).json({ success: false, text: "Update failed" });
  }
});

// [AUTH] Register Admin (Once per use)
app.post('/api/auth/register-admin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, role: 'admin' });
        await newUser.save();
        res.json({ success: true, msg: "Admin Created!" });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// --- 6. Port and Listener ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));