/**
 * @swagger
 * /sales/create-bill:
 *   post:
 *     summary: Create a new sales bill with auto-generated invoice number
 *     description: >
 *       Creates a new sales bill.  
 *       Invoice number is auto-generated based on the invoiceType series  
 *       (Example: CASH → C-000001, CREDIT → CR-000001).  
 *       Bill totals and GST values must be provided by the frontend calculation.
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
 *               - customerId
 *               - customerName
 *               - invoiceType
 *               - invoiceDate
 *             properties:
 *               customerId:
 *                 type: number
 *                 example: 5
 *               customerName:
 *                 type: string
 *                 example: "Sandeep Kumar"
 *               invoiceType:
 *                 type: string
 *                 example: "CASH"
 *                 description: Can be CASH, CREDIT, ESTIMATE, etc.
 *               invoiceDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-14"
 *               GSTIN:
 *                 type: string
 *                 example: "29ABCDE1234F1Z5"
 *               placeOfSupply:
 *                 type: string
 *                 example: "Karnataka"
 *               discount:
 *                 type: number
 *                 example: 50
 *               totalAmount:
 *                 type: number
 *                 example: 1500
 *               taxAmount:
 *                 type: number
 *                 example: 180
 *               cgst:
 *                 type: number
 *                 example: 90
 *               sgst:
 *                 type: number
 *                 example: 90
 *               igst:
 *                 type: number
 *                 example: 0
 *     responses:
 *       201:
 *         description: Bill created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Bill created successfully"
 *               data:
 *                 billId: 25
 *                 invoiceNumber: "C-000015"
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
