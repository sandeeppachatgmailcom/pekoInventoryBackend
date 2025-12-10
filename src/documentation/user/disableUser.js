/**
 * @swagger
 * /api/users/{id}/toggleUserStatus:
 *   patch:
 *     summary: Disable an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User disabled successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
