const addToauditLog = require("../../model/auditlog/addToAudit");
const deleteItemFromPurchaseFn = require("../../model/purchases/deleteItemFromPurchaseFn");

const deleteItemFromPurchaseCtrl =async (req,res,next)=>{
    try {
        const {purchaseId ,itemId ,batchId} = req.query;
        const  result  = await  deleteItemFromPurchaseFn({purchaseId ,itemId ,batchId});
        await addToauditLog({req,result,notes:"Deleted item from purchase bill"});
        res.json(result);
    } catch (error) {
        next(error)
    }
}

module.exports = deleteItemFromPurchaseCtrl;