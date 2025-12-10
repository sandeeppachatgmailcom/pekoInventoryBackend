/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get category by ID
 *     description: >
 *       Fetch details of a specific category using category ID.
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *           example: "2"
 *     responses:
 *       200:
 *         description: Category found
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Success"
 *               data:
 *                 id: "2"
 *                 categoryName: "Furniture"
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Category not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error"
 */
