const MySqlDb = require("../../database/ConnectMySql");

const createPartyFn = async ({ supplierName, contactPerson, phone, email, address, user }) => {
    const connection = await MySqlDb.getConnection();

    try {
console.log(supplierName, contactPerson, phone, email, address)
       
        const [lastSupplier] = await connection.query(
            "SELECT supplierCode FROM suppliers ORDER BY id DESC LIMIT 1"
        );

        let newCode = "SUP-00001";
        if (lastSupplier.length > 0) {
            const lastCode = lastSupplier[0].supplierCode.replace("SUP-", "");
            const nextNumber = String(Number(lastCode) + 1).padStart(5, "0");
            newCode = `SUP-${nextNumber}`;
        }

        
        const insertSql = `
            INSERT INTO suppliers 
            (supplierCode, name, contactPerson, email, phone, address, createdBy, updatedBy)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await connection.query(insertSql, [
            newCode,
            supplierName,
            contactPerson || null,
            email || null,
            phone || null,
            address || null,
            user,
            user
        ]);

        return {
            status: true,
            message: "Supplier created successfully",
            data: {
                id: result.insertId,
                supplierCode: newCode,
                supplierName,
                contactPerson,
                phone,
                email,
                address
            }
        };

    } catch (error) {
        return { status: false, message: error.message };
    } finally {
        connection.release();
    }
};

module.exports = createPartyFn;
