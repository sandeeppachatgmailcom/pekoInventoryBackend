const MySqlDb = require("../../database/ConnectMySql");

const updateProductFn = async ({
    productId,
    productName,
    sku,
    uom,
    description,
    categoryIds = [],
    image,
    user
}) => {
    const connection = await MySqlDb.getConnection();

    try {
        await connection.beginTransaction();

        // 1️⃣ Check product exists
        const [exists] = await connection.query(
            "SELECT id FROM products WHERE id = ? AND deleted = 0",
            [productId]
        );
        if (exists.length === 0) {
            return { status: false, message: "Product not found" };
        }

        // 2️⃣ Update product
        await connection.query(
            `
            UPDATE products SET 
                name = ?, 
                productCode = ?, 
                uom = ?, 
                description = ?, 
                image = ?, 
                updatedBy = ?, 
                updated_at = NOW()
            WHERE id = ?
            `,
            [productName, sku, uom, description, image, user, productId]
        );

        // 🔥 3️⃣ Fetch existing active categories
        const [existingCats] = await connection.query(
            "SELECT categoryId FROM product_categories WHERE productId = ? AND deleted = 0",
            [productId]
        );

        const existingCatIds = existingCats.map(row => String(row.categoryId));
        const newCatIds = categoryIds.map(id => String(id));

        // 🔍 Determine operations
        const toInsert = newCatIds.filter(id => !existingCatIds.includes(id));
        const toDelete = existingCatIds.filter(id => !newCatIds.includes(id));

        // 🔥 4️⃣ Insert only missing categories
        if (toInsert.length > 0) {
            const insertSql = `
                INSERT INTO product_categories (productId, categoryId, createdBy)
                VALUES (?, ?, ?)
            `;
            for (let catId of toInsert) {
                await connection.query(insertSql, [productId, catId, user]);
            }
        }

        // 🔥 5️⃣ Soft delete removed categories
        if (toDelete.length > 0) {
            await connection.query(
                `
                UPDATE product_categories 
                SET deleted = 1, deletedBy = ?, deleted_at = NOW()
                WHERE productId = ? AND categoryId IN (?)
                `,
                [user, productId, toDelete]
            );
        }

        // 6️⃣ Commit
        await connection.commit();

        return {
            status: true,
            message: "Product updated successfully",
            data: {
                productId,
                productName,
                sku,
                uom,
                description,
                image,
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

module.exports = updateProductFn;
