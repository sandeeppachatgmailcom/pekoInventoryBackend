const MySqlDb = require("../../database/ConnectMySql");

const getCategoryListFn = async ({ page = 1, perPage = 10, searchKey = "" }) => {
  try {
    page = Number(page);
    perPage = Number(perPage);

    const offset = (page - 1) * perPage;
    const searchQuery = `%${searchKey}%`;

    // 1️⃣ Fetch paginated list
    const [rows] = await MySqlDb.query(
      `
      SELECT 
        id, 
        name AS categoryName, 
        description, 
        blocked, 
        deleted, 
        created_at 
      FROM categories
      WHERE deleted = 0
      AND (name LIKE ? OR description LIKE ?)
      ORDER BY id DESC
      LIMIT ? OFFSET ?
      `,
      [searchQuery, searchQuery, perPage, offset]  // LIMIT & OFFSET MUST BE NUMBERS
    );

    // 2️⃣ Get total count
    const [countResult] = await MySqlDb.query(
      `
      SELECT COUNT(*) AS total 
      FROM categories
      WHERE deleted = 0
      AND (name LIKE ? OR description LIKE ?)
      `,
      [searchQuery, searchQuery]
    );

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / perPage);

    return {
      status: true,
      message: "Category list fetched successfully",
      data: {
        currentPage: page,
        perPage,
        total,
        totalPages,
        categories: rows
      }
    };

  } catch (error) {
    console.error("Error in getCategoryListFn:", error);
    return { status: false, message: error.message };
  }
};

module.exports = getCategoryListFn;
