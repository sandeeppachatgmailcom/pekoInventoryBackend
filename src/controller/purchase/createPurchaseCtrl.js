const addToauditLog = require("../../model/auditlog/addToAudit");
const createPurchaseFn = require("../../model/purchases/createPurchaseFn");

const createPurchaseCtrl = async (req, res, next) => {
    try {
        const {
            supplierId,
            purchaseDate,
            invoiceNumber,
            notes,
            placeOfSupply,
            totalAmount,
            taxAmount,
            cgst,
            sgst,
            igst
        } = req.body;
        user = req.user?.id;
        const result = await createPurchaseFn({ cgst, igst, invoiceNumber, notes, placeOfSupply, purchaseDate, sgst, supplierId, taxAmount, totalAmount, user })
        await addToauditLog({ req, result, notes: 'Created Purchase' })
        res.json(result)

    } catch (error) {
        next(error)
    }
}

module.exports = createPurchaseCtrl;