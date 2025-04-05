const jwt = require("jsonwebtoken");
const User = require("../models/user");

const  authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ 
                message: "Autentifikatsiya talab qilinadi" 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decoded.userId);
        
        if (!user) {
            return res.status(401).json({ 
                message: "Foydalanuvchi topilmadi" 
            });
        }
        req.user = user;
        next();
        
    } catch (error) {
        res.status(500).json({ 
            message: "Serverda xatolik yuz berdi", 
        });
    }
};

module.exports = authMiddleware; 