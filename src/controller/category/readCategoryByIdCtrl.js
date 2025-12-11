const readCategoryFn = require("../../model/category/readCategoryFn");

const readCategoryByIdCtrl =async (req, res, next) => {
    try {
        const { categoryId } = req.params
        const userId = req.user?.id || null;
        const result =await readCategoryFn({categoryId,userId})
        res.json(result)
    } catch (error) {
        next(error)
    }
}
module.exports = readCategoryByIdCtrl