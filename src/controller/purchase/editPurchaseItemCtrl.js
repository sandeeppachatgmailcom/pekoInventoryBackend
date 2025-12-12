const editPurchaseItemFn = require("../../model/purchases/editPurchaseItemFn");

const editPurchaseItemCtrl =async (req, res, next) => {
    try {
        const { purchaseId,purchaseDetailId, purchaseOrderId, productId, quantity, UOM, rate,
            purchaseGst, salesGst, hsn_sac, batchNumber, manufacturingDate, expiryDate, } = req.body;
        console.log(req.body,'aa')
            const user = req.user?.id;
        const result =await editPurchaseItemFn({purchaseDetailId,
            purchaseId, purchaseOrderId, productId, quantity,
            UOM, rate, purchaseGst, salesGst, hsn_sac, batchNumber, manufacturingDate, expiryDate,
        });
        console.log(result)
        res.json(result);

    } catch (error) {
        next(error);
    }
}
module.exports = editPurchaseItemCtrl;