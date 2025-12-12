const MySqlDb = require("../../database/ConnectMySql");

const deleteItemFromPurchaseFn = async ({ purchaseId, itemId, batchId, user }) => {
    const connection = await MySqlDb.getConnection();

    try {
        await connection.beginTransaction();

        // 1️⃣ Validate purchase item exists
        const [item] = await connection.query(
            `
            SELECT id, quantity, amount, gstAmount, productId
            FROM purchase_items
            WHERE id = ? AND purchaseId = ? AND deleted = 0
            `,
            [itemId, purchaseId]
        );

        if (item.length === 0)
            throw new Error("Purchase item not found");

        const { quantity, productId } = item[0];

        // 2️⃣ Soft delete the purchase item
        await connection.query(
            `
            UPDATE purchase_items
            SET deleted = 1,
                updatedBy = ?,
                updated_at = NOW()
            WHERE id = ?
            `,
            [user, itemId]
        );

        // 3️⃣ Restore stock back to batch
        if (batchId) {
            await connection.query(
                `
                UPDATE product_batches
                SET quantity = quantity - ?,
                    updatedBy = ?,
                    updated_at = NOW()
                WHERE id = ?
                `,
                [quantity, user, batchId]
            );
        }

        // 4️⃣ Recalculate totals for purchase_summary
        const [totals] = await connection.query(
            `
            SELECT 
                COALESCE(SUM(amount), 0) AS totalAmount,
                COALESCE(SUM(gstAmount), 0) AS taxAmount
            FROM purchase_items
            WHERE purchaseId = ? AND deleted = 0
            `,
            [purchaseId]
        );

        await connection.query(
            `
            UPDATE purchase_summary
            SET totalAmount = ?,
                taxAmount = ?,
                updatedBy = ?,
                updated_at = NOW()
            WHERE id = ?
            `,
            [totals[0].totalAmount, totals[0].taxAmount, user, purchaseId]
        );

        await connection.commit();

        return {
            status: true,
            message: "Purchase item deleted successfully",
            data: {
                purchaseId,
                deletedItemId: itemId,
                batchId,
                restoredQty: quantity,
                totals: totals[0]
            }
        };

    } catch (error) {
        await connection.rollback();
        return { status: false, message: error.message };
    } finally {
        connection.release();
    }
};

module.exports = deleteItemFromPurchaseFn;
