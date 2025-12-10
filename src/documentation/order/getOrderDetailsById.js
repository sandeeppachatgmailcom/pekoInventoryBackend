/**
 * @swagger
 * /sales-order/get/{orderId}:
 *   get:
 *     summary: Get a sales order by ID
 *     description: >
 *       Retrieves the details of a sales order including all its items.  
 *       Items are returned as a nested array inside the order object.  
 *       No stock is affected by this operation.
 *     tags:
 *       - Sales Order
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: The unique ID of the sales order
 *         schema:
 *           type: string
 *           example: "67c2ef21b97e84d55c672002"
 *     responses:
 *       200:
 *         description: Sales order fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Sales order retrieved successfully"
 *               data:
 *                 orderId: "67c2ef21b97e84d55c672002"
 *                 supplierId: "64f29a1223ab8a9cd013d5e7"
 *                 supplierName: "John Traders"
 *                 orderNumber: "SORD-1001"
 *                 orderDate: "2025-12-09"
 *                 placeOfSupply: "Kerala"
 *                 totalAmount: 5000
 *                 taxAmount: 900
 *                 cgst: 450
 *                 sgst: 450
 *                 igst: 0
 *                 notes: "First sales order"
 *                 invoiceType: "Regular"
 *                 items:
 *                   - itemId: "677c21b97e8asd55c672002"
 *                     productId: "65b037ae038ce3fabb097924"
 *                     productName: "Sample Product"
 *                     quantity: 20
 *                     rate: 150.50
 *                     cgst: 7.5
 *                     sgst: 7.5
 *                     igst: 0
 *                     expiryInDays: 120
 *                   - itemId: "677c21b97e8asd55c672003"
 *                     productId: "65b037ae038ce3fabb097925"
 *                     productName: "Another Product"
 *                     quantity: 10
 *                     rate: 200
 *                     cgst: 5
 *                     sgst: 5
 *                     igst: 0
 *                     expiryInDays: 90
 *       404:
 *         description: Sales order not found
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Sales order not found"
 *       500:
 *         description: Internal server error
 */
