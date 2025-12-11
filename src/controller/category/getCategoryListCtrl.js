const getCategoryListFn = require("../../model/category/getCategoryListFn")

const getCategoryListCtrl = async (req, res, next) => {
    try {
        const { page, perPage, search } = req.query
        const result = await getCategoryListFn({ page, perPage, searchKey: search })
        res.json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = getCategoryListCtrl