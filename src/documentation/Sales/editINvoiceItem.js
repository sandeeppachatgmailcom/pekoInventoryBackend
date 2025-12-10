
/**
 * @swagger
 * /sales/edit-item:
 *   put:
 *     summary: Edit an item in a sales bill
 *     description: >
 *       Updates quantity, rate, discount, or batch of a sales item.  
 *       Stock changes will be adjusted (difference is added back or reduced from batches).  
 *       Optionally specify `purchaseOrderId`/`purchaseOrderNumber` if linked.
 *     tags:
 *       - Sales
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - salesId
 *               - itemId
 *             properties:
 *               salesId:
 *                 type: string
 *                 example: "67e2ef21b97e84d55c672999"
 *               itemId:
 *                 type: string
 *                 example: "78f21b97e8asd55c672abc1"
 *               quantity:
 *                 type: number
 *                 example: 2
 *               rate:
 *                 type: number
 *                 example: 260.00
 *               discount:
 *                 type: number
 *                 example: 5
 *               cgst:
 *                 type: number
 *                 example: 9
 *               sgst:
 *                 type: number
 *                 example: 9
 *               igst:
 *                 type: number
 *                 example: 0
 *               batchId:
 *                 type: string
 *                 nullable: true
 *                 example: "BN-2025-A"
 *               batchNumber:
 *                 type: string
 *                 nullable: true
 *                 example: "BN-2025-A"
 *               manufacturingDate:
 *                 type: string
 *                 nullable: true
 *                 example: "2025-01-10"
 *               expiryDate:
 *                 type: string
 *                 nullable: true
 *                 example: "2026-01-10"
 *     responses:
 *       200:
 *         description: Item updated and stock adjusted
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Sales item updated successfully"
 *       400:
 *         description: Validation error or insufficient stock for requested change
 *       404:
 *         description: Sales item or sales summary not found
 *       500:
 *         description: Internal server error
 */
