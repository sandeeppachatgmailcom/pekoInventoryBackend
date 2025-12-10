/**
 * @swagger
 * /purchase/create:
 *   post:
 *     summary: Create purchase bill summary
 *     description: >
 *       Creates a purchase bill entry including supplier, invoice, tax, and total amount details.  
 *       Items will be added later using `/purchase/add-item`.
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
 *               - supplierId
 *               - purchaseDate
 *               - placeOfSupply
 *               - totalAmount
 *             properties:
 *               supplierId:
 *                 type: string
 *                 example: "64f29a1223ab8a9cd013d5e7"
 *               purchaseDate:
 *                 type: string
 *                 example: "2025-02-10"
 *               invoiceNumber:
 *                 type: string
 *                 example: "INV-1001"
 *               notes:
 *                 type: string
 *                 example: "First purchase order"
 *               placeOfSupply:
 *                 type: string
 *                 example: "Kerala"
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
 *         description: Purchase bill created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Purchase summary created"
 *               purchaseId: "67c2ef21b97e84d55c672002"
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "supplierId, purchaseDate, placeOfSupply, totalAmount are required"
 *       500:
 *         description: Internal server error
 */
