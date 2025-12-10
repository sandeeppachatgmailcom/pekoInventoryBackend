
/**
 * @swagger
 * /sales/add-item:
 *   post:
 *     summary: Add item to a sales bill
 *     description: >
 *       Adds an item to a sales bill and reduces inventory from selected batch(es).  
 *       The API supports batch selection: client may send `batchId` to use a specific batch or omit it to get batch suggestions.  
 *       Optionally, include `batchSelectionStrategy` to indicate preference when suggesting batches (FIFO or EXPIRY).
 *       Item-level discount must be provided if applicable; tax is calculated on discounted taxable value.
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
 *               - productId
 *               - quantity
 *               - rate
 *             properties:
 *               salesId:
 *                 type: string
 *                 example: "67e2ef21b97e84d55c672999"
 *               productId:
 *                 type: string
 *                 example: "65b037ae038ce3fabb097924"
 *               quantity:
 *                 type: number
 *                 example: 3
 *               rate:
 *                 type: number
 *                 example: 250.00
 *               discount:
 *                 type: number
 *                 description: "Item-level discount amount (absolute)"
 *                 example: 10
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
 *                 example: null
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
 *               batchSelectionStrategy:
 *                 type: string
 *                 nullable: true
 *                 description: "Optional hint for client to select batches when suggesting multiple batches (FIFO or EXPIRY)"
 *                 enum: [FIFO, EXPIRY]
 *                 example: "FIFO"
 *     responses:
 *       201:
 *         description: Item added to sales successfully; stock reduced
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Sales item added and stock updated"
 *               itemId: "78f21b97e8asd55c672abc1"
 *       400:
 *         description: Validation error or insufficient stock
 *       404:
 *         description: Sales summary or product not found
 *       500:
 *         description: Internal server error
 */
