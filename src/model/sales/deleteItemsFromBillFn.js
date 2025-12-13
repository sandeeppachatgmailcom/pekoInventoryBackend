const MySqlDb = require("../../database/ConnectMySql");

const deleteItemsFromBillFn = async ({ salesId, itemId, user }) => {
    const connection = await MySqlDb.getConnection();

    try {
        await connection.beginTransaction();

        // 1️⃣ Validate the item exists
        const [itemRows] = await connection.query(
            `
            SELECT id, batchId, quantity
            FROM sales_items
            WHERE id = ? AND salesId = ? AND deleted = 0
            `,
            [itemId, salesId]
        );

        if (itemRows.length === 0) {
            throw new Error("Sales item not found");
        }

        const item = itemRows[0];

        // 2️⃣ Restore stock to batch
        if (item.batchId) {
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

        // 3️⃣ Soft delete the item
        await connection.query(
            `
            UPDATE sales_items
            SET deleted = 1,
                updatedBy = ?,
                updated_at = NOW()
            WHERE id = ?
            `,
            [user, itemId]
        );

        // 4️⃣ Recalculate totals for the bill
        const [totals] = await connection.query(
            `
            SELECT 
                COALESCE(SUM(lineTotal), 0) AS totalAmount,
                COALESCE(SUM(gstAmount), 0) AS taxAmount
            FROM sales_items
            WHERE salesId = ? AND deleted = 0
            `,
            [salesId]
        );

        const newTotalAmount = totals[0].totalAmount;
        const newTaxAmount = totals[0].taxAmount;

        const cgstAmount = newTaxAmount / 2;
        const sgstAmount = newTaxAmount / 2;
        const igstAmount = 0;

        // 5️⃣ Update sales_summary
        await connection.query(
            `
            UPDATE sales_summary
            SET totalAmount = ?,
                taxAmount = ?,
                cgstAmount = ?,
                sgstAmount = ?,
                igstAmount = ?,
                updatedBy = ?,
                updated_at = NOW()
            WHERE id = ?
            `,
            [
                newTotalAmount,
                newTaxAmount,
                cgstAmount,
                sgstAmount,
                igstAmount,
                user,
                salesId
            ]
        );

        await connection.commit();

        return {
            status: true,
            message: "Sales item deleted and stock restored successfully",
            data: {
                updatedTotals: totals[0]
            }
        };

    } catch (error) {
        await connection.rollback();
        return { status: false, message: error.message };
    } finally {
        connection.release();
    }
};

module.exports =  deleteItemsFromBillFn 
