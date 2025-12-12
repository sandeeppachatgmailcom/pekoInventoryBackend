const MySqlDb = require("../../database/ConnectMySql");

const getPurchaseBillFn = async ({ purchaseId }) => {
    const connection = await MySqlDb.getConnection();

    try {
        // 1️⃣ Fetch purchase summary
        const [purchase] = await connection.query(
            `
            SELECT 
                id,
                supplierId,
                invoiceNumber,
                invoiceDate,
                notes,
                placeOfSupply,
                totalAmount,
                taxAmount,
                cgstAmount,
                sgstAmount,
                igstAmount,
                deleted,
                created_at,
                updated_at
            FROM purchase_summary
            WHERE id = ? AND deleted = 0
            `,
            [purchaseId]
        );

        if (purchase.length === 0) {
            return { status: false, message: "Purchase bill not found" };
        }

        const summary = purchase[0];

        // 2️⃣ Fetch purchase items + product + batch details
        const [items] = await connection.query(
            `
            SELECT 
                pi.id AS itemId,
                pi.productId,
                p.name AS productName,
                pi.batchId,
                pb.batchNumber,
                pb.expiryDate,
                pi.quantity,
                pi.UOM,
                pi.rate,
                pi.purchaseGst,
                pi.amount,
                pi.gstAmount,
                pi.created_at,
                pi.updated_at
            FROM purchase_items pi
            LEFT JOIN products p ON pi.productId = p.id
            LEFT JOIN product_batches pb ON pi.batchId = pb.id
            WHERE pi.purchaseId = ? AND pi.deleted = 0
            `,
            [purchaseId]
        );

        return {
            status: true,
            message: "Purchase bill fetched successfully",
            data: {
                purchaseSummary: summary,
                items
            }
        };

    } catch (error) {
        return { status: false, message: error.message };
    } finally {
        connection.release();
    }
};

module.exports = getPurchaseBillFn;
