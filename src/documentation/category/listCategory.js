/**
 * @swagger
 * /category/list:
 *   get:
 *     summary: Get all product categories
 *     description: >
 *       Fetches all product categories with optional pagination.  
 *       If page & perPage are not provided, returns all categories.  
 *       Useful for dropdowns, product creation & inventory filtering.
 *     tags:
 *       - Category
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number for pagination. If not passed, returns all data.
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: perPage
 *         in: query
 *         required: false
 *         description: Number of records per page.
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: search
 *         in: query
 *         required: false
 *         description: Search category by name.
 *         schema:
 *           type: string
 *           example: "Elect"
 *     responses:
 *       200:
 *         description: List of categories fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Categories fetched successfully"
 *               data:
 *                 categories:
 *                   - id: "1"
 *                     categoryName: "Electronics"
 *                     isActive: true
 *                   - id: "2"
 *                     categoryName: "Furniture"
 *                     isActive: true
 *               meta:
 *                 page: 1
 *                 perPage: 10
 *                 total: 25
 *                 totalPages: 3
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Unable to fetch categories"
 */
