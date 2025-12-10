/**
 * @swagger
 * /supplier/{id}:
 *   get:
 *     summary: Get supplier details
 *     description: Fetch supplier details using supplier ID.
 *     tags:
 *       - Supplier
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         example: "1"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Supplier found
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Server error
 */
