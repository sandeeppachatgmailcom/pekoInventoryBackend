const logOutUserCtrl = (req, res, next) => {
    try {

        res.clearCookie("auth_token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });
        /**
         * token blackliting is no implemented 
         */
        return res.json({
            status: true,
            message: "Logout successful"
        });

    } catch (error) {
        next(error);
    }
};

module.exports = logOutUserCtrl;
