const MySqlDb = require("../../database/ConnectMySql");

const createCategory = async ({ name, description,userId }) => {
    try {
        const [exists] = await MySqlDb.query("SELECT id FROM categories WHERE name = ? AND deleted = 0", [name]);

        if (exists.length > 0) {
            return {
                status: false,
                message: "Category already exists"
            }
        }


        const [result] = await MySqlDb.query(
            "INSERT INTO categories (name, description, createdBy) VALUES (?, ?, ?)",
            [name, description || null, userId]
        );
        return {
            status: true,
            message: "Category created successfully",
            data: {
                id: result.insertId,
                name,
                description
            }
        }

    } catch (error) {
        return {
            status: false,
            message: error.message,
        }
    }
}

module.exports = createCategory