/**
 * @swagger
 * /purchase/get-purchase-bill/{purchaseId}:
 *   get:
 *     summary: Get a purchase bill by ID
 *     description: >
 *       Retrieves the purchase summary and all related purchase items for the specified purchaseId.  
 *       Items are returned as a nested array inside the purchaseSummary object.  
 *       Each item includes purchaseOrderId and purchaseOrderNumber if associated with a purchase order.
 *     tags:
 *       - Purchase
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: purchaseId
 *         required: true
 *         description: The unique ID of the purchase bill
 *         schema:
 *           type: string
 *           example: "67c2ef21b97e84d55c672002"
 *     responses:
 *       200:
 *         description: Purchase bill fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Purchase bill retrieved successfully"
 *               data:
 *                 purchaseSummary:
 *                   id: "67c2ef21b97e84d55c672002"
 *                   supplierId: "64f29a1223ab8a9cd013d5e7"
 *                   purchaseDate: "2025-02-10"
 *                   invoiceNumber: "INV-1001"
 *                   totalAmount: 5000
 *                   cgstTotal: 250
 *                   sgstTotal: 250
 *                   igstTotal: 0
 *                   notes: "First purchase order"
 *                   items:
 *                     - itemId: "677c21b97e8asd55c672002"
 *                       purchaseOrderId: "67c2ef21b97e84d55c672010"
 *                       purchaseOrderNumber: "PO-1001"
 *                       productId: "65b037ae038ce3fabb097924"
 *                       productName: "Sample Product"
 *                       quantity: 20
 *                       rate: 150.50
 *                       cgst: 7.5
 *                       sgst: 7.5
 *                       igst: 0
 *                       batchId: "BN-2025-A"
 *                       batchNumber: "BN-2025-A"
 *                       manufacturingDate: "2025-01-10"
 *                       expiryDate: "2026-01-10"
 *                     - itemId: "677c21b97e8asd55c672003"
 *                       purchaseOrderId: "67c2ef21b97e84d55c672011"
 *                       purchaseOrderNumber: "PO-1002"
 *                       productId: "65b037ae038ce3fabb097925"
 *                       productName: "Another Product"
 *                       quantity: 10
 *                       rate: 200
 *                       cgst: 5
 *                       sgst: 5
 *                       igst: 0
 *                       batchId: "BN-2025-B"
 *                       batchNumber: "BN-2025-B"
 *                       manufacturingDate: "2025-01-15"
 *                       expiryDate: "2026-01-15"
 *       404:
 *         description: Purchase bill not found
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Purchase bill not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error"
 */
