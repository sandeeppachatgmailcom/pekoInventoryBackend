const MySqlDb = require("../../database/ConnectMySql");
const bcrypt = require("bcryptjs");

const createUserFn = async ({ name, email, password, isAdmin = 0 }) => {
    const connection = await MySqlDb.getConnection();

    try {
        
        const [existing] = await connection.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existing.length > 0) {
            return { status: false, message: "Email already exists" };
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);
 
        const insertSql = `
            INSERT INTO users (name, email, password, isAdmin, createdAt)
            VALUES (?, ?, ?, ?, NOW())
        `;

        const [result] = await connection.query(insertSql, [
            name,
            email,
            hashedPassword,
            isAdmin
        ]);

        return {
            status: true,
            message: "User created successfully",
            data: {
                id: result.insertId,
                name,
                email,
                isAdmin
            }
        };

    } catch (error) {
        return { status: false, message: error.message };
    } finally {
        connection.release();
    }
};

module.exports = createUserFn;
