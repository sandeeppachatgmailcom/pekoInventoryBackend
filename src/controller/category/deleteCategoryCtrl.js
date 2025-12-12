const auditLogFn = require("../../model/auditlog/addtoLogFn");
const deleteCategoryFn = require("../../model/category/deleteCategoryFn")

const deleteCategoryCtrl = async (req, res, next) => {
    try {
        const { categoryId } = req.params
        const userId = req.user?.id || null;
        const result = await deleteCategoryFn({ categoryId, userId })
        await auditLogFn({
            userId: req.user.id,
            username: req.user.email,          
            role: req.user.isAdmin ? "Admin" : "User",
            module: "Category",
            action: "Create",
            recordId: result.data.id,
            recordType: "Category",
            beforeData: null,
            afterData: result.data,
            ipAddress: req.ip,
            userAgent: req.headers["user-agent"],
            notes: " product category deleted"
        });
        res.json({ result })
    } catch (error) {
        next(error)
    }
}
module.exports = deleteCategoryCtrl