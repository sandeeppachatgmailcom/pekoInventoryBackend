const createBillFn = require("../../model/sales/createBillFn");

const createBillCtrl = async (req, res, next) => {
    try {
        const {
            customerId,
            customerName,
            invoiceType,
            invoiceDate,
            GSTIN,
            placeOfSupply,
            discount,
            totalAmount,
            taxAmount,
            cgst,
            sgst,
            igst
        } = req.body;

        const user = req.user?.id;

        const result = await createBillFn({
            customerId,
            customerName,
            invoiceType,
            invoiceDate,
            GSTIN,
            placeOfSupply,
            discount,
            totalAmount,
            taxAmount,
            cgst,
            sgst,
            igst,
            user
        });

        res.json(result);

    } catch (error) {
        next(error);
    }
};

module.exports = createBillCtrl;
