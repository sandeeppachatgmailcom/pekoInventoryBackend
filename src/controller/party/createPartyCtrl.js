const createPartyFn = require("../../model/parties/createPartyFn")

const createPartyCtrl =async  (req,res,next) => {
    try {
        const { supplierName, contactPerson, phone, email, address } = req.body
        const user = req.user?.id
        
        const result = await createPartyFn({ supplierName, contactPerson, phone, email, address, user })
        console.log(result)
        res.json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = createPartyCtrl