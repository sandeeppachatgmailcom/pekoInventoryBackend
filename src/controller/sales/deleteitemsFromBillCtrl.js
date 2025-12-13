const deleteItemsFromBillFn = require("../../model/sales/deleteItemsFromBillFn");

const deleteitemsFromBillCtrl =async  (req,res,next)=>{
    try {
        const { salesId, itemId ,batchId } = req.query;
        const user = req.user.id;
        // Call the model function to delete item from bill
         const result =await  deleteItemsFromBillFn({ salesId, itemId, batchId, user });
        res.json(result);
    } catch (error) {
        next(error)
    }
}

module.exports = deleteitemsFromBillCtrl;   