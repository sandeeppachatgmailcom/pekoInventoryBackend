/**
 * @swagger
 * /sales-order/edit-item:
 *   put:
 *     summary: Edit an item in a sales order
 *     description: >
 *       Updates quantity, rate, or tax fields (CGST, SGST, IGST) of an item in an existing sales order.  
 *       Stock is not updated, only order-level tracking is affected.
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
 *               quantity:
 *                 type: number
 *                 example: 25
 *               rate:
 *                 type: number
 *                 example: 155.75
 *               cgst:
 *                 type: number
 *                 example: 7.5
 *               sgst:
 *                 type: number
 *                 example: 7.5
 *               igst:
 *                 type: number
 *                 example: 0
 *               expiryInDays:
 *                 type: number
 *                 example: 120
 *     responses:
 *       200:
 *         description: Item updated successfully in the sales order
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Item updated successfully"
 *               orderId: "67c2ef21b97e84d55c672002"
 *       404:
 *         description: Item or order not found
 *       500:
 *         description: Internal server error
 */
