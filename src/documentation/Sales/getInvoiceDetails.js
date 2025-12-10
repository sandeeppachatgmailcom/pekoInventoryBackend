
/**
 * @swagger
 * /sales/get-bill/{salesId}:
 *   get:
 *     summary: Get a sales bill by ID
 *     description: >
 *       Retrieves the sales summary and all related sales items for the specified salesId.  
 *       Items are nested inside the salesSummary object. Each item contains batch info and optional purchaseOrder reference.
 *     tags:
 *       - Sales
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: salesId
 *         required: true
 *         description: The unique ID of the sales bill
 *         schema:
 *           type: string
 *           example: "67e2ef21b97e84d55c672999"
 *     responses:
 *       200:
 *         description: Sales bill fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Sales bill retrieved successfully"
 *               data:
 *                 salesSummary:
 *                   id: "67e2ef21b97e84d55c672999"
 *                   customerId: "67d9a1a2b97e84d55c672100"
 *                   customerName: "Rahul Traders"
 *                   gstNumber: "29ABCDE1234F1Z5"
 *                   placeOfSupply: "Karnataka"
 *                   invoiceNumber: "SINV-1001"
 *                   salesDate: "2025-12-09"
 *                   totalAmount: 3000
 *                   cgstTotal: 135
 *                   sgstTotal: 135
 *                   igstTotal: 0
 *                   notes: "Deliver ASAP"
 *                   items:
 *                     - itemId: "78f21b97e8asd55c672abc1"
 *                       purchaseOrderId: "67c2ef21b97e84d55c672010"
 *                       purchaseOrderNumber: "PO-1001"
 *                       productId: "65b037ae038ce3fabb097924"
 *                       productName: "Sample Product"
 *                       quantity: 2
 *                       rate: 250.00
 *                       discount: 5
 *                       cgst: 9
 *                       sgst: 9
 *                       igst: 0
 *                       batchId: "BN-2025-A"
 *                       batchNumber: "BN-2025-A"
 *                       manufacturingDate: "2025-01-10"
 *                       expiryDate: "2026-01-10"
 *                     - itemId: "78f21b97e8asd55c672abc2"
 *                       productId: "65b037ae038ce3fabb097925"
 *                       productName: "Another Product"
 *                       quantity: 4
 *                       rate: 500.00
 *                       discount: 0
 *                       cgst: 9
 *                       sgst: 9
 *                       igst: 0
 *                       batchId: "BN-2025-B"
 *                       batchNumber: "BN-2025-B"
 *                       manufacturingDate: "2025-01-15"
 *                       expiryDate: "2026-01-15"
 *       404:
 *         description: Sales bill not found
 *       500:
 *         description: Internal server error
 */
