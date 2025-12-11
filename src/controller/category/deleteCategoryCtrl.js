const deleteCategoryFn = require("../../model/category/deleteCategoryFn")

const deleteCategoryCtrl = async (req, res, next) => {
    try {
        const { categoryId } = req.params
        const userId = req.user?.id || null;
        const result = await deleteCategoryFn({ categoryId, userId })
        res.json({ result })
    } catch (error) {
        next(error)
    }
}
module.exports = deleteCategoryCtrl