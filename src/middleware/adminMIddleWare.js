const adminMiddleware = (req, res, next) => {
    try {
        
        if (!req.user) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized access. No user found."
            });
        }

        if (!req.user.isAdmin) {
            return res.status(403).json({
                status: false,
                message: "Unauthorized access. Admin only."
            });
        }

        next();  

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Server error in admin middleware"
        });
    }
};

module.exports = adminMiddleware;
