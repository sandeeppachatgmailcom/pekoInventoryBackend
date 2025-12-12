const getPurchaseListFn = require("../../model/purchases/getPurchaseListFn");

const getPurchaseListCtrl =async  (req,res,next) => {
    try {
         const {page,perPage,supplierId,startDate,endDate,search} = req.query;
        const result =await getPurchaseListFn({page,perPage,supplierId,startDate,endDate,search });
        res.json(result);
    } catch (error) {
        next(error);
    }
}
module.exports = getPurchaseListCtrl;