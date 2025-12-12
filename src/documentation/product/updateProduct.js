/**
 * @swagger
 * /product/update:
 *   put:
 *     summary: Update product details
 *     description: >
 *       Updates product information including name, SKU, UOM, description,
 *       image, and category mapping.  
 *       Existing category mappings will be removed and replaced with the new list.  
 *       Only authorized users (Admin/Manager) can update products.
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
 *             properties:
 *               id:
 *                 type: string
 *                 required: true
 *                 example: "10"
 *               productName:
 *                 type: string
 *                 example: "Nirma Soap 200g"
 *               sku:
 *                 type: string
 *                 example: "SKU-10234-NEW"
 *               uom:
 *                 type: string
 *                 example: "PCS"
 *               description:
 *                 type: string
 *                 example: "Updated product description"
 *               image:
 *                 type: string
 *                 example: "https://example.com/new-image.png"
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["2", "4"]
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Product updated successfully"
 *               data:
 *                 productId: "10"
 *                 productName: "Nirma Soap 200g"
 *                 sku: "SKU-10234-NEW"
 *                 uom: "PCS"
 *                 description: "Updated product description"
 *                 image: "https://example.com/new-image.png"
 *                 categoryIds: ["2", "4"]
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
