const addToauditLog = require("../../model/auditlog/addToAudit");
const auditLogFn = require("../../model/auditlog/addtoLogFn");
const deleteCategoryFn = require("../../model/category/deleteCategoryFn")

const deleteCategoryCtrl = async (req, res, next) => {
    try {
        const { categoryId } = req.params
        const userId = req.user?.id || null;
        const result = await deleteCategoryFn({ categoryId, userId })

        //add transaction to audit log 

        await addToauditLog({ req, result, notes: 'Category deleted ' })


        res.json({ result })
    } catch (error) {
        next(error)
    }
}
module.exports = deleteCategoryCtrl