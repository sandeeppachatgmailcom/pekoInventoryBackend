const updateProductFn = require("../../model/product/updateProductFn")

const updateProductCtrl = async (req,res,next)=>{
    try {
        console.log('object')
        const { productName , sku  , uom  ,id, description , categoryIds , image  } = req.body
        const {productId } = req.query
        const user = req.user?.id
        console.log(productName , sku  , uom  , description , categoryIds , image,productId)
        const result =  await updateProductFn({productName ,productId:id, sku  , uom  , description , categoryIds , image,user})
        res.json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = updateProductCtrl
