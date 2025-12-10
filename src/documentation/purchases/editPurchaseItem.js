/**
 * @swagger
 * /purchase/edit-item:
 *   put:
 *     summary: Edit an item in a purchase bill
 *     description: >
 *       Updates quantity, rate, or batch of a purchase item.  
 *       Optionally, you can associate the item with an existing purchase order using purchaseOrderId,  
 *       in which case price details will be fetched from the selected order.  
 *       PurchaseSummary total and tax fields auto-update accordingly.
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
 *               - itemId
 *             properties:
 *               purchaseId:
 *                 type: string
 *                 example: "67c2ef21b97e84d55c672002"
 *               itemId:
 *                 type: string
 *                 example: "677c21b97e8asd55c672002"
 *               purchaseOrderId:
 *                 type: string
 *                 nullable: true
 *                 description: "Optional: ID of the purchase order to fetch price details"
 *                 example: "67c2ef21b97e84d55c672010"
 *               quantity:
 *                 type: number
 *                 example: 10
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
 *               batchDetails:
 *                 type: object
 *                 nullable: true
 *                 properties:
 *                   batchNumber:
 *                     type: string
 *                     example: "BN-2025-A"
 *                   manufacturingDate:
 *                     type: string
 *                     example: "2025-01-10"
 *                   expiryDate:
 *                     type: string
 *                     example: "2026-01-10"
 *     responses:
 *       200:
 *         description: Item updated and summary recalculated
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Item updated successfully"
 *       404:
 *         description: Item, purchase, or purchase order not found
 *       500:
 *         description: Internal server error
 */
