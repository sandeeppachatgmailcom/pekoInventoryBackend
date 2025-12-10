/**
 * @swagger
 * /sales-order/delete-item:
 *   delete:
 *     summary: Delete an item from a sales order
 *     description: >
 *       Removes an item from an existing sales order.  
 *       Stock is not updated; only the order-level record is affected.
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
 *               - itemId
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: "67c2ef21b97e84d55c672002"
 *               itemId:
 *                 type: string
 *                 example: "677c21b97e8asd55c672002"
 *     responses:
 *       200:
 *         description: Item deleted successfully from the sales order
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Item deleted successfully"
 *               orderId: "67c2ef21b97e84d55c672002"
 *       404:
 *         description: Item or order not found
 *       500:
 *         description: Internal server error
 */
