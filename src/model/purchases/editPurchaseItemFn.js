const MySqlDb = require("../../database/ConnectMySql");

const editPurchaseItemFn = async ({
    purchaseDetailId,   
    purchaseId,
    itemId,
    productId,
    quantity,
    UOM,
    rate,
    purchaseGst,
    salesGst,
    hsn_sac,
    batchNumber,
    expiryDate,
    user
}) => {

    const connection = await MySqlDb.getConnection();

    try {
        await connection.beginTransaction();

        // Determine which ID to operate on
        const targetItemId = purchaseDetailId || itemId;

        // 1️⃣ Validate purchase item
        const [oldItem] = await connection.query(
            `
            SELECT id, batchId, quantity AS oldQty, rate, purchaseGst 
            FROM purchase_items
            WHERE id = ? AND purchaseId = ? AND deleted = 0
            `,
            [ purchaseDetailId,purchaseId]
        );

        if (oldItem.length === 0) {
            throw new Error("Purchase item not found");
        }

        const { batchId: oldBatchId, oldQty } = oldItem[0];

        let newBatchId = oldBatchId;

        // 2️⃣ Get old batch info
        const [oldBatch] = await connection.query(
            `
            SELECT id, batchNumber 
            FROM product_batches
            WHERE id = ?
            `,
            [oldBatchId]
        );

        if (oldBatch.length === 0) {
            throw new Error("Old batch not found");
        }

        const oldBatchNumber = oldBatch[0].batchNumber;

        // ================================================================
        // 3️⃣ If batchNumber changed → create a new batch
        // ================================================================
        if (batchNumber && batchNumber !== oldBatchNumber) {

            const insertBatchSql = `
                INSERT INTO product_batches
                (productId, UOM, batchNumber, expiryDate, quantity,
                 purchasePrice, sellingPrice, hsn_sac,
                 purchaseGst, salesGst, createdBy, updatedBy)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const [batchResult] = await connection.query(insertBatchSql, [
                productId,
                UOM,
                batchNumber,
                expiryDate || null,
                quantity,
                rate,
                rate,
                hsn_sac || null,
                purchaseGst || 0,
                salesGst || 0,
                user,
                user
            ]);

            if (!batchResult.insertId) {
                throw new Error("Failed to create new batch");
            }

            newBatchId = batchResult.insertId;

            // 🌟 Restore old batch quantity
            await connection.query(
                `
                UPDATE product_batches
                SET quantity = quantity - ?,
                    updatedBy = ?,
                    updated_at = NOW()
                WHERE id = ?
                `,
                [oldQty, user, oldBatchId]
            );
        }

        // ================================================================
        // 4️⃣ If batchNumber same → update existing batch stock diff
        // ================================================================
        if (batchNumber === oldBatchNumber) {
            const qtyDiff = quantity - oldQty;

            await connection.query(
                `
                UPDATE product_batches
                SET quantity = quantity + ?,
                    updatedBy = ?,
                    updated_at = NOW()
                WHERE id = ?
                `,
                [qtyDiff, user, oldBatchId]
            );
        }

        // ================================================================
        // 5️⃣ Update purchase_items record
        // ================================================================
        const amount = quantity * rate;
        const gstAmount = (amount * (purchaseGst || 0)) / 100;

        await connection.query(
            `
            UPDATE purchase_items
            SET productId = ?,
                batchId = ?,
                quantity = ?,
                UOM = ?,
                rate = ?,
                purchaseGst = ?,
                amount = ?,
                gstAmount = ?,
                updatedBy = ?,
                updated_at = NOW()
            WHERE id = ?
            `,
            [
                productId,
                newBatchId,
                quantity,
                UOM,
                rate,
                purchaseGst || 0,
                amount,
                gstAmount,
                user,
                targetItemId
            ]
        );

        // ================================================================
        // 6️⃣ Recalculate purchase summary totals
        // ================================================================
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
            SET totalAmount = ?, taxAmount = ?,
                updatedBy = ?, updated_at = NOW()
            WHERE id = ?
            `,
            [totals[0].totalAmount, totals[0].taxAmount, user, purchaseId]
        );

        await connection.commit();

        return {
            status: true,
            message: "Purchase item updated successfully",
            data: {
                purchaseId,
                itemId: targetItemId,
                newBatchId,
                batchNumber,
                quantity,
                rate,
                amount
            }
        };

    } catch (error) {
        await connection.rollback();
        return { status: false, message: error.message };
    } finally {
        connection.release();
    }
};

module.exports = editPurchaseItemFn;
