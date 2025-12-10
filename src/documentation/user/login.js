/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User Login
 *     description: >
 *       Authenticates a user using email/phone and password.  
 *       After successful authentication, a **JWT token** will be generated and returned.  
 *       The token must be sent in the Authorization header as `Bearer <token>` for accessing protected routes.  
 *       Password is verified using hashing (e.g., bcrypt) and if valid, JWT is signed with user details such as userId & role.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "Password123"
 *     responses:
 *       200:
 *         description: Login successful. JWT token issued.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Login successful"
 *               token: "eyJhbGciOiJIUzI1NiIsInR..."
 *               user:
 *                 id: "67d29cf933aaa7752c847c3b"
 *                 firstName: "John"
 *                 lastName: "Doe"
 *                 email: "user@example.com"
 *                 role: "admin"
 *       400:
 *         description: Invalid request or missing credentials.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Email and password are required"
 *       401:
 *         description: Unauthorized - Incorrect credentials.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid login credentials"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error"
 */
