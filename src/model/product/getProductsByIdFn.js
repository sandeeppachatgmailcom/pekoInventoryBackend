
const MySqlDb = require("../../database/ConnectMySql");

const getProductsByIdFn = async ({ productId, userId }) => {
    try {
        
        const [productRows] = await MySqlDb.query(
            `SELECT 
                id,
                productCode,
                name,
                uom,
                image,
                description,
                blocked,
                deleted,
                created_at,
                updated_at
             FROM products
             WHERE id = ? AND deleted = 0`,
            [productId]
        );

        if (productRows.length === 0) {
            return {
                status: false,
                message: "Product not found"
            };
        }

        const product = productRows[0];

      
        const [categoryRows] = await MySqlDb.query(
            `SELECT categoryId 
             FROM product_categories 
             WHERE productId = ? AND deleted = 0`,
            [productId]
        );

        const categoryIds = categoryRows.map(row => row.categoryId);
 
        return {
            status: true,
            message: "Product fetched successfully",
            data: {
                ...product,
                categoryIds
            }
        };

    } catch (error) {
        return {
            status: false,
            message: error.message
        };
    }
};

module.exports = getProductsByIdFn;
