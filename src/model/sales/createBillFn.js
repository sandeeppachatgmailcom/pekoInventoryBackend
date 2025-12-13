const MySqlDb = require("../../database/ConnectMySql");

const createBillFn = async ({
    companyId,
    partyId,
    customerName,
    gstNumber,
    invoiceType,
    invoiceDate,
    placeOfSupply,
    notes,
    totalAmount,
    taxAmount,
    cgstAmount,
    sgstAmount,
    igstAmount,
    paymentStatus,
    user
}) => {

    const connection = await MySqlDb.getConnection();

    try {
        await connection.beginTransaction();

        // 1️⃣ AUTO-GENERATE INVOICE NUMBER BASED ON invoiceType
        let prefix;

        switch (invoiceType.toUpperCase()) {
            case "CASH":
                prefix = "C";
                break;
            case "CREDIT":
                prefix = "CR";
                break;
            case "ESTIMATE":
                prefix = "EST";
                break;
            default:
                prefix = invoiceType.substring(0, 2).toUpperCase();
        }

        // Fetch last invoice number for this invoice type
        const [lastInvoice] = await connection.query(
            `
            SELECT invoiceNumber
            FROM sales_summary
            WHERE invoiceType = ?
            ORDER BY id DESC
            LIMIT 1
            `,
            [invoiceType]
        );

        let nextInvoiceNumber;

        if (lastInvoice.length === 0) {
            nextInvoiceNumber = `${prefix}-000001`;
        } else {
            const lastNumber = lastInvoice[0].invoiceNumber.split("-")[1];
            const increment = String(Number(lastNumber) + 1).padStart(6, "0");
            nextInvoiceNumber = `${prefix}-${increment}`;
        }

        // 2️⃣ INSERT INTO sales_summary
        const insertSQL = `
            INSERT INTO sales_summary
            (
                companyId,
                partyId,
                customerName,
                gstNumber,
                invoiceType,
                invoiceNumber,
                invoiceDate,
                placeOfSupply,
                notes,
                totalAmount,
                taxAmount,
                cgstAmount,
                sgstAmount,
                igstAmount,
                paymentStatus,
                createdBy,
                updatedBy
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await connection.query(insertSQL, [
            companyId,
            partyId,
            customerName,
            gstNumber,
            invoiceType,
            nextInvoiceNumber,
            invoiceDate,
            placeOfSupply,
            notes || "",
            totalAmount || 0,
            taxAmount || 0,
            cgstAmount || 0,
            sgstAmount || 0,
            igstAmount || 0,
            paymentStatus || "UNPAID",
            user,
            user
        ]);

        await connection.commit();

        return {
            status: true,
            message: "Invoice created successfully",
            data: {
                invoiceId: result.insertId,
                invoiceNumber: nextInvoiceNumber
            }
        };

    } catch (error) {
        await connection.rollback();
        return {
            status: false,
            message: error.message
        };
    } finally {
        connection.release();
    }
};

module.exports = createBillFn;
