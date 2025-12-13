const MySqlDb = require("../../database/ConnectMySql");

const addItemsToBillFn = async ({
    salesId,
    productId,
    productCode,
    quantity,
    rate,
    discount = 0,
    cgst = 0,
    sgst = 0,
    igst = 0,
    batchId,
    batchNumber,
    manufacturingDate,
    expiryDate,
    batchSelectionStrategy = "FIFO",
    user
}) => {
    const connection = await MySqlDb.getConnection();

    try {
        await connection.beginTransaction();

         
        const [bill] = await connection.query(
            `SELECT id FROM sales_summary WHERE id = ? AND deleted = 0`,
            [salesId]
        );

        if (bill.length === 0) {
            throw new Error("Sales bill not found");
        }
 
        let selectedBatch = null;

      
        if (batchId) {
            const [b] = await connection.query(
                `SELECT * FROM product_batches WHERE id = ? AND deleted = 0`,
                [batchId]
            );
            if (b.length === 0) throw new Error("Invalid batchId provided");
            selectedBatch = b[0];
        }
 
        else if (productCode && batchNumber) {
            const [b] = await connection.query(
                `
                SELECT pb.*
                FROM product_batches pb
                JOIN products p ON pb.productId = p.id
                WHERE p.productCode = ?
                  AND pb.batchNumber = ?
                  AND pb.deleted = 0
                LIMIT 1
                `,
                [productCode, batchNumber]
            );
            if (b.length === 0) throw new Error("Batch not found for given productCode + batchNumber");
            selectedBatch = b[0];
        }
 
        else if (productId && batchNumber) {
            const [b] = await connection.query(
                `
                SELECT *
                FROM product_batches
                WHERE productId = ?
                  AND batchNumber = ?
                  AND deleted = 0
                LIMIT 1
                `,
                [productId, batchNumber]
            );
            if (b.length === 0) throw new Error("Batch not found for given batchNumber");
            selectedBatch = b[0];
        }
 
        else {
            let orderBy = "pb.created_at ASC"; // FIFO

            if (batchSelectionStrategy === "EXPIRY") {
                orderBy = "pb.expiryDate ASC";
            }

            const [b] = await connection.query(
                `
                SELECT pb.*
                FROM product_batches pb
                WHERE pb.productId = ?
                  AND pb.deleted = 0
                  AND pb.quantity > 0
                ORDER BY ${orderBy}
                LIMIT 1
                `,
                [productId]
            );
            if (b.length === 0) throw new Error("No available batch for this product");
            selectedBatch = b[0];
        }
 
        if (selectedBatch.quantity < quantity) {
            throw new Error(
                `Insufficient stock in batch ${selectedBatch.batchNumber}. Available: ${selectedBatch.quantity}`
            );
        }
 
        await connection.query(
            `
            UPDATE product_batches
            SET quantity = quantity - ?,
                updatedBy = ?,
                updated_at = NOW()
            WHERE id = ?
            `,
            [quantity, user, selectedBatch.id]
        );
 
        const grossAmount = quantity * rate;
        const discountAmount = (grossAmount * discount) / 100;
        const taxableValue = grossAmount - discountAmount;

        const gstPercent = cgst + sgst + igst;
        const gstAmount = (taxableValue * gstPercent) / 100;

        const lineTotal = taxableValue + gstAmount;
 
        const insertSQL = `
            INSERT INTO sales_items
            (
                salesId, productId, batchId, quantity, rate, discount,
                salesGst, taxableValue, gstAmount, lineTotal,
                createdBy, updatedBy
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [insertResult] = await connection.query(insertSQL, [
            salesId,
            productId,
            selectedBatch.id,
            quantity,
            rate,
            discount,
            gstPercent,
            taxableValue,
            gstAmount,
            lineTotal,
            user,
            user
        ]);
 
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

        const cgstAmount = totals[0].taxAmount / 2;
        const sgstAmount = totals[0].taxAmount / 2;
        const igstAmount = 0; // change if interstate logic needed

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
                totals[0].totalAmount,
                totals[0].taxAmount,
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
            message: "Item added to sales bill successfully",
            data: {
                itemId: insertResult.insertId,
                batchId: selectedBatch.id,
                batchNumber: selectedBatch.batchNumber,
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

module.exports = addItemsToBillFn;
