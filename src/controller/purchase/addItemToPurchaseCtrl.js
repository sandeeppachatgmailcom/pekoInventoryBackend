const addToauditLog = require("../../model/auditlog/addToAudit");
const addItemToPurchaseFn = require("../../model/purchases/addItemToPurchaseFn");

const addItemToPurchaseCtrl =async (req, res, next) => {
    try {
        const
            {
                purchaseId,
                purchaseOrderId,
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
            } = req.body;
        const user = req.user?.id;
        const result =await  addItemToPurchaseFn({
            user, purchaseId,
            purchaseOrderId,
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
        })
        await addToauditLog({req,result,notes:"Added item to purchase bill"});
        res.json(result);


    } catch (error) {
        next(error);
    }
}


module.exports = addItemToPurchaseCtrl;