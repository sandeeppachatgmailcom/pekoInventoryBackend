/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Create a new product/item
 *     description: >
 *       Adds a new product to the inventory with category mapping.  
 *       A product may belong to multiple categories (stored in product_categories table).  
 *       Only Admin/Manager roles can create products — validated via JWT token.
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
 *               - uom
 *               - categoryIds
 *             properties:
 *               productName:
 *                 type: string
 *                 example: "Nirma Soap 125g"
 *               sku:
 *                 type: string
 *                 example: "SKU-10234"
 *               uom:
 *                 type: string
 *                 example: "PCS"
 *               description:
 *                 type: string
 *                 example: "Bathing soap with lemon fragrance"
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["2", "4"]
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
 *                 productId: "10"
 *                 productName: "Nirma Soap 125g"
 *                 sku: "SKU-10234"
 *                 uom: "PCS"
 *                 categoryIds: ["2", "4"]
 *       400:
 *         description: Validation error or missing fields
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Required fields missing"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error"
 */
