/**
 * @swagger
 * /supplier/update/{id}:
 *   put:
 *     summary: Update supplier information
 *     description: >
 *       Used to update supplier details like name, phone, email etc.  
 *       Only admin allowed.
 *     tags:
 *       - Supplier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "1"
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
 *                 example: "ABC Suppliers Pvt Ltd"
 *               email:
 *                 type: string
 *                 example: "contact@abc.com"
 *     responses:
 *       200:
 *         description: Supplier updated
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Server error
 */
