/**
 * @swagger
 * /product/delete/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     description: >
 *       Deletes a product record from the system.  
 *       If the product is linked to purchase/sales history, soft delete is recommended instead of permanent delete.
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID to delete
 *         schema:
 *           type: string
 *           example: "10"
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Product deleted successfully"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Product not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error"
 */
