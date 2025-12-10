/**
 * @swagger
 * /product/list:
 *   get:
 *     summary: Get product list with pagination, search and category filter
 *     description: >
 *       Fetch all products from inventory.  
 *       If `categoryId` is passed → returns products only in that category.  
 *       If not passed → returns all products.  
 *       Pagination and search (by product name or SKU) included.
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: perPage
 *         in: query
 *         required: false
 *         description: Number of items per page
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: searchKey
 *         in: query
 *         required: false
 *         description: Search by product name or SKU
 *         schema:
 *           type: string
 *           example: "soap"
 *       - name: categoryId
 *         in: query
 *         required: false
 *         description: Filter products by category ID (optional)
 *         schema:
 *           type: string
 *           example: "3"
 *     responses:
 *       200:
 *         description: Product list fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Product list fetched"
 *               data:
 *                 products:
 *                   - id: "10"
 *                     productName: "Nirma Soap"
 *                     sku: "SKU-10234"
 *                     unitPrice: 45.50
 *                     categoryIds: ["2","4"]
 *                     supplierId: "5"
 *                     stock: 120
 *                   - id: "11"
 *                     productName: "Lux Soap"
 *                     sku: "SKU-40231"
 *                     unitPrice: 38.00
 *                     categoryIds: ["2"]
 *                     supplierId: "2"
 *                     stock: 80
 *               meta:
 *                 page: 1
 *                 perPage: 10
 *                 total: 42
 *                 totalPages: 5
 *                 searchKey: "soap"
 *                 categoryId: "3"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error"
 */
