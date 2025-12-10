/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get product details by ID
 *     description: >
 *       Retrieves full details of a specific product including supplier, categories and stock details.  
 *       Used when opening product view/edit screen.
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID to fetch details
 *         schema:
 *           type: string
 *           example: "10"
 *     responses:
 *       200:
 *         description: Product details fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Product details"
 *               data:
 *                 id: "10"
 *                 productName: "Nirma Soap 125g"
 *                 sku: "SKU-10234"
 *                 unitPrice: 45.50
 *                 supplierId: "5"
 *                 categories:
 *                   - id: "2"
 *                     name: "Cleaning"
 *                   - id: "4"
 *                     name: "Home Essentials"
 *                 description: "Bathing soap with lemon fragrance"
 *                 stock: 120
 *                 images:
 *                   - "https://example.com/soap.png"
 *                 createdAt: "2025-01-20T10:00:00Z"
 *                 updatedAt: "2025-01-21T12:30:00Z"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Product not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error"
 */
