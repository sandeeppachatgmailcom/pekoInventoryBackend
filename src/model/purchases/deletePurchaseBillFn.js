const MySqlDb = require("../../database/ConnectMySql");

const deletePurchaseBillFn = async ({ purchaseId, user }) => {
    const connection = await MySqlDb.getConnection();

    try {
        await connection.beginTransaction();

         
        const [purchase] = await connection.query(
            `SELECT id, deleted FROM purchase_summary WHERE id = ?`,
            [purchaseId]
        );

        if (purchase.length === 0) {
            throw new Error("Purchase bill not found");
        }

        if (purchase[0].deleted === 1) {
            throw new Error("Purchase bill already deleted");
        }

        
        const [items] = await connection.query(
            `
            SELECT id, productId, batchId, quantity 
            FROM purchase_items
            WHERE purchaseId = ? AND deleted = 0
            `,
            [purchaseId]
        );

        
        for (let item of items) {

            // 3A — restore batch quantity
            if (item.batchId) {
                await connection.query(
                    `
                    UPDATE product_batches
                    SET quantity = quantity - ?, 
                        updatedBy = ?,
                        updated_at = NOW()
                    WHERE id = ?
                    `,
                    [item.quantity, user, item.batchId]
                );
            }

           
            await connection.query(
                `
                UPDATE purchase_items
                SET deleted = 1,
                    updatedBy = ?,
                    updated_at = NOW()
                WHERE id = ?
                `,
                [user, item.id]
            );
        }

         
        await connection.query(
            `
            UPDATE purchase_summary
            SET deleted = 1,
                totalAmount = 0,
                taxAmount = 0,
                updatedBy = ?,
                updated_at = NOW()
            WHERE id = ?
            `,
            [user, purchaseId]
        );

        await connection.commit();

        return {
            status: true,
            message: "Purchase bill deleted successfully",
            data: {
                purchaseId,
                deletedItems: items.length
            }
        };

    } catch (error) {
        await connection.rollback();
        return { status: false, message: error.message };
    } finally {
        connection.release();
    }
};

module.exports = deletePurchaseBillFn;
