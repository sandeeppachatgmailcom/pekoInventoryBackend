const addToauditLog = require("../../model/auditlog/addToAudit")
const createProdutFn = require("../../model/product/createProdutFn")

const createProductCtrl =async  (req,res,next)=>{
try {
    const {  productName,  sku,  unitPrice,  description,  supplierId,  categoryIds,uom,  image} = req.body
    const userId = req.user?.id
    const result = await createProdutFn({  productName,  sku,uom,  unitPrice,  description,  supplierId,  categoryIds,  image,userId})
    await addToauditLog({ req, result, notes: '' })
    res.json(result)

} catch (error) {
    next(error)
}
}
module.exports = createProductCtrl