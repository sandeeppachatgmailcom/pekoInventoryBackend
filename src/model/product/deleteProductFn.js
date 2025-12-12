const MySqlDb = require("../../database/ConnectMySql");

const deleteProductFn = async ({ productId, userId }) => {
    try {
        
        const [existing] = await MySqlDb.query(
            "SELECT id FROM products WHERE id = ? AND deleted = 0",
            [productId]
        );

        if (existing.length === 0) {
            return {
                status: false,
                message: "Product not found or already deleted"
            };
        }

        
        await MySqlDb.query(
            `UPDATE products 
             SET deleted = 1, updatedBy = ?, updated_at = NOW() 
             WHERE id = ?`,
            [userId, productId]
        );

        
        await MySqlDb.query(
            `UPDATE product_categories 
             SET deleted = 1 
             WHERE productId = ?`,
            [productId]
        );

        return {
            status: true,
            message: "Product deleted successfully"
        };

    } catch (error) {
        return {
            status: false,
            message: error.message
        };
    }
};

module.exports = deleteProductFn;
