const addToauditLog = require("../../model/auditlog/addToAudit")
const deleteProductFn = require("../../model/product/deleteProductFn")

const deleteProductCtrl =async (req, res, next) => {
    try {
        const {productId} = req.params
        const userId = req.user?.id
        const result = await deleteProductFn({productId,userId})
        await addToauditLog({ req, result, notes: '' })
        res.json(result)
    } catch (error) {
        next(error)
    }
}
module.exports = deleteProductCtrl