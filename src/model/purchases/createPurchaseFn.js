const MySqlDb = require("../../database/ConnectMySql");

const createPurchaseFn = async ({
    supplierId,
    purchaseDate,
    invoiceNumber,
    notes,
    placeOfSupply,
    totalAmount,
    taxAmount,
    cgst,
    sgst,
    igst,
    user
}) => {
    const connection = await MySqlDb.getConnection();

    try {
         
        if (!supplierId) {
            return { status: false, message: "Supplier ID is required" };
        }
        if (!invoiceNumber) {
            return { status: false, message: "Invoice number is required" };
        }
 
        const insertSql = `
            INSERT INTO purchase_summary
            (
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
                createdBy,
                updatedBy,
                created_at,
                updated_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;

        const [result] = await connection.query(insertSql, [
            supplierId,
            invoiceNumber,
            purchaseDate,
            notes || null,
            placeOfSupply || null,
            totalAmount || 0,
            taxAmount || 0,
            cgst || 0,
            sgst || 0,
            igst || 0,
            user,
            user
        ]);

        return {
            status: true,
            message: "Purchase created successfully",
            data: {
                id: result.insertId,
                supplierId,
                invoiceNumber,
                purchaseDate,
                notes,
                placeOfSupply,
                totalAmount,
                taxAmount,
                cgst,
                sgst,
                igst
            }
        };

    } catch (error) {
        return { status: false, message: error.message };
    } finally {
        connection.release();
    }
};

module.exports = createPurchaseFn;
