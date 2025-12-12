/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Create a new user
 *     description: Registers a new user into the system. Only Admin has access to create users.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "P@ssword123"
 *               isAdmin:
 *                 type: Boolean
 *                  
 *                 example: true
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "User created successfully"
 *               data:
 *                 id: 1
 *                 name: "John Doe"
 *                 email: "john@example.com"
 *                 role: "Manager"
 *       400:
 *         description: Validation error or missing fields.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Name, Email, Password and Role are required"
 *       409:
 *         description: Email already exists.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "User with this email already exists"
 *       401:
 *         description: Unauthorized - Only Admin can create users.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error"
 */
