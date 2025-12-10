/**
 * @swagger
 * /product/update/{id}:
 *   put:
 *     summary: Update product details
 *     description: >
 *       Updates product information including name, price, supplier, category mapping, stock or other editable fields.
 *       Only authorized users with edit access can update.
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID to update
 *         schema:
 *           type: string
 *           example: "10"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 example: "Nirma Soap 200g"
 *               sku:
 *                 type: string
 *                 example: "SKU-10234-NEW"
 *               unitPrice:
 *                 type: number
 *                 example: 55.00
 *               supplierId:
 *                 type: string
 *                 example: "5"
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["2", "4"]
 *               description:
 *                 type: string
 *                 example: "Updated product description"
 *               stock:
 *                 type: number
 *                 example: 150
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Product updated successfully"
 *               data:
 *                 id: "10"
 *                 productName: "Nirma Soap 200g"
 *                 sku: "SKU-10234-NEW"
 *                 unitPrice: 55.00
 *                 supplierId: "5"
 *                 categoryIds: ["2","4"]
 *                 stock: 150
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
