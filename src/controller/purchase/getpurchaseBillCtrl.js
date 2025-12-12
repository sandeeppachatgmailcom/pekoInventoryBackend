const getPurchaseBillFn = require("../../model/purchases/getpurchaseBillFn");

const getpurchaseBillCtrl = (req,res,next)=>{
try {
    const purchaseId = req.params
    const userId = req.user?.id;
    const result = getPurchaseBillFn({purchaseId});
    res.json(result)
} catch (error) {
    next(error);
}
}
module.exports = getpurchaseBillCtrl;