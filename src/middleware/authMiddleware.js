const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const publicRoutes = ["/users/login", "/api-docs"];

        
        if (publicRoutes.some(route => req.path.startsWith(route))) {
            return next();
        }

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

        const parts = req.path.split("/").filter(Boolean);

        req.user = {
            id: decoded.id,
            email: decoded.email,
            isAdmin: decoded.isAdmin,
            module: parts[0] || null,
            action: parts[1] || null
        };

        next();

    } catch (error) {
        return res.status(401).json({
            status: false,
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;
