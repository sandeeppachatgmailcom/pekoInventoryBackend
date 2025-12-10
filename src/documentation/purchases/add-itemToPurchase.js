/**
 * @swagger
 * /purchase/add-item:
 *   post:
 *     summary: Add item to a purchase bill
 *     description: >
 *       Adds an item to a purchase bill.  
 *       If batchId is not provided, a new batch will be created.  
 *       PurchaseSummary total and tax fields will auto-update.  
 *       Optionally, you can associate the item with an existing purchase order using purchaseOrderId,  
 *       in which case price details will be fetched from the selected order.
 *     tags:
 *       - Purchase
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - purchaseId
 *               - productId
 *               - quantity
 *               - rate
 *             properties:
 *               purchaseId:
 *                 type: string
 *                 example: "67c2ef21b97e84d55c672002"
 *               purchaseOrderId:
 *                 type: string
 *                 nullable: true
 *                 description: "Optional: ID of the purchase order to fetch price details"
 *                 example: "67c2ef21b97e84d55c672010"
 *               productId:
 *                 type: string
 *                 example: "65b037ae038ce3fabb097924"
 *               quantity:
 *                 type: number
 *                 example: 20
 *               rate:
 *                 type: number
 *                 example: 150.50
 *               cgst:
 *                 type: number
 *                 example: 7.5
 *               sgst:
 *                 type: number
 *                 example: 7.5
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
 *     responses:
 *       201:
 *         description: Item added successfully and summary updated
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Item added successfully"
 *       404:
 *         description: Purchase summary or purchase order not found
 *       500:
 *         description: Internal server error
 */
