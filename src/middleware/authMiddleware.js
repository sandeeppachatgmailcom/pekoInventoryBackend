const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
         
        const token =
            req.cookies?.auth_token ||
            req.headers["authorization"]?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Access denied. No token provided."
            });
        }

       
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "secret123"
        );

     
        req.user = {
            id: decoded.id,
            email: decoded.email,
            isAdmin: decoded.isAdmin
        };
        console.log(req.user,'current user')
        next();  

    } catch (error) {
        return res.status(401).json({
            status: false,
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;
