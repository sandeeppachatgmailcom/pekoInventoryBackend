const createCategory = require("../../model/category/createCategoryFn");

const createCategoryCtrl = async (req, res) => {
    try {
        const { categoryName, description } = req.body;
        const userId = req.user?.id || null;


        if (!categoryName) {
            return res.status(400).json({
                status: false,
                message: "Category name is required"
            });
        }
        const result = await createCategory({ description, name:categoryName ,userId})

        return res.status(201).json(result);

    } catch (error) {
        console.error("CATEGORY CREATE ERROR:", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}

module.exports = createCategoryCtrl