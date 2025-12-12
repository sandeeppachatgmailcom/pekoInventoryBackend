const auditLogFn = require("../../model/auditlog/addtoLogFn");
const createUserFn = require("../../model/user/createUserFn");

const createUserCtrl = async (req, res, next) => {
    try {
        
        if (!req.user?.isAdmin) {
            return res.json({ status: false, message: "Unauthorized access" });
        }

        const { name, email, password, isAdmin } = req.body;

         
        const result = await createUserFn({ name, email, password, isAdmin });

        
        if (!result.status) {
            return res.json(result);
        }

         
        await auditLogFn({
            userId: req.user.id,
            username: req.user.email,         // or req.user.name if available
            role: req.user.isAdmin ? "Admin" : "User",
            module: "User",
            action: "Create",
            recordId: result.data.id,
            recordType: "users",
            beforeData: null,
            afterData: result.data,
            ipAddress: req.ip,
            userAgent: req.headers["user-agent"],
            notes: "New user account created"
        });

        res.json(result);

    } catch (error) {
        next(error);
    }
};

module.exports = createUserCtrl;
