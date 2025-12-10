/**
 * @swagger
 * /sales/create-bill:
 *   post:
 *     summary: Create a Sales Bill
 *     description: >
 *       Creates a sales bill (invoice) with customer details and final billing values.  
 *       No item details included here — this API only stores the bill summary.  
 *       Serial number/invoice number logic will depend on invoiceType.  
 *       Payment is tracked separately.
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
 *               - invoiceNumber
 *               - invoiceDate
 *               - invoiceType
 *               - totalAmount
 *               - taxAmount
 *             properties:
 *               customerId:
 *                 type: string
 *                 example: "64f29a1223ab8a9cd013d5e7"
 *               customerName:
 *                 type: string
 *                 example: "John Traders"
 *               invoiceType:
 *                 type: string
 *                 description: Invoice classification for serial number generation
 *                 example: "B2B"
 *               invoiceNumber:
 *                 type: string
 *                 example: "INV-1001"
 *               invoiceDate:
 *                 type: string
 *                 example: "2025-02-10"
 *               GSTIN:
 *                 type: string
 *                 example: "32ABCDE1234F1Z5"
 *               placeOfSupply:
 *                 type: string
 *                 example: "Kerala"
 *               discount:
 *                 type: number
 *                 example: 0
 *               notes:
 *                 type: string
 *                 example: "First sales bill"
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
 *         description: Sales bill created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Sales bill created successfully"
 *               billId: "67e2ef21b97e84d55c672999"
 *               invoiceNumber: "INV-1001"
 *       400:
 *         description: Missing or invalid input data
 *       500:
 *         description: Internal server error
 */
