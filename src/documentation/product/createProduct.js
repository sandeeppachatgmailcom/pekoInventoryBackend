/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Create a new product/item
 *     description: >
 *       Adds a new product to inventory with category mapping.  
 *       Product can belong to multiple categories (handled through ProductCategory table).  
 *       Only Admin/Manager role allowed to create products — verified via JWT token.
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - sku
 *               - unitPrice
 *               - categoryIds
 *             properties:
 *               productName:
 *                 type: string
 *                 example: "Nirma Soap 125g"
 *               sku:
 *                 type: string
 *                 example: "SKU-10234"
 *               unitPrice:
 *                 type: number
 *                 example: 45.50
 *               description:
 *                 type: string
 *                 example: "Bathing soap with lemon fragrance"
 *               supplierId:
 *                 type: string
 *                 example: "5"
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["2","4"]
 *               image:
 *                 type: string
 *                 example: "https://example.com/img/soap.png"
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Product created successfully"
 *               data:
 *                 id: "10"
 *                 productName: "Nirma Soap 125g"
 *                 sku: "SKU-10234"
 *                 unitPrice: 45.5
 *                 supplierId: "5"
 *                 categoryIds: ["2","4"]
 *       400:
 *         description: Validation error / Missing fields
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Required fields missing"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error"
 */
