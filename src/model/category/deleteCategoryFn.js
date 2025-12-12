const MySqlDb = require("../../database/ConnectMySql");

const deleteCategoryFn = async ({ categoryId, userId }) => {
  try {
    // 1. Check if category exists
    const [exists] = await MySqlDb.query(
      "SELECT id FROM categories WHERE id = ? AND deleted = 0",
      [categoryId]
    );

    if (exists.length === 0) {
      return { status: false, message: "Category not found" };
    }

    // 2. Soft delete
    const [result] = await MySqlDb.query(
      "UPDATE categories SET deleted = 1, deletedBy = ? WHERE id = ?",
      [userId, categoryId]
    );

    return {
      status: true,
      message: "Category deleted successfully"
    };

  } catch (error) {
    console.error(error);
    return { status: false, message: error.message +'s' };
  }
};

module.exports = deleteCategoryFn
