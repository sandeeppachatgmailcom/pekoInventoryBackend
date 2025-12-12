const getProductsByIdFn = require("../../model/product/getProductsByIdFn")

const getProductsByIdCtrl =async (req,res,next) => {
    try {
        const {productId} = req.params
        const userId = req.user?.id
        const result = await getProductsByIdFn({productId,userId})
        res.json(result)
    } catch (error) {
        next(error)
    }
}
module.exports = getProductsByIdCtrl