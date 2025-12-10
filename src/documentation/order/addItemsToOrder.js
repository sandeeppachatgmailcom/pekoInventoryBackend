/**
 * @swagger
 * /sales-order/add-item:
 *   post:
 *     summary: Add an item to a sales order
 *     description: >
 *       Adds an item to an existing sales order.  
 *       This does not update stock. Tax fields (CGST, SGST, IGST) and rate are required.  
 *       Only order-level tracking, no invoice/stock updates are done here.
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
 *               - productId
 *               - quantity
 *               - rate
 *               - cgst
 *               - sgst
 *               - igst
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: "67c2ef21b97e84d55c672002"
 *               productId:
 *                 type: string
 *                 example: "65b037ae038ce3fabb097924"
 *               quantity:
 *                 type: number
 *                 example: 20
 *               rate:
 *                 type: number
 *                 example: 150.5
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
 *       201:
 *         description: Item added to sales order successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Item added successfully"
 *               orderId: "67c2ef21b97e84d55c672002"
 *       400:
 *         description: Missing or invalid input data
 *       500:
 *         description: Internal server error
 */
