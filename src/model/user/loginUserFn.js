const MySqlDb = require("../../database/ConnectMySql");
const bcrypt = require("bcryptjs");


const loginUserFn = async ({ email, password }) => {
    const connection = await MySqlDb.getConnection();

    try {
        
        const [userRows] = await connection.query(
            "SELECT id, name, email, password, isAdmin FROM users WHERE email = ?",
            [email]
        );

        if (userRows.length === 0) {
            return { status: false, message: "Invalid email or password" };
        }

        const user = userRows[0];

        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return { status: false, message: "Invalid email or password" };
        }

        

        return {
            status: true,
            message: "Login successful",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                 
            }
        };

    } catch (error) {
        return { status: false, message: error.message };
    } finally {
        connection.release();
    }
};

module.exports = loginUserFn;
