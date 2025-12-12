/**
 * @swagger
 * /purchase/edit-item:
 *   put:
 *     summary: Edit an item in a purchase bill
 *     description: >
 *       Updates quantity, rate, taxes, UOM, or batch information for an item in a purchase bill.  
 *       If batchNumber is changed, a new batch will be created.  
 *       If purchaseDetailId is provided, that specific row will be updated.  
 *       Purchase summary totals are automatically recalculated based on all items.
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
 *
 *               purchaseDetailId:
 *                 type: number
 *                 nullable: true
 *                 description: "Optional: If present, update this purchase item instead of using itemId"
 *                 example: 15
 *
 *               itemId:
 *                 type: number
 *                 nullable: true
 *                 description: "Original item ID. Used only if purchaseDetailId is not provided."
 *                 example: 10
 *
 *               productId:
 *                 type: number
 *                 example: 1
 *
 *               quantity:
 *                 type: number
 *                 example: 20
 *
 *               UOM:
 *                 type: string
 *                 example: "pcs"
 *
 *               rate:
 *                 type: number
 *                 example: 150.5
 *
 *               purchaseGst:
 *                 type: number
 *                 example: 12
 *
 *               salesGst:
 *                 type: number
 *                 example: 18
 *
 *               hsn_sac:
 *                 type: string
 *                 example: "3004"
 *
 *               batchNumber:
 *                 type: string
 *                 example: "BN-2025-A"
 *
 *               manufacturingDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-10"
 *
 *               expiryDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-01-10"
 *
 *     responses:
 *       200:
 *         description: Item updated and summary recalculated
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Item updated successfully"
 *
 *       404:
 *         description: Item or purchase not found
 *
 *       500:
 *         description: Internal server error
 */
