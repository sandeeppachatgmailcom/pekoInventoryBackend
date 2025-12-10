/**
 * @swagger
 * /sales-order/delete:
 *   delete:
 *     summary: Delete a sales order
 *     description: >
 *       Deletes an existing sales order.  
 *       No stock is updated since orders do not affect inventory.  
 *       Only the order-level record is removed.
 *     tags:
 *       - Sales Order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: "67c2ef21b97e84d55c672002"
 *     responses:
 *       200:
 *         description: Sales order deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Sales order deleted successfully"
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Order not found"
 *       500:
 *         description: Internal server error
 */
