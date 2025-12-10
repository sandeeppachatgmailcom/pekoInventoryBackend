/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Logout user and invalidate token
 *     description: >
 *       Logs out the currently authenticated user by invalidating/removing their JWT token.  
 *       Implementation may vary — token can be blacklisted/expired/removed from Redis/DB.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Logout successful"
 *       401:
 *         description: Unauthorized or invalid token
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Token invalid or expired"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Failed to logout user"
 */
