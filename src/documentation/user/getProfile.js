/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get logged-in user profile
 *     description: >
 *       Fetches the profile details of the currently authenticated user.  
 *       Requires a valid JWT token in the Authorization header.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged-in user profile details fetched successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Profile fetched successfully"
 *               data:
 *                 id: "67b6f6da8f963fae8ff8d15f"
 *                 firstName: "John"
 *                 lastName: "Doe"
 *                 email: "john@example.com"
 *                 phone: "+919876543210"
 *                 role: "admin"
 *                 isActive: true
 *                 createdAt: "2025-02-15T10:20:30.000Z"
 *                 updatedAt: "2025-02-16T11:40:10.000Z"
 *       401:
 *         description: Unauthorized or token expired
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Token missing or invalid"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Unable to fetch profile"
 */
