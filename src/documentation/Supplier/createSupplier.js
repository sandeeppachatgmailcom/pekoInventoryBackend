/**
 * @swagger
 * /supplier/create:
 *   post:
 *     summary: Create new supplier
 *     description: >
 *       Creates supplier details.  
 *       Only Admin user can create supplier – token must be validated.
 *     tags:
 *       - Supplier
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplierName:
 *                 type: string
 *                 example: "ABC Traders"
 *               contactPerson:
 *                 type: string
 *                 example: "Ravi Kumar"
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               email:
 *                 type: string
 *                 example: "abc@gmail.com"
 *               address:
 *                 type: string
 *                 example: "Kochi, Kerala"
 *     responses:
 *       201:
 *         description: Supplier created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Supplier added successfully"
 *               data:
 *                 id: "1"
 *                 supplierName: "ABC Traders"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - Only admin can add suppliers
 *       500:
 *         description: Server error
 */
