const MySqlDb = require("../../database/ConnectMySql");

const getProductsListFn = async ({ page = 1, perPage = 10, searchKey = "", categoryId = null }) => {
    try {
        const offset = (page - 1) * perPage;

        let whereSQL = "WHERE p.deleted = 0";
        let params = [];

        // Search filter
        if (searchKey) {
            whereSQL += " AND (p.name LIKE ? OR p.productCode LIKE ?)";
            params.push(`%${searchKey}%`, `%${searchKey}%`);
        }

        // Category filter
        let categoryJoin = "";
        if (categoryId) {
            categoryJoin = `
                JOIN product_categories pc 
                    ON pc.productId = p.id AND pc.deleted = 0
            `;
            whereSQL += " AND pc.categoryId = ?";
            params.push(categoryId);
        }

        // 1️⃣ Count total rows
        const countQuery = `
            SELECT COUNT(*) AS total
            FROM products p
            ${categoryJoin}
            ${whereSQL}
        `;
        const [countRows] = await MySqlDb.query(countQuery, params);
        const totalData = countRows[0].total;
        const totalPages = Math.ceil(totalData / perPage);

        // 2️⃣ Fetch paginated products
        const listQuery = `
            SELECT 
                p.id,
                p.productCode,
                p.name,
                p.uom,
                p.image,
                p.description,
                p.blocked,
                p.created_at,
                p.updated_at
            FROM products p
            ${categoryJoin}
            ${whereSQL}
            ORDER BY p.id DESC
            LIMIT ? OFFSET ?
        `;

        const listParams = [...params, perPage, offset];
        const [products] = await MySqlDb.query(listQuery, listParams);

        // 3️⃣ Fetch categories for each product
        for (let product of products) {
            const [catRows] = await MySqlDb.query(
                `SELECT categoryId 
                 FROM product_categories 
                 WHERE productId = ? AND deleted = 0`,
                [product.id]
            );

            product.categoryIds = catRows.map(row => row.categoryId);
        }

        // 4️⃣ Final structured response
        return {
            status: true,
            message: "Products fetched successfully",
            data: {
                currentPage: page,
                perPage,
                totalPages,
                totalData,
                products
            }
        };

    } catch (error) {
        return { status: false, message: error.message };
    }
};

module.exports = getProductsListFn;
