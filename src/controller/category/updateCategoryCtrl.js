const addToauditLog = require("../../model/auditlog/addToAudit")
const auditLogFn = require("../../model/auditlog/addtoLogFn")
const updateCategoryFn = require("../../model/category/updateCategoryFn")

const updateCategoryCtrl = async (req, res, next) => {
    try {
        const { categoryId } = req.params
        const { categoryName, description } = req.body
         
        const result = await updateCategoryFn({ categoryName, categoryId, description })
       
        //add transaction to audit log 
        await addToauditLog({ req, result, notes: 'Category modified ' })

        res.json(result)
    } catch (error) {
        next(error)
    }
}
module.exports = updateCategoryCtrl