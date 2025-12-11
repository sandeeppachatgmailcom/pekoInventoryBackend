const MySqlDb = require("../../database/ConnectMySql");

const updateCategoryFn = async ({ categoryId, categoryName, description, userId }) => {
  try {
     
    if (!categoryId) {
      return { status: false, message: "categoryId is required" };
    }

    if (!categoryName || categoryName.trim() === "") {
      return { status: false, message: "categoryName is required" };
    }

    
    const [exists] = await MySqlDb.query(
      "SELECT id FROM categories WHERE id = ? AND deleted = 0",
      [categoryId]
    );

    if (exists.length === 0) {
      return { status: false, message: "Category not found" };
    }

     
    const [duplicate] = await MySqlDb.query(
      "SELECT id FROM categories WHERE name = ? AND id != ? AND deleted = 0",
      [categoryName, categoryId]
    );

    if (duplicate.length > 0) {
      return { status: false, message: "Category name already taken" };
    }

    
    await MySqlDb.query(
      `UPDATE categories 
       SET name = ?, description = ?, updatedBy = ?
       WHERE id = ?`,
      [categoryName, description || null, userId || null, categoryId]
    );

    return {
      status: true,
      message: "Category updated successfully",
      data: {
        categoryId,
        categoryName,
        description
      }
    };

  } catch (error) {
    console.error("updateCategoryFn ERROR:", error);
    return { status: false, message: error.message };
  }
};

module.exports = updateCategoryFn;
