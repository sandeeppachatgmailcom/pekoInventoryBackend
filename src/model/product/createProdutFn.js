const MySqlDb = require("../../database/ConnectMySql");

const createProdutFn = async ({
    productName,
    sku,
    uom,
    description,
    categoryIds = [],
    image,
    userId
}) => {
    const connection = await MySqlDb.getConnection();

    try {
        await connection.beginTransaction();
        console.log(productName,
            sku,
            uom,
            description,
            categoryIds = [],
            image,
            userId)
        const insertProductSql = `
            INSERT INTO products 
                (name, productCode, uom, description, image, createdBy) 
            VALUES (?, ?, ?, ?, ?,?)
        `;

        const [productResult] = await connection.query(insertProductSql, [
            productName,
            sku,
            uom,
            description,
            image,
            userId        // correct position
        ]);

        const productId = productResult.insertId;

        if (Array.isArray(categoryIds) && categoryIds.length > 0) {
            const insertCategorySql = `
                INSERT INTO product_categories (productId, categoryId, createdBy)
                VALUES (?, ?, ?)
            `;

            for (let categoryId of categoryIds) {
                await connection.query(insertCategorySql, [
                    productId,
                    categoryId,
                    userId
                ]);
            }
        }

        await connection.commit();

        return {
            status: true,
            message: "Product created successfully",
            data: {
                productId,
                productName,
                sku,
                categoryIds
            }
        };

    } catch (error) {
        await connection.rollback();
        return { status: false, message: error.message };
    } finally {
        connection.release();
    }
};

module.exports = createProdutFn;
