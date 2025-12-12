/**
 * @swagger
 * /purchase/add-item:
 *   post:
 *     summary: Add an item to a purchase bill (with batch management)
 *     description: >
 *       Adds an item to a purchase bill.  
 *       If batchId is provided, the item links to the existing batch.  
 *       If batchId is null, a new batch will be created with pricing, GST, and expiry details.  
 *       Purchase summary totals will be recalculated automatically.
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
 *                 type: number
 *                 example: 1
 *               purchaseOrderId:
 *                 type: number
 *                 nullable: true
 *                 example: 1
 *               productId:
 *                 type: number
 *                 example: 1
 *               quantity:
 *                 type: number
 *                 example: 20
 *               UOM:
 *                 type: string
 *                 example: "pcs"
 *               rate:
 *                 type: number
 *                 example: 150.50
 *               purchaseGst:
 *                 type: number
 *                 nullable: true
 *                 example: 12
 *               salesGst:
 *                 type: number
 *                 nullable: true
 *                 example: 18
 *               hsn_sac:
 *                 type: string
 *                 nullable: true
 *                 example: "3004"
 *               
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
 *         description: Item added successfully and purchase summary updated
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Item added successfully"
 *               data:
 *                 purchaseId: 1
 *                 productId: 1
 *                 quantity: 20
 *                 rate: 150.5
 *                 purchaseGst: 12
 *                 salesGst: 18
 *                 hsn_sac: "3004"
 *                 
 *       404:
 *         description: Purchase or product or purchase order not found
 *       500:
 *         description: Internal server error
 */
