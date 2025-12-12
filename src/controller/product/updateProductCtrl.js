const addToauditLog = require("../../model/auditlog/addToAudit")
const updateProductFn = require("../../model/product/updateProductFn")

const updateProductCtrl = async (req,res,next)=>{
    try {
         
        const { productName , sku  , uom  ,id, description , categoryIds , image  } = req.body
        const {productId } = req.query
        const user = req.user?.id
        
        const result =  await updateProductFn({productName ,productId:id, sku  , uom  , description , categoryIds , image,user})
        await addToauditLog({ req, result, notes: '' })
        res.json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = updateProductCtrl
