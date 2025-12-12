const addToauditLog = require("../../model/auditlog/addToAudit");
const deletePurchaseBillFn = require("../../model/purchases/deletePurchaseBillFn");

const deletePurchaseBillCtrl =async (req,res,next) => {
    try {
        const {purchaseId} = req.params;
        const user = req.user?.id;
        console.log({user, purchaseId})
        const result = await deletePurchaseBillFn({user, purchaseId});
        await addToauditLog({req,result,notes:"Deleted purchase bill"});
        res.json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = deletePurchaseBillCtrl;