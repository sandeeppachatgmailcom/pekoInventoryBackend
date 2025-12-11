const updateCategoryFn = require("../../model/category/updateCategoryFn")

const updateCategoryCtrl = async (req, res, next) => {
    try {
        const { categoryId } = req.params
        const { categoryName, description } = req.body
        console.log(categoryId, categoryName, description, 'categoryId,categoryName,description')
        const result = await updateCategoryFn({ categoryName, categoryId, description })
        const userId = req.users?.id
        res.json(result)
    } catch (error) {
        next(error)
    }
}
module.exports = updateCategoryCtrl