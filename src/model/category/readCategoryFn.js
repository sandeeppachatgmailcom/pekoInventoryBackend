const MySqlDb = require("../../database/ConnectMySql");

const readCategoryFn = async ({ categoryId }) => {
  try {
    const [result] = await MySqlDb.query(
      "SELECT * FROM categories WHERE id = ? AND deleted = 0",
      [categoryId]
    );

    if (result.length === 0) {
      return { status: false, message: "Category not found" };
    }

    return {
      status: true,
      message: "Category fetched successfully",
      data: result[0]
    };

  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports = readCategoryFn;
