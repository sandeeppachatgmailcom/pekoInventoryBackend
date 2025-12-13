const deleteSalesBillFn = require("../../model/sales/deleteSalesBillFn");

const deleteSalesBillCtrl = async (req,res,next)=>{
try {
    const { salesId } = req.params;
    const result = await deleteSalesBillFn({ salesId });
    res.json(result)
} catch (error) {
    next(error)
}
}
module.exports = deleteSalesBillCtrl