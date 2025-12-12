const auditLogFn = require("../../model/auditlog/addtoLogFn");
const createCategory = require("../../model/category/createCategoryFn");

const createCategoryCtrl = async (req, res) => {
    try {
        const { categoryName, description } = req.body;
        const userId = req.user?.id || null;


        if (!categoryName) {
            return res.status(400).json({
                status: false,
                message: "Category name is required"
            });
        }
        const result = await createCategory({ description, name:categoryName ,userId})
        await auditLogFn({
            userId: req.user.id,
            username: req.user.email,          
            role: req.user.isAdmin ? "Admin" : "User",
            module: "Category",
            action: "Create",
            recordId: result.data.id,
            recordType: "users",
            beforeData: null,
            afterData: result.data,
            ipAddress: req.ip,
            userAgent: req.headers["user-agent"],
            notes: "New product category created"
        });

        return res.status(201).json(result);

    } catch (error) {
        console.error("CATEGORY CREATE ERROR:", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}

module.exports = createCategoryCtrl