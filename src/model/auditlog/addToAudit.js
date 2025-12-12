const auditLogFn = require("./addtoLogFn");

 
const addToauditLog = async ({req, result = {}, notes = ""}) => {
    const {
        module,
        action,
        recordType,
    } = req.user;   

    const recordId =
        result?.id ||
        result?.data?.id ||
        req.body?.recordId ||
        null;

    return await auditLogFn({
        userId: req.user?.id,
        username: req.user?.email,
        role: req.user?.isAdmin ? "Admin" : "User",
        module,
        action,
        recordId,
        recordType: recordType || null,
        beforeData: null,                       
        afterData: result?.data || result || {}, 
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
        notes
    });
};

module.exports = addToauditLog;
