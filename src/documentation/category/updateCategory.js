/**
 * @swagger
 * /category/update/{id}:
 *   put:
 *     summary: Update existing category
 *     description: >
 *       Updates the category name or related information by category ID.  
 *       Used when category titles require modification.
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID to update
 *         schema:
 *           type: string
 *           example: "1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *                 example: "Home Appliances"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Category updated successfully"
 *               data:
 *                 id: "1"
 *                 categoryName: "Home Appliances"
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Category not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error"
 */
