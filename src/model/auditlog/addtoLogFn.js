const MySqlDb = require("../../database/ConnectMySql");

const auditLogFn = async ({
    userId,
    username,
    role,
    module,
    action,
    recordId,
    recordType,
    beforeData = null,
    afterData = null,
    ipAddress = null,
    userAgent = null,
    notes = null
}) => {
    const connection = await MySqlDb.getConnection();

    try {
        const insertSql = `
            INSERT INTO audit_log
            (userId, username, role, module, action, recordId, recordType,
             before_data, after_data, ip_address, user_agent, notes, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `;

        await connection.query(insertSql, [
            userId,
            username,
            role,
            module,
            action,
            recordId,
            recordType,
            beforeData ? JSON.stringify(beforeData) : null,
            afterData ? JSON.stringify(afterData) : null,
            ipAddress,
            userAgent,
            notes
        ]);

        return { status: true, message: "Audit log added" };

    } catch (error) {
        return { status: false, message: error.message };
    } finally {
        connection.release();
    }
};

module.exports = auditLogFn;
