const addToauditLog = require("../../model/auditlog/addToAudit")
const createPartyFn = require("../../model/parties/createPartyFn")

const createPartyCtrl = async (req, res, next) => {
    try {
        const { supplierName, contactPerson, phone, email, address } = req.body
        const user = req.user?.id

        const result = await createPartyFn({ supplierName, contactPerson, phone, email, address, user })
        console.log(result)
        await addToauditLog({ req, result, notes: 'New Supplier Created' })
        res.json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = createPartyCtrl