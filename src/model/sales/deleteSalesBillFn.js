const MySqlDb = require("../../database/ConnectMySql");

const deleteSalesBillFn = async ({ salesId, user }) => {
    const connection = await MySqlDb.getConnection();

    try {
        await connection.beginTransaction();

        
        const [billRows] = await connection.query(
            `SELECT id FROM sales_summary WHERE id = ? AND deleted = 0`,
            [salesId]
        );
        if (billRows.length === 0) throw new Error("Sales bill not found");

       
        const [items] = await connection.query(
            `
            SELECT id, batchId, quantity
            FROM sales_items
            WHERE salesId = ? AND deleted = 0
            `,
            [salesId]
        );

        
        for (const item of items) {
            if (!item.batchId) continue;

            await connection.query(
                `
                UPDATE product_batches
                SET quantity = quantity + ?,
                    updatedBy = ?,
                    updated_at = NOW()
                WHERE id = ?
                `,
                [item.quantity, user, item.batchId]
            );
        }

        
        await connection.query(
            `
            UPDATE sales_items
            SET deleted = 1,
                updatedBy = ?,
                updated_at = NOW()
            WHERE salesId = ?
            `,
            [user, salesId]
        );

        
        await connection.query(
            `
            UPDATE sales_summary
            SET deleted = 1,
                updatedBy = ?,
                updated_at = NOW()
            WHERE id = ?
            `,
            [user, salesId]
        );

        await connection.commit();

        return {
            status: true,
            message: "Sales bill deleted and stock restored successfully",
            restoredItems: items.length
        };

    } catch (error) {
        await connection.rollback();
        return { status: false, message: error.message };
    } finally {
        connection.release();
    }
};

module.exports = deleteSalesBillFn;
