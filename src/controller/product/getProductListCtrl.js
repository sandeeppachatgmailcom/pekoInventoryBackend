const getProductsListFn = require("../../model/product/getProductsListFn")

const getProductListCtrl = async (req,res,next)=>{
    try {
        const {page,perPage,searchKey,categoryId} = req.query
        console.log(page,perPage,searchKey,categoryId)
        const result = await getProductsListFn({page:Number(page),perPage:Number(perPage),searchKey,categoryId})
        console.log(result)
        res.json(result)

    } catch (error) {
        next(error)
    }
}

module.exports = getProductListCtrl