const loginUserFn = require("../../model/user/loginUserFn");
const jwt = require("jsonwebtoken");

const loginUserCtrl = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const verifyUser = await loginUserFn({ email, password });

        if (!verifyUser.status) {
            return res.json(verifyUser);
        }

         
        const token = jwt.sign(
            {
                id: verifyUser.data.id,
                email: verifyUser.data.email,
                isAdmin: verifyUser.data.isAdmin
            },
            process.env.JWT_SECRET || "secret123",
            { expiresIn: "1d" }
        );

        
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: false,  
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

      
        verifyUser.data.token = token;

        return res.json(verifyUser);

    } catch (error) {
        next(error)
    }
};

module.exports = loginUserCtrl;
