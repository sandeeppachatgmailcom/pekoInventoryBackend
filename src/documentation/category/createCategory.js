/**
 * @swagger
 * /category/create:
 *   post:
 *     summary: Create a new product category
 *     description: >
 *       Creates a new category to classify products for inventory organization.
 *       Category name must be unique.
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryName
 *             properties:
 *               categoryName:
 *                 type: string
 *                 example: "Electronics"
 *     responses:
 *       201:
 *         description: Category created successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Category created successfully"
 *               data:
 *                 id: "1"
 *                 categoryName: "Electronics"
 *       400:
 *         description: Duplicate or invalid category name.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Category already exists"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error"
 */
