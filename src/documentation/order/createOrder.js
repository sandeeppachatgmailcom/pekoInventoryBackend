/**
 * @swagger
 * /sales-order/create:
 *   post:
 *     summary: Create a Sales Order
 *     description: >
 *       Creates a sales order summary with customer details and total amounts.  
 *       No stock is updated at this stage. Item-level tax and discount can be recorded.  
 *       Payments are handled separately (if applicable). Invoice type can be recorded for reference.
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
 *               - customerId
 *               - orderDate
 *             properties:
 *               customerId:
 *                 type: string
 *                 example: "64f29a1223ab8a9cd013d5e7"
 *               customerName:
 *                 type: string
 *                 example: "John Traders"
 *                
 *               orderNumber:
 *                 type: string
 *                 example: "SORD-1001"
 *               orderDate:
 *                 type: string
 *                 example: "2025-12-10"
 *               invoiceType:
 *                 type: string
 *                 example: "B2B"
 *               discount:
 *                 type: number
 *                 example: 0
 *               notes:
 *                 type: string
 *                 example: "Deliver within 5 days"
 *               totalAmount:
 *                 type: number
 *                 example: 5000
 *               taxAmount:
 *                 type: number
 *                 example: 900
 *               cgst:
 *                 type: number
 *                 example: 450
 *               sgst:
 *                 type: number
 *                 example: 450
 *               igst:
 *                 type: number
 *                 example: 0
 *     responses:
 *       201:
 *         description: Sales order created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Sales order created"
 *               orderId: "67f2ef21b97e84d55c672aaa"
 *               orderNumber: "SORD-1001"
 *       400:
 *         description: Missing or invalid input data
 *       500:
 *         description: Internal server error
 */
