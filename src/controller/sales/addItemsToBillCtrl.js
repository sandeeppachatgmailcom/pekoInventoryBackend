const addItemsToBillFn = require("../../model/sales/addItemsToBillfn");
 

const addItemsToBillCtrl = async (req, res, next) => {
    try {
        const { salesId, productId, quantity, rate, discount, cgst, sgst, igst, batchId, batchNumber, manufacturingDate, expiryDate, batchSelectionStrategy } = req.body;
        const result = await addItemsToBillFn({ salesId, productId, quantity, rate, discount, cgst, sgst, igst, batchId, batchNumber, manufacturingDate, expiryDate, batchSelectionStrategy });
        res.json(result);
    } catch (error) {
        next(error);
    }
}
module.exports = addItemsToBillCtrl;