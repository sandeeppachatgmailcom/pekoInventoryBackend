const MySqlDb = require("../../database/ConnectMySql");

const addItemToPurchaseFn = async ({
    user,
    purchaseId,
    productId,
    quantity,
    UOM,
    rate,
    purchaseGst,
    salesGst,
    hsn_sac,
    batchId,
    batchNumber,
    manufacturingDate,
    expiryDate,
    purchaseOrderId,
}) => {
    console.log({
        user: user,
        purchaseId: purchaseId,
        productId: productId,
        quantity: quantity,
        UOM: UOM,
        rate: rate,
        purchaseGst: purchaseGst,
        salesGst: salesGst,
        hsn_sac: hsn_sac,
        batchId: batchId,
        batchNumber: batchNumber,
        manufacturingDate: manufacturingDate,
        expiryDate: expiryDate,
        purchaseOrderId: purchaseOrderId,
    }, 'aaaaaaa')
    const connection = await MySqlDb.getConnection();

    try {
        await connection.beginTransaction();

        // 1️⃣ Validate purchase exists
        const [purchaseExists] = await connection.query(
            "SELECT id FROM purchase_summary WHERE id = ? AND deleted = 0",
            [purchaseId]
        );
        console.log([purchaseExists])
        if (purchaseExists.length === 0) {
            throw new Error("Purchase bill not found");
        }

        // 2️⃣ Validate product exists
        const [productExists] = await connection.query(
            "SELECT id FROM products WHERE id = ? AND deleted = 0",
            [productId]
        );
        if (productExists.length === 0) {
            throw new Error("Product not found");
        }

        let finalBatchId = batchId;

        // ============================================================
        // 3️⃣ CREATE NEW BATCH IF batchId IS NOT GIVEN
        // ============================================================

        if (!batchId) {

            // Generate batchNumber if missing
            if (!batchNumber) {
                batchNumber = `BN-${Date.now()}`;
            }

            const insertBatchSql = `
                INSERT INTO product_batches
                (productId, UOM, batchNumber, expiryDate, quantity,
                 purchasePrice, sellingPrice, hsn_sac, purchaseGst, salesGst,
                 createdBy, updatedBy)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const [batchResult] = await connection.query(insertBatchSql, [
                productId,
                UOM,
                batchNumber,
                expiryDate || null,
                quantity,
                rate,    // purchasePrice
                rate,    // sellingPrice fallback
                hsn_sac || null,
                purchaseGst || 0,
                salesGst || 0,
                user,
                user
            ]);

            console.log("Batch Insert Result:", batchResult);

            if (!batchResult.insertId) {
                throw new Error("Batch creation failed");
            }

            finalBatchId = batchResult.insertId;
        }

        // 4️⃣ Validate final batch exists
        const [batchCheck] = await connection.query(
            "SELECT id FROM product_batches WHERE id = ? AND deleted = 0",
            [finalBatchId]
        );
        if (batchCheck.length === 0) {
            throw new Error("Batch does not exist after creation");
        }

        // ============================================================
        // 5️⃣ CALCULATE AMOUNT + GST
        // ============================================================

        const amount = quantity * rate;
        const gstAmount = (amount * (purchaseGst || 0)) / 100;

        // ============================================================
        // 6️⃣ INSERT PURCHASE ITEM
        // ============================================================

        const insertItemSql = `
            INSERT INTO purchase_items
            (purchaseId, productId, batchId, quantity, UOM, rate,
             purchaseGst, amount, gstAmount, createdBy, updatedBy)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await connection.query(insertItemSql, [
            purchaseId,
            productId,
            finalBatchId,
            quantity,
            UOM,
            rate,
            purchaseGst || 0,
            amount,
            gstAmount,
            user,
            user
        ]);

        // ============================================================
        // 7️⃣ UPDATE PURCHASE SUMMARY TOTALS
        // ============================================================

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

        const updateSummarySql = `
    UPDATE purchase_summary
    SET totalAmount = ?,
        taxAmount = ?,
        updatedBy = ?,
        updated_at = NOW()
    WHERE id = ?
`;

        await connection.query(updateSummarySql, [
            totals[0].totalAmount,
            totals[0].taxAmount,
            user,
            purchaseId
        ]);

        await connection.commit();

        return {
            status: true,
            message: "Item added successfully",
            data: {
                purchaseId,
                productId,
                batchId: finalBatchId,
                batchNumber,
                UOM,
                quantity,
                rate,
                amount,
                gstAmount
            }
        };

    } catch (error) {
        await connection.rollback();
        return { status: false, message: error.message };
    } finally {
        connection.release();
    }
};

module.exports = addItemToPurchaseFn;
